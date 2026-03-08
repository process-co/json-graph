import { create } from 'zustand';

export interface JsonGraphState {
  collapsedParents: string[];
  expandNodes: (nodeId: string) => void;
  collapseNodes: (nodeId: string) => void;
  reset: () => void;
}

export const useJsonGraphStore = create<JsonGraphState>((set) => ({
  collapsedParents: [],
  expandNodes: (nodeId) =>
    set((s) => ({
      collapsedParents: s.collapsedParents.filter((id) => id !== nodeId),
    })),
  collapseNodes: (nodeId) =>
    set((s) =>
      s.collapsedParents.includes(nodeId)
        ? s
        : { collapsedParents: [...s.collapsedParents, nodeId] }
    ),
  reset: () => set({ collapsedParents: [] }),
}));

/**
 * Get visible node ids: root + descendants of non-collapsed nodes.
 */
export function getVisibleNodeIds(
  rootIds: string[],
  edges: { source: string; target: string }[],
  collapsedParents: string[]
): Set<string> {
  const visible = new Set<string>(rootIds);
  const queue = [...rootIds];
  while (queue.length > 0) {
    const n = queue.shift()!;
    if (collapsedParents.includes(n)) continue;
    for (const e of edges) {
      if (e.source === n && !visible.has(e.target)) {
        visible.add(e.target);
        queue.push(e.target);
      }
    }
  }
  return visible;
}
