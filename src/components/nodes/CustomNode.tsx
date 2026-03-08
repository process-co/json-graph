import { useState, type ReactElement } from 'react';
import { type NodeProps } from '@xyflow/react';
import { theme } from '../../theme';
import { isCountOnlyRows, getDisplayLabel } from '../../utils/getDisplayLabel';
import { ObjectNode } from './ObjectNode';
import { TextNode } from './TextNode';

/**
 * Match reference: property blocks (key-value rows) for real data; compact
 * (single line + expand) for container summaries (rows that are only key: [n]/{n}).
 */
export function CustomNode(props: NodeProps): ReactElement {
  const data = props.data ?? {};
  const text = data.text;
  const type = ((data as { type?: string }).type ?? 'object') as string;
  const isEmpty = (data as { isEmpty?: boolean }).isEmpty;
  const isRoot = (data as { isRoot?: boolean }).isRoot;
  const [hovered, setHovered] = useState(false);

  const borderRadius = isEmpty || isRoot && isEmpty ? '50px' : '5px';
  const fill = theme.nodeBg; // Reaflow Node fill from jsontree

  const isArrayText = Array.isArray(text);
  const isContainerSummary = isArrayText && isCountOnlyRows(text);
  const showCompact = !isArrayText || isContainerSummary;

  const displayData =
    showCompact && isArrayText
      ? { ...data, text: getDisplayLabel(text, type) }
      : data;
 
  return (
    <div
      className="border pui:border-node-border pui:hover:border-node-border-hover"
      style={{
        position: 'relative',
        background: fill,
        borderRadius,
        minWidth: '40px',
        minHeight: '24px',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      {showCompact ? (
        <TextNode {...props} data={displayData} />
      ) : (
        <ObjectNode {...props} />
      )}
    </div>
  );
}
