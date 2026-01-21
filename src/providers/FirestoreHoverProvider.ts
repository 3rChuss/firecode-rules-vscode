import {
  TextDocument,
  Position,
  HoverProvider,
  Hover,
  ProviderResult,
  MarkdownString,
} from "vscode";
import { getDocForToken } from "../Documentation";
import { getTokenUntil } from "../utils";
import { methodDoc } from "../documentation/methodDocumentation";
import { methodKey } from "../documentation/types";

export class FirestoreHoverProvider implements HoverProvider {
  provideHover(
    document: TextDocument,
    position: Position,
  ): ProviderResult<Hover> {
    const range = document.getWordRangeAtPosition(position);
    const word = document.getText(range);
    const lineText = document.lineAt(position).text;
    const wordOffset = document.offsetAt(range?.start || position);
    const lineOffset = document.offsetAt(document.lineAt(position).range.start);
    const relativeOffset = wordOffset - lineOffset;

    const prefixText = lineText.substring(0, relativeOffset);
    const match = prefixText.match(/([a-zA-Z0-9_]+)\.$/);

    if (match) {
      console.log("Matched library for hover:", match[1]);
      const libraryName = match[1]; // ej: "math"

      const childs = methodDoc[libraryName as methodKey]?.childs ?? {};
      console.log("Child methods available:", Object.keys(childs));
      if (childs && childs[word]) {
        const info = childs[word];

        // Construimos el popup bonito con Markdown
        const md = new MarkdownString();
        md.appendCodeblock(
          `${libraryName}.${word}${info.header ? `(${info.header})` : ""}`,
          "typescript",
        ); // Firma
        md.appendMarkdown(`---\n${info.doc}`); // Separador y texto

        return new Hover(md);
      }
    }

    return undefined;
  }
}
