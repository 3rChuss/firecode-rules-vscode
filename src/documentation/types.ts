import { CompletionItemKind, MarkdownString } from "vscode";
import { methodDoc } from "./methodDocumentation";

export const scopes = [
  "comment.line",
  "meta.allow.body.fs",
  "meta.allow.body.if.fs",
  "meta.allow.fs",
  "meta.allow.head.fs",
  "meta.allow.scope.fs",
  "meta.function.expression.fs",
  "meta.function.fs",
  "meta.functioncall.fs",
  "meta.matcher.fs",
  "meta.root.fs",
  "source.firebase",
  "string.quoted.firestorerules",
  "string.unquoted.fs",
] as const;

export type Scope = typeof scopes[number];

export type FlatDoc = { [name: string]: string | MarkdownString };

export interface DocumentationValue {
  header?: string;
  doc: string | MarkdownString;
  kind?: CompletionItemKind;
  childs?: Documentation;
  scopes?: Scope[];
}

export interface LibraryDefs {
  [key: string]: {
    [method: string]: DocumentationValue;
  };
}

export type Documentation = { [name: string]: DocumentationValue };
export type methodKey = keyof typeof methodDoc;
