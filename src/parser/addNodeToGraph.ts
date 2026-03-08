import type { GraphNode, ParseResult } from './types';
import { calculateNodeSize } from './calculateNodeSize';

type Props = {
  graph: ParseResult;
  text: [string, string][] | string;
  isEmpty?: boolean;
  type?: 'string' | 'number' | 'boolean' | 'object' | 'array' | 'null';
};

export function addNodeToGraph({
  graph,
  text,
  type = 'null',
  isEmpty = false,
}: Props): string {
  const id = String(graph.nodes.length + 1);
  const isParent = type === 'array' || type === 'object';
  const { width, height } = calculateNodeSize(text, isParent);

  const node: GraphNode = {
    id,
    text,
    width,
    height,
    data: {
      type,
      isParent,
      isEmpty,
      childrenCount: isParent ? 1 : 0,
    },
  };

  graph.nodes.push(node);
  return id;
}
