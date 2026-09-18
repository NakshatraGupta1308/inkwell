import { EditorView } from "@codemirror/view";
import { HighlightStyle } from "@codemirror/language";
import { tags as t } from "@lezer/highlight";

export interface ThemeTokens {
  name: string;
  colors: {
    background: string;
    foreground: string;
    accent: string;
    border: string;
    mutedForeground: string;
    gutterBackground: string;
    gutterForeground: string;
    selection: string;
    activeLine: string;
  };
  fonts: {
    ui: string;
    editor: string;
  };
  syntax: {
    comment: string;
    keyword: string;
    string: string;
    number: string;
    function: string;
    variable: string;
    type: string;
    operator: string;
    tag: string;
    property: string;
    heading: string;
  };
}

export const paperTheme: ThemeTokens = {
  name: "Paper",
  colors: {
    background: "#faf6ee",
    foreground: "#1f2933",
    accent: "#1e3a5f",
    border: "#ddd4c0",
    mutedForeground: "#5b6472",
    gutterBackground: "#faf6ee",
    gutterForeground: "#5b6472",
    selection: "#dce7f2",
    activeLine: "#eee6d3",
  },
  fonts: {
    ui: '"Iowan Old Style", "Palatino Linotype", Georgia, serif',
    editor: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace',
  },
  syntax: {
    comment: "#8a8272",
    keyword: "#8a3b3b",
    string: "#3c6e47",
    number: "#a4632b",
    function: "#1e3a5f",
    variable: "#1f2933",
    type: "#5b3f8a",
    operator: "#5b6472",
    tag: "#1e3a5f",
    property: "#8a3b3b",
    heading: "#1e3a5f",
  },
};

export const inkTheme: ThemeTokens = {
  name: "Ink",
  colors: {
    background: "#1b1d23",
    foreground: "#e7e2d6",
    accent: "#e0b872",
    border: "#33363f",
    mutedForeground: "#8a8f9c",
    gutterBackground: "#1b1d23",
    gutterForeground: "#5c616e",
    selection: "#33475f",
    activeLine: "#24262e",
  },
  fonts: {
    ui: '"Iowan Old Style", "Palatino Linotype", Georgia, serif',
    editor: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace',
  },
  syntax: {
    comment: "#6b7180",
    keyword: "#e0876b",
    string: "#8fbf7f",
    number: "#e0b872",
    function: "#7fb5e0",
    variable: "#e7e2d6",
    type: "#c194e0",
    operator: "#8a8f9c",
    tag: "#7fb5e0",
    property: "#e0876b",
    heading: "#e0b872",
  },
};

export const sepiaTheme: ThemeTokens = {
  name: "Sepia",
  colors: {
    background: "#f4ecd8",
    foreground: "#4b3621",
    accent: "#96591b",
    border: "#e0d3b8",
    mutedForeground: "#8a7a5c",
    gutterBackground: "#f4ecd8",
    gutterForeground: "#8a7a5c",
    selection: "#e8d9b5",
    activeLine: "#ece0c4",
  },
  fonts: {
    ui: '"Iowan Old Style", "Palatino Linotype", Georgia, serif',
    editor: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace',
  },
  syntax: {
    comment: "#a08b62",
    keyword: "#96591b",
    string: "#5c7a4a",
    number: "#b0752f",
    function: "#6b4a2b",
    variable: "#4b3621",
    type: "#7a5a8a",
    operator: "#8a7a5c",
    tag: "#96591b",
    property: "#6b4a2b",
    heading: "#96591b",
  },
};

export const slateTheme: ThemeTokens = {
  name: "Slate",
  colors: {
    background: "#22262e",
    foreground: "#d8dee9",
    accent: "#6ec1c8",
    border: "#3a4150",
    mutedForeground: "#7d8797",
    gutterBackground: "#22262e",
    gutterForeground: "#5c6472",
    selection: "#35495e",
    activeLine: "#2b3038",
  },
  fonts: {
    ui: '"Iowan Old Style", "Palatino Linotype", Georgia, serif',
    editor: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace',
  },
  syntax: {
    comment: "#6b7686",
    keyword: "#d67f8a",
    string: "#8fc19e",
    number: "#6ec1c8",
    function: "#7fa8d6",
    variable: "#d8dee9",
    type: "#b38fd6",
    operator: "#7d8797",
    tag: "#7fa8d6",
    property: "#d67f8a",
    heading: "#6ec1c8",
  },
};

