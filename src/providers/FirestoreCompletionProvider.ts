import {
  CompletionItem,
  CompletionItemKind,
  CompletionItemProvider,
  CompletionList,
  MarkdownString,
  Position,
  SnippetString,
  TextDocument,
} from "vscode";
import { getPotentialDocForPartialScoped } from "../Documentation";
import { tokenize } from "../utils/textmate/textmate";
import { methodDoc } from "../documentation/methodDocumentation";
import { LibraryDefs, methodKey } from "../documentation/types";
import { GLOBAL_DEFS, SIMPLE_KEYWORDS } from "./FirestoreGlobalProvider";

export class FirestoreCompletionProvider implements CompletionItemProvider {
  async provideCompletionItems(
    document: TextDocument,
    position: Position,
  ): Promise<CompletionItem[] | CompletionList | undefined> {
    const linePrefix = document
      .lineAt(position)
      .text.substr(0, position.character);

    for (const key in methodDoc) {
      const regex = new RegExp(`${key}\\.\\s*$`);

      if (regex.test(linePrefix)) {
        const childs = methodDoc[key as methodKey]?.childs ?? {};
        return Object.entries(childs).map(([methodName, info]) => {
          // info es DocumentationValue (tiene header, doc, etc.)
          const item = new CompletionItem(
            methodName,
            CompletionItemKind.Method,
          );
          item.detail = info.header
            ? `(method) ${key}.${methodName} — ${info.header}`
            : `(method) ${key}.${methodName}`;
          item.documentation =
            typeof info.doc === "string"
              ? new MarkdownString(info.doc)
              : (info.doc as MarkdownString);
          return item;
        });
      }
    }

    if (!linePrefix.trim().endsWith(".")) {
      const results: CompletionItem[] = [];
      Object.keys(GLOBAL_DEFS).forEach((key) => {
        const def = GLOBAL_DEFS[key];
        const item = new CompletionItem(key, def.kind);
        item.detail = def.detail;
        item.documentation = new MarkdownString(def.documentation);
        if (def.snippet) {
          item.insertText = def.snippet;
        }
        results.push(item);
      });

      SIMPLE_KEYWORDS.forEach((key) => {
        results.push(new CompletionItem(key, CompletionItemKind.Keyword));
      });

      return results;
    }

    return undefined;
  }
}
