import type { ParseResult } from './types';

export function addEdgeToGraph(
  graph: ParseResult,
  source: string,
  target: string
): void {
  graph.edges.push({
    id: `e${source}-${target}`,
    source,
    target,
  });
}
