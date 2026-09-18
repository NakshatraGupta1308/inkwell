import type { Extension } from "@codemirror/state";
import { markdown } from "@codemirror/lang-markdown";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { rust } from "@codemirror/lang-rust";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";

function extensionOf(path: string | null): string {
  return path?.split(".").pop()?.toLowerCase() ?? "";
}

export function languageForPath(path: string | null): Extension {
  switch (extensionOf(path)) {
    case "js":
    case "jsx":
    case "mjs":
    case "cjs":
      return javascript();
    case "ts":
      return javascript({ typescript: true });
    case "tsx":
      return javascript({ typescript: true, jsx: true });
    case "py":
      return python();
    case "rs":
      return rust();
    case "html":
    case "htm":
      return html();
    case "css":
      return css();
    default:
      return markdown();
  }
}

export function languageLabel(path: string | null): string {
  switch (extensionOf(path)) {
    case "js":
    case "jsx":
    case "mjs":
    case "cjs":
      return "JavaScript";
    case "ts":
      return "TypeScript";
    case "tsx":
      return "TypeScript (JSX)";
    case "py":
      return "Python";
    case "rs":
      return "Rust";
    case "html":
    case "htm":
      return "HTML";
    case "css":
      return "CSS";
    default:
      return "Markdown";
  }
}
