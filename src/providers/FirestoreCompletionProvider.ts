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

export class FirestoreCompletionProvider implements CompletionItemProvider {
  async provideCompletionItems(
    document: TextDocument,
    position: Position,
  ): Promise<CompletionItem[] | CompletionList | undefined> {
    const linePrefix = document
      .lineAt(position)
      .text.slice(0, position.character);

    const { segments, partial, hasDot } = parsePath(linePrefix);
    const tokens = await tokenize(document);
    const token = tokenAtPosition(tokens, position);
    const scope = token?.scopes?.[token.scopes.length - 1] ?? "source.firebase";

    if (hasDot && segments.length > 0) {
      const baseNode = resolveNode(segments, DOC_TREES);
      if (baseNode?.childs) {
        const items = buildItemsFromChilds(
          baseNode.childs,
          segments.join("."),
          partial,
        );
        if (items.length > 0) {
          return items;
        }
      }
      // If we are in a dotted access but found no children, avoid suggesting root keywords/globals.
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

function parsePath(
  prefix: string,
): {
  segments: string[];
  partial: string;
  hasDot: boolean;
} {
  const match = prefix.match(/([A-Za-z0-9_.]+)\s*$/);
  if (!match) {
    return { segments: [], partial: "", hasDot: false };
  }

  const raw = match[1];
  const hasDot = raw.includes(".");
  const trimmed = raw.trimEnd();
  const endsWithDot = trimmed.endsWith(".");
  const parts = trimmed.split(".");

  if (endsWithDot) {
    parts.pop();
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

function resolveNode(
  path: string[],
  docsList: Documentation[],
): DocumentationValue | undefined {
  for (const docs of docsList) {
    let current: DocumentationValue | undefined = docs[path[0]];
    if (!current) {
      continue;
    }

    let valid = true;
    for (let i = 1; i < path.length; i++) {
      if (!current.childs) {
        valid = false;
        break;
      }
      current = current.childs[path[i]];
      if (!current) {
        valid = false;
        break;
      }
    }

    if (valid) {
      return current;
    }
  }

  return undefined;
}
