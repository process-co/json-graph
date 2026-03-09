# @process.co/json-graph

[<img src="https://img.shields.io/npm/v/%40process.co%2Fjson-graph" />](https://www.npmjs.com/package/@process.co/json-graph)
[<img src="https://img.shields.io/github/v/release/process-co/json-graph" />](https://github.com/process-co/json-graph/releases/latest)
[<img alt="GitHub package.json version (branch)" src="https://img.shields.io/github/package-json/v/process-co/json-graph/main?color=%23AA00AA" />](https://github.com/process-co/json-graph#main)

Render JSON data as an interactive graph using React Flow and ELK layout.

> [!IMPORTANT]
> **CHANGES HERE WILL GET OVERWRITTEN**
>
> The `process-co/json-graph` repository is synced from the Process.co internal monorepo.
> This file is copied to `.github/README.md` during sync, and manual edits in the standalone
> repo can be replaced on the next workflow run.

## What this package provides

- `JsonGraph` React component for interactive visualization
- `parseJsonToGraph` parser utility
- Exported types: `GraphNode`, `GraphEdge`, `ParseResult`
- Packaged stylesheet export: `@process.co/json-graph/styles.css`

## Installation

```bash
npm install @process.co/json-graph
```

## Quick start

```tsx
import { JsonGraph } from '@process.co/json-graph';
import '@process.co/json-graph/styles.css';

export function Example() {
  return (
    <JsonGraph
      json={{ user: { name: 'Ada' }, tags: ['admin', 'beta'] }}
      className="h-[520px] w-full"
    />
  );
}
```

## Repository sync model

- Source of truth: `process-co/json-graph` in the monorepo
- Publish/sync workflow: `.github/workflows/sync - json-graph.yml` (monorepo)
- Target repository: https://github.com/process-co/json-graph

## Links

- npm: https://www.npmjs.com/package/@process.co/json-graph
- Repository: https://github.com/process-co/json-graph