export const forestTheme: ThemeTokens = {
  name: "Forest",
  colors: {
    background: "#1b241d",
    foreground: "#dbe6dc",
    accent: "#7fae6f",
    border: "#2f3d31",
    mutedForeground: "#7c9080",
    gutterBackground: "#1b241d",
    gutterForeground: "#57705e",
    selection: "#2e4a34",
    activeLine: "#223028",
  },
  fonts: {
    ui: '"Iowan Old Style", "Palatino Linotype", Georgia, serif',
    editor: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace',
  },
  syntax: {
    comment: "#607a68",
    keyword: "#c98a5b",
    string: "#7fae6f",
    number: "#d1b06a",
    function: "#6fae9a",
    variable: "#dbe6dc",
    type: "#9bbf7f",
    operator: "#7c9080",
    tag: "#6fae9a",
    property: "#c98a5b",
    heading: "#7fae6f",
  },
};

export const roseTheme: ThemeTokens = {
  name: "Rose",
  colors: {
    background: "#fbeef0",
    foreground: "#4a2530",
    accent: "#a4425c",
    border: "#f0d3da",
    mutedForeground: "#9c7580",
    gutterBackground: "#fbeef0",
    gutterForeground: "#9c7580",
    selection: "#f3d8de",
    activeLine: "#f6e1e5",
  },
  fonts: {
    ui: '"Iowan Old Style", "Palatino Linotype", Georgia, serif',
    editor: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace',
  },
  syntax: {
    comment: "#b08a92",
    keyword: "#a4425c",
    string: "#6a7a4a",
    number: "#b0752f",
    function: "#7a4a68",
    variable: "#4a2530",
    type: "#6a5a8a",
    operator: "#9c7580",
    tag: "#a4425c",
    property: "#7a4a68",
    heading: "#a4425c",
  },
};

export const monoTheme: ThemeTokens = {
  name: "Mono",
  colors: {
    background: "#f4f4f2",
    foreground: "#1c1c1c",
    accent: "#1c1c1c",
    border: "#d8d8d4",
    mutedForeground: "#6b6b68",
    gutterBackground: "#f4f4f2",
    gutterForeground: "#8a8a86",
    selection: "#dcdcd8",
    activeLine: "#eaeae6",
  },
  fonts: {
    ui: '"Iowan Old Style", "Palatino Linotype", Georgia, serif',
    editor: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace',
  },
  syntax: {
    comment: "#8a8a86",
    keyword: "#1c1c1c",
    string: "#4a4a46",
    number: "#3a3a36",
    function: "#1c1c1c",
    variable: "#2a2a26",
    type: "#5a5a56",
    operator: "#6b6b68",
    tag: "#1c1c1c",
    property: "#2a2a26",
    heading: "#1c1c1c",
  },
};

export const nightfallTheme: ThemeTokens = {
  name: "Nightfall",
  colors: {
    background: "#1c1a2b",
    foreground: "#e4dcf2",
    accent: "#a685e0",
    border: "#322d47",
    mutedForeground: "#8c82a6",
    gutterBackground: "#1c1a2b",
    gutterForeground: "#5c5578",
    selection: "#382f57",
    activeLine: "#241f38",
  },
  fonts: {
    ui: '"Iowan Old Style", "Palatino Linotype", Georgia, serif',
    editor: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace',
  },
  syntax: {
    comment: "#6b6285",
    keyword: "#e0857f",
    string: "#85c0a0",
    number: "#e0c185",
    function: "#85a6e0",
    variable: "#e4dcf2",
    type: "#a685e0",
    operator: "#8c82a6",
    tag: "#85a6e0",
    property: "#e0857f",
    heading: "#a685e0",
  },
};

export const sandTheme: ThemeTokens = {
  name: "Sand",
  colors: {
    background: "#f2e6d3",
    foreground: "#3f3121",
    accent: "#b06a2e",
    border: "#e3d1ad",
    mutedForeground: "#8a7a5e",
    gutterBackground: "#f2e6d3",
    gutterForeground: "#8a7a5e",
    selection: "#e6d3ac",
    activeLine: "#ecdcbc",
  },
  fonts: {
    ui: '"Iowan Old Style", "Palatino Linotype", Georgia, serif',
    editor: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace',
  },
  syntax: {
    comment: "#9c8a68",
    keyword: "#b06a2e",
    string: "#55713f",
    number: "#b0752f",
    function: "#6a5230",
    variable: "#3f3121",
    type: "#7a5230",
    operator: "#8a7a5e",
    tag: "#b06a2e",
    property: "#6a5230",
    heading: "#b06a2e",
  },
};

