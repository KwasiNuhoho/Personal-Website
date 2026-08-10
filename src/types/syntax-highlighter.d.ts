declare module 'react-syntax-highlighter/dist/esm/prism-async-light' {
  import type { ComponentType } from 'react';
  import type { SyntaxHighlighterProps } from 'react-syntax-highlighter';
  const SyntaxHighlighter: ComponentType<SyntaxHighlighterProps> & {
    registerLanguage: (name: string, language: unknown) => void;
  };
  export default SyntaxHighlighter;
}

declare module 'react-syntax-highlighter/dist/esm/languages/prism/*' {
  const language: unknown;
  export default language;
}

declare module 'react-syntax-highlighter/dist/esm/styles/prism' {
  import type { CSSProperties } from 'react';
  export const oneDark: { [key: string]: CSSProperties };
}
