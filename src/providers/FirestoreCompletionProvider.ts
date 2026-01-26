import {
  CompletionItem,
  CompletionItemKind,
  CompletionItemProvider,
  CompletionList,
  MarkdownString,
  Position,
  TextDocument,
} from "vscode";
import { getPotentialDocForPartialScoped } from "../Documentation";
import { keywordDoc } from "../documentation/keywordDocumentation";
import { methodDoc } from "../documentation/methodDocumentation";
import type { Documentation, DocumentationValue } from "../documentation/types";
import type { Token } from "../utils/textmate/scope-info";
import { tokenize } from "../utils/textmate/textmate";
import { GLOBAL_DEFS, SIMPLE_KEYWORDS } from "./FirestoreGlobalProvider";

const DOC_TREES: Documentation[] = [keywordDoc, methodDoc];
const TYPE_METHOD_MAP: Record<string, string> = {
  "rules.String": "string",
  "rules.List": "list",
  "rules.Map": "map",
  "rules.Bytes": "bytes",
  "rules.Duration": "duration",
  "rules.Timestamp": "timestamp",
  "rules.Path": "path",
  "rules.firestore.Resource": "resource",
};

export class FirestoreCompletionProvider implements CompletionItemProvider {
  async provideCompletionItems(
    document: TextDocument,
    position: Position,
  ): Promise<CompletionItem[] | CompletionList | undefined> {
    const linePrefix = document
      .lineAt(position)
      .text.slice(0, position.character);

    const { segments, partial, hasDot } = parsePath(linePrefix);
    const normalizedSegments = normalizeSegments(segments, DOC_TREES, hasDot);
    if (hasDot && normalizedSegments.length === 0) {
      // Dotted access with no resolvable root should not fall back to globals.
      return [];
    }
    const tokens = await tokenize(document);
    const token = tokenAtPosition(tokens, position);
    const scope = token?.scopes?.[token.scopes.length - 1] ?? "source.firebase";

    if (hasDot && normalizedSegments.length > 0) {
      const { node: deepestNode, resolvedSegments } = resolveDeepest(
        normalizedSegments,
        DOC_TREES,
      );
      const fullMatch =
        deepestNode?.childs &&
        resolvedSegments.length === normalizedSegments.length;
      if (fullMatch) {
        const items = buildItemsFromChilds(
          deepestNode!.childs!,
          normalizedSegments.join("."),
          partial,
        );
        if (items.length > 0) {
          return items;
        }
      }

      const returnType = inferReturnType(deepestNode);
      const typeChilds = getTypeChilds(returnType);
      if (typeChilds) {
        const items = buildItemsFromChilds(
          typeChilds,
          normalizedSegments.join("."),
          partial,
        );
        if (items.length > 0) {
          return items;
        }
      }
      // If we are in a dotted access but found no children or type-based methods, avoid suggesting root keywords/globals.
      return [];
    }

    const results: CompletionItem[] = [];
    results.push(...buildGlobalItems());
    results.push(...buildScopedKeywordItems(partial ?? "", scope));
    SIMPLE_KEYWORDS.forEach((key) => {
      results.push(new CompletionItem(key, CompletionItemKind.Keyword));
    });

    return results;
  }
}

function buildGlobalItems(): CompletionItem[] {
  const items: CompletionItem[] = [];
  Object.keys(GLOBAL_DEFS).forEach((key) => {
    const def = GLOBAL_DEFS[key];
    const item = new CompletionItem(key, def.kind);
    item.detail = def.detail;
    item.documentation = new MarkdownString(def.documentation);
    if (def.snippet) {
      item.insertText = def.snippet;
    }
    items.push(item);
  });
  return items;
}

function buildScopedKeywordItems(
  partial: string,
  scope: string,
): CompletionItem[] {
  const potential = getPotentialDocForPartialScoped(partial, scope) || [];
  return potential.map(([name, doc]) => {
    const item = new CompletionItem(name, CompletionItemKind.Keyword);
    item.documentation =
      typeof doc === "string"
        ? new MarkdownString(doc)
        : (doc as MarkdownString);
    return item;
  });
}

