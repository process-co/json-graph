import { useState } from "react";
import JsonTreeNode from "./components/JsonTreeNode";
import "./App.css";

const SAMPLE_JSON = {
  name: "json-graph",
  version: "0.1.0",
  description: "JSON Tree Renderer",
  features: ["expand/collapse", "syntax highlighting", "nested objects"],
  metadata: {
    author: null,
    stars: 42,
    isPublic: true,
    tags: ["json", "tree", "viewer"],
    nested: {
      deep: {
        value: "hello world",
      },
    },
  },
};

function App() {
  const [jsonInput, setJsonInput] = useState(
    JSON.stringify(SAMPLE_JSON, null, 2)
  );
  const [parsedJson, setParsedJson] = useState<unknown>(SAMPLE_JSON);
  const [error, setError] = useState<string | null>(null);

  const handleParse = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setParsedJson(parsed);
      setError(null);
    } catch (e) {
      setError((e as Error).message);
      setParsedJson(null);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>JSON Graph</h1>
        <p className="subtitle">Interactive JSON Tree Renderer</p>
      </header>

      <div className="app-layout">
        <section className="input-panel">
          <h2>Input JSON</h2>
          <textarea
            className="json-input"
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            spellCheck={false}
            placeholder="Paste your JSON here..."
          />
          <button className="render-btn" onClick={handleParse}>
            Render Tree
          </button>
          {error && <p className="error-msg">{error}</p>}
        </section>

        <section className="output-panel">
          <h2>Tree View</h2>
          <div className="tree-container">
            {parsedJson !== null && parsedJson !== undefined ? (
              <JsonTreeNode
                value={parsedJson as Parameters<typeof JsonTreeNode>[0]["value"]}
                defaultExpanded
              />
            ) : (
              <p className="placeholder">
                Enter valid JSON and click &quot;Render Tree&quot;
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