export const oceanTheme: ThemeTokens = {
  name: "Ocean",
  colors: {
    background: "#16262b",
    foreground: "#d6e8ea",
    accent: "#4fb8c4",
    border: "#23393f",
    mutedForeground: "#6f909a",
    gutterBackground: "#16262b",
    gutterForeground: "#4a666e",
    selection: "#1f4249",
    activeLine: "#1c2f34",
  },
  fonts: {
    ui: '"Iowan Old Style", "Palatino Linotype", Georgia, serif',
    editor: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace',
  },
  syntax: {
    comment: "#5c7a80",
    keyword: "#e08f6b",
    string: "#6fc2a0",
    number: "#4fb8c4",
    function: "#6fa8d6",
    variable: "#d6e8ea",
    type: "#9bb8d6",
    operator: "#6f909a",
    tag: "#6fa8d6",
    property: "#e08f6b",
    heading: "#4fb8c4",
  },
};

export const builtinThemes: ThemeTokens[] = [
  paperTheme,
  inkTheme,
  sepiaTheme,
  slateTheme,
  forestTheme,
  roseTheme,
  monoTheme,
  nightfallTheme,
  sandTheme,
  oceanTheme,
];

export function applyThemeVariables(theme: ThemeTokens) {
  const root = document.documentElement.style;
  root.setProperty("--paper", theme.colors.background);
  root.setProperty("--ink", theme.colors.foreground);
  root.setProperty("--ink-soft", theme.colors.mutedForeground);
  root.setProperty("--accent", theme.colors.accent);
  root.setProperty("--border", theme.colors.border);
  root.setProperty("--ui-font", theme.fonts.ui);
  root.setProperty("--editor-font", theme.fonts.editor);
}

export function buildEditorTheme(theme: ThemeTokens) {
  return EditorView.theme({
    "&": {
      height: "100%",
      backgroundColor: theme.colors.background,
      color: theme.colors.foreground,
    },
    ".cm-content": {
      fontFamily: theme.fonts.editor,
      fontSize: "1rem",
      padding: "2rem clamp(1.25rem, 8vw, 12rem)",
    },
    ".cm-gutters": {
      backgroundColor: theme.colors.gutterBackground,
      color: theme.colors.gutterForeground,
      border: "none",
    },
    ".cm-activeLine": {
      backgroundColor: theme.colors.activeLine,
    },
    ".cm-activeLineGutter": {
      backgroundColor: theme.colors.activeLine,
    },
    ".cm-selectionBackground, &.cm-focused .cm-selectionBackground": {
      backgroundColor: `${theme.colors.selection} !important`,
    },
    "&.cm-focused": {
      outline: "none",
    },
  });
}

export function buildHighlightStyle(theme: ThemeTokens) {
  return HighlightStyle.define([
    { tag: t.comment, color: theme.syntax.comment, fontStyle: "italic" },
    { tag: [t.keyword, t.controlKeyword, t.moduleKeyword], color: theme.syntax.keyword },
    { tag: [t.string, t.special(t.string)], color: theme.syntax.string },
    { tag: t.number, color: theme.syntax.number },
    { tag: [t.function(t.variableName), t.function(t.propertyName)], color: theme.syntax.function },
    { tag: t.variableName, color: theme.syntax.variable },
    { tag: [t.typeName, t.className], color: theme.syntax.type },
    { tag: t.operator, color: theme.syntax.operator },
    { tag: t.tagName, color: theme.syntax.tag },
    { tag: t.propertyName, color: theme.syntax.property },
    { tag: [t.heading, t.strong], color: theme.syntax.heading, fontWeight: "bold" },
  ]);
}

const REQUIRED_COLOR_KEYS: (keyof ThemeTokens["colors"])[] = [
  "background",
  "foreground",
  "accent",
  "border",
  "mutedForeground",
  "gutterBackground",
  "gutterForeground",
  "selection",
  "activeLine",
];
const REQUIRED_FONT_KEYS: (keyof ThemeTokens["fonts"])[] = ["ui", "editor"];
const REQUIRED_SYNTAX_KEYS: (keyof ThemeTokens["syntax"])[] = [
  "comment",
  "keyword",
  "string",
  "number",
  "function",
  "variable",
  "type",
  "operator",
  "tag",
  "property",
  "heading",
];

export function isThemeTokens(value: unknown): value is ThemeTokens {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Record<string, unknown>;
  if (typeof candidate.name !== "string") return false;

  const colors = candidate.colors as Record<string, unknown> | undefined;
  const fonts = candidate.fonts as Record<string, unknown> | undefined;
  const syntax = candidate.syntax as Record<string, unknown> | undefined;
  if (!colors || !fonts || !syntax) return false;

  return (
    REQUIRED_COLOR_KEYS.every((key) => typeof colors[key] === "string") &&
    REQUIRED_FONT_KEYS.every((key) => typeof fonts[key] === "string") &&
    REQUIRED_SYNTAX_KEYS.every((key) => typeof syntax[key] === "string")
  );
}
