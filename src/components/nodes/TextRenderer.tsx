import type { CSSProperties, ReactElement } from 'react';

export interface TextRendererProps {
  innerText: string;
  style?: CSSProperties;
  classNames?: string;
}

export function TextRenderer({ innerText, style, classNames }: TextRendererProps): ReactElement {
  return (
    <span style={style} className={classNames}>
      {innerText}
    </span>
  );
}