function buildItemsFromChilds(
  childs: Documentation,
  basePath: string,
  partial: string,
): CompletionItem[] {
  return Object.entries(childs)
    .filter(([name]) => !partial || name.startsWith(partial))
    .map(([name, info]) => buildCompletionItem(name, info, basePath));
}

function buildCompletionItem(
  name: string,
  info: DocumentationValue,
  basePath: string,
): CompletionItem {
  const kind = info.kind ?? CompletionItemKind.Property;
  const fullPath = basePath ? `${basePath}.${name}` : name;
  const item = new CompletionItem(name, kind);
  item.detail = info.header ? `${fullPath} - ${info.header}` : fullPath;
  item.documentation =
    typeof info.doc === "string"
      ? new MarkdownString(info.doc)
      : (info.doc as MarkdownString);
  return item;
}

function inferReturnType(info?: DocumentationValue): string | undefined {
  if (!info?.header) return undefined;
  const header = info.header;
  const returnsMatch = header.match(/returns\s+(?:non-null\s+)?([\w\.]+)/i);
  if (returnsMatch?.[1]) return returnsMatch[1];
  const arrowMatch = header.match(/=>\s*([\w\.]+)/);
  if (arrowMatch?.[1]) return arrowMatch[1];
  return undefined;
}

function getTypeChilds(typeName?: string): Documentation | undefined {
  if (!typeName) return undefined;
  const mapped = TYPE_METHOD_MAP[typeName];
  if (!mapped) return undefined;
  const node = methodDoc[mapped];
  return node?.childs;
}

function normalizeSegments(
  segments: string[],
  docsList: Documentation[],
  hasDot: boolean,
): string[] {
  const segs = [...segments];
  while (segs.length > 0 && !rootExists(segs[0], docsList, hasDot)) {
    segs.shift();
  }
  return segs;
}

function rootExists(
  root: string,
  docsList: Documentation[],
  hasDot: boolean,
): boolean {
  return docsList.some((d) => {
    const node = d[root];
    if (!node) return false;
    if (!hasDot) return true;
    // For dotted access, require roots that can actually continue (have children).
    return Boolean(node.childs);
  });
}

function parsePath(
  prefix: string,
): {
  segments: string[];
  partial: string;
  hasDot: boolean;
} {
  const trimmed = prefix.trimEnd();
  const endsWithDot = trimmed.endsWith(".");
  const withoutTrailingDot = endsWithDot ? trimmed.slice(0, -1) : trimmed;
  // Drop simple trailing call arguments so we can still resolve the path after a function call.
  const sanitized = withoutTrailingDot.replace(/\([^()]*\)/g, "");

  const match = sanitized.match(/([A-Za-z0-9_.]+)\s*$/);
  if (!match) {
    return { segments: [], partial: "", hasDot: endsWithDot };
  }

  const raw = match[1];
  const parts = raw.split(".");
  const hasDot = endsWithDot || raw.includes(".");

  if (endsWithDot) {
    return { segments: parts, partial: "", hasDot };
  }

  const partial = parts.pop() ?? "";
  return { segments: parts, partial, hasDot };
}

function tokenAtPosition(tokens: Token[][], position: Position): Token | null {
  const lineTokens = tokens[position.line] ?? [];
  const found = lineTokens.find((t) => contains(t, position));
  return found ?? null;
}

function contains(token: Token, position: Position): boolean {
  return (
    position.line === token.range.start.line &&
    position.line === token.range.end.line &&
    position.character >= token.range.start.character &&
    position.character <= token.range.end.character
  );
}

function resolveDeepest(
  path: string[],
  docsList: Documentation[],
): { node?: DocumentationValue; resolvedSegments: string[] } {
  let best: { node?: DocumentationValue; resolvedSegments: string[] } = {
    node: undefined,
    resolvedSegments: [],
  };

  for (const docs of docsList) {
    let current: DocumentationValue | undefined = docs[path[0]];
    if (!current) {
      continue;
    }
    let resolvedCount = 1;

    for (let i = 1; i < path.length; i++) {
      if (!current.childs) {
        break;
      }
      const next = current.childs[path[i]];
      if (!next) {
        break;
      }
      current = next;
      resolvedCount++;
    }

    if (resolvedCount > best.resolvedSegments.length) {
      best = {
        node: current,
        resolvedSegments: path.slice(0, resolvedCount),
      };
    }
  }

  return best;
}
