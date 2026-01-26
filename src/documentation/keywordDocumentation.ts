import { MarkdownString } from "vscode";
import { Documentation } from "./types";

// Mostly extracted from https://firebase.google.com/docs/reference/rules/index-all
export const keywordDoc: Readonly<Documentation> = {
  match: {
    doc: `A \`match\` block declares a \`path\` pattern that is matched against the path for the requested operation (the incoming \`request.path\`).
            The body of the \`match\` must have one or more nested \`match\` blocks, \`allow\` statements, or \`function\` declarations.
            The path in nested \`match\` blocks is relative to the path in the parent \`match\` block.`,
    scopes: ["meta.matcher.fs", "meta.root.fs"],
  },
  allow: {
    doc: new MarkdownString(
      `allow a request if the following condition evaluates to \`true\`` +
        "\n\n" +
        `The following methods are possible:  
            * read  
                * get  
                * list  
            * write  
                * create  
                * update  
                * delete`,
    ),
    scopes: ["meta.matcher.fs"],
  },
  service: {
    doc:
      "contains one or more `match` blocks with `allow` statements that provide conditions granting access to requests",
    scopes: ["source.firebase"],
  },
  read: {
    doc: "Any type of read request. Equals `get` and `list`",
    scopes: ["meta.allow.head.fs", "meta.allow.scope.fs"],
  },
  get: {
    doc: "Read requests for single documents or files.",
    scopes: ["meta.allow.head.fs", "meta.allow.scope.fs"],
  },
  list: {
    doc: "Read requests for queries and collections.",
    scopes: ["meta.allow.head.fs", "meta.allow.scope.fs"],
  },
  write: {
    doc: "Any type of write request. Equals `create`, `update`, and `delete`",
    scopes: ["meta.allow.head.fs", "meta.allow.scope.fs"],
  },
  create: {
    doc: "Write new documents or files",
    scopes: ["meta.allow.head.fs", "meta.allow.scope.fs"],
  },
  update: {
    doc: "Write to existing documents or files",
    scopes: ["meta.allow.head.fs", "meta.allow.scope.fs"],
  },
  delete: {
    doc: "Delete data",
    scopes: ["meta.allow.head.fs", "meta.allow.scope.fs"],
  },
  return: {
    doc: "returns the value",
    scopes: ["meta.function.fs"],
  },
  function: {
    doc: new MarkdownString(
      `Declares a reusable function in Firestore Rules. Functions can take parameters and return values.\n\n` +
        `Syntax:\n\n` +
        "```js\n" +
        "function nameOfFunction(param1, param2) {\n" +
        "  // function body\n" +
        "  return condition;\n" +
        "}\n" +
        "```\n\n" +
        `Functions must be declared inside a \`service\` block and can be called from \`allow\` statements.\n\n` +
        "Example:\n\n" +
        "```js\n" +
        "function isAdmin(userId) {\n" +
        "  return get(/databases/$(database)/documents/users/$(userId)).data.role == 'admin';\n" +
        "}\n\n" +
        "match /documents/{docId} {\n" +
        "  allow write: if isAdmin(request.auth.uid);\n" +
        "}\n" +
        "```\n",
    ),
    scopes: ["meta.root.fs", "source.firebase"],
  },
  if: {
    doc: "",
    scopes: ["meta.allow.body.fs"],
  },
};
