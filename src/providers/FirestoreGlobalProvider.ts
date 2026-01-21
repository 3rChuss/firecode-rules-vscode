import { CompletionItemKind, SnippetString } from "vscode";

export interface GlobalDefinition {
  kind: CompletionItemKind;
  detail?: string;
  documentation?: string;
  snippet?: SnippetString;
}

export const GLOBAL_DEFS: Record<string, GlobalDefinition> = {
  math: {
    kind: CompletionItemKind.Module,
    detail: "namespace math",
    documentation: "Proporciona funciones matemáticas básicas y constantes.",
  },
  hashing: {
    kind: CompletionItemKind.Module,
    detail: "namespace hashing",
    documentation: "Funciones para calcular hashes (md5, sha256, crc32...).",
  },
  debug: {
    kind: CompletionItemKind.Module,
    detail: "namespace debug",
    documentation: "Funciones de depuración para imprimir en la consola.",
  },
  request: {
    kind: CompletionItemKind.Variable,
    detail: "Request",
    documentation:
      "La solicitud entrante. Contiene `auth`, `time`, `resource`, etc.",
  },
  resource: {
    kind: CompletionItemKind.Variable,
    detail: "Resource",
    documentation:
      "El documento que se está escribiendo o leyendo actualmente.",
  },
  vector: {
    kind: CompletionItemKind.Class,
    detail: "Type",
    documentation: "Tipo Vector para operaciones de búsqueda de similitud.",
  },
  duration: {
    kind: CompletionItemKind.Class,
    detail: "Type",
    documentation: "Representa una duración de tiempo.",
  },
  allow: {
    kind: CompletionItemKind.Keyword,
    detail: "keyword",
    documentation: "Define las condiciones para permitir una operación.",
    snippet: new SnippetString("allow ${1:read}, ${2:write}: if ${3:true};"),
  },
  match: {
    kind: CompletionItemKind.Keyword,
    detail: "keyword",
    documentation: "Empareja una ruta de documento.",
    snippet: new SnippetString(
      "match /${1:collection}/{${2:document}} {\n\t$0\n}",
    ),
  },
  function: {
    kind: CompletionItemKind.Keyword,
    detail: "keyword",
    documentation: "Declara una función reutilizable.",
    snippet: new SnippetString("function ${1:name}(${2:params}) {\n\t$0\n}"),
  },
};

export const SIMPLE_KEYWORDS = [
  "if",
  "else",
  "true",
  "false",
  "return",
  "null",
  "read",
  "write",
];
