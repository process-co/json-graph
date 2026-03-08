# @process.co/ui

[<img src="https://img.shields.io/npm/v/%40process.co%2Fui" />](https://www.npmjs.com/package/@process.co/ui) 
[<img src="https://img.shields.io/github/v/release/process-co/ui" />](https://github.com/process-co/ui/releases/latest) 
[<img alt="GitHub package.json version (branch)" src="https://img.shields.io/github/package-json/v/process-co/ui/main?color=%23AA00AA" />](https://github.com/process-co/ui#main)

A React UI component library for Process.co applications with built-in collaborative editing, type inference, and expression support.

> [!IMPORTANT] 
> **CHANGES HERE WILL GET OVERWRITTEN**
> 
> The JS code in this repo is published from an internal monorepo. This repo only represents the public parts of the code that are published to NPM.

## Installation

```bash
npm install @process.co/ui
```

### Pinned Version
```bash
npm install git+https://github.com/process-co/ui.git#v0.0.14
```

### Latest Development Version
```bash
npm install git+https://github.com/process-co/ui.git#main
```

### Importing Styles

```tsx
import '@process.co/ui/styles';
```

---

## Field Components

The `Input` and `Select` components are collaborative-aware form controls for building custom UIs that integrate with Process.co's flow editor.

### Quick Start

```tsx
import { Input, Select, useNodeProperty } from '@process.co/ui/fields';
import '@process.co/ui/styles';

function MyCustomControl({ fieldName }) {
  const [value, setValue] = useNodeProperty(fieldName);
  
  return (
    <Input
      fieldName="expression"
      label="Expression"
      expectedType="string"
      value={value}
      onChange={setValue}
    />
  );
}
```

### Value and metadata

- `useNodeProperty(fieldName)` returns `[value, setValue]`. You can call `setValue(newValue, metadata?)` to persist optional field metadata (e.g. expression format) with the host.
- `useSetFieldMetadataOnly()` returns a function `(fieldKey, metadata) => void` to update only metadata for a field without changing its value.
- When the host provides `TemplateFieldProvider` with `onValueChange`, nested `Input`/`Select` components can pass metadata so the host persists it (e.g. into `$meta` and Yjs).

---

## Input Component

A text input with expression support, type inference, and real-time collaboration.

```tsx
<Input
  fieldName="userEmail"        // Unique ID for collaboration sync
  label="Email Address"        // Display label
  expectedType="string"        // Type validation (see Type Inference)
  value={email}                // Current value
  onChange={setEmail}          // Change handler
  placeholder="user@example.com"
/>
```

---

## Select Component

A dropdown select with expression support and type-aware options.

```tsx
<Select
  fieldName="operator"
  label="Operation"
  value={operator}
  onChange={setOperator}
  options={[
    { value: 'equals', label: 'Equals' },
    { value: 'contains', label: 'Contains' },
    { value: 'startsWith', label: 'Starts With' },
  ]}
/>
```

---

## Type Inference System

The `$infer<...>` syntax enables automatic type inference and propagation between fields.

### How It Works

When a field uses `$infer` or `$infer<allowedTypes>` as its `expectedType`:

1. The field **infers** the type of the user's input
2. The field **publishes** that inferred type under its `fieldName`
3. Other fields can **subscribe** to that type using `$infer<[fieldName]>`

### Publishing Types (Automatic)

Any field with `$infer` syntax automatically publishes its inferred type:

```tsx
// Publishes inferred type as "switchExpression"
<Input
  fieldName="switchExpression"
  expectedType="$infer<string | number | boolean>"
/>

// Publishes with no type constraints
<Input fieldName="myField" expectedType="$infer" />

// Publishes "string" as the type
<Input fieldName="stringField" expectedType="$infer<string>" />
```

### Subscribing to Types

A field **subscribes** to another field's published type:

```tsx
<Input
  fieldName="caseValue"
  expectedType="$infer<[switchExpression]>"
/>
```

### Multi-Field Subscription

```tsx
<Input
  fieldName="value"
  expectedType='$infer<["statementField", "operatorField"]>'
/>
```

---

## useInferredTypes Hook

Access inferred types programmatically:

```tsx
import { useInferredTypes } from '@process.co/ui/fields';

function OperatorSelect() {
  const ctx = useInferredTypes();
  const expressionType = ctx?.getInferredType('switchExpression') || 'any';
  
  // Filter operators based on type
  const operators = expressionType === 'number' 
    ? ['=', '!=', '<', '>', '<=', '>=']
    : ['=', '!=', 'contains', 'startsWith'];
  
  return <Select options={operators.map(op => ({ value: op, label: op }))} />;
}
```

### Context Methods

| Method | Description |
|--------|-------------|
| `getInferredType(fieldName)` | Get the published type for a field |
| `setInferredType(fieldName, type)` | Manually publish a type for a field |
| `clearInferredType(fieldName)` | Remove a published type for a field |
| `clearAllInferredTypes()` | Remove all published types |
| `inferredTypes` | Record of all fieldName → type mappings |

### Cleanup on Unmount

When building controls that publish inferred types, clean up on unmount:

```tsx
useEffect(() => {
  ctx?.setInferredType(myFieldName, computedType);
  
  return () => {
    ctx?.clearInferredType?.(myFieldName);
  };
}, [myFieldName, computedType]);
```

---

## useNodeProperty Hook

Subscribe to node properties with automatic collaboration sync:

```tsx
import { useNodeProperty } from '@process.co/ui/fields';

function MyControl({ fieldName }) {
  const [value, setValue] = useNodeProperty<MyValueType>(fieldName);
  
  return (
    <button onClick={() => setValue({ ...value, enabled: true })}>
      Enable
    </button>
  );
}
```

---

## Flow Editor Actions

Custom controls can trigger flow-level side effects using a unified hook:

```tsx
import { useFlowEditorActions } from '@process.co/ui/fields';

function SwitchEditor({ fieldName }) {
  const { triggerLayoutUpdate, triggerValidation, clearValidationErrorsByPrefix } =
    useFlowEditorActions();

  const handleRemoveCase = (caseId: string) => {
    clearValidationErrorsByPrefix(caseId);
    triggerLayoutUpdate();
    triggerValidation();
  };
}
```

### Actions

| Action | Description |
|--------|-------------|
| `triggerLayoutUpdate()` | Recalculate node layout after structural changes |
| `triggerValidation()` | Run unified flow validation |
| `clearValidationErrorsByPrefix(prefix)` | Remove expression errors matching a field prefix |

---

## Slots

Slots are **logical sub-containers or branches** used in flow control. Elements like Switch or If-Then expose multiple slots (e.g. cases or branches); each slot can contain child steps. The flow editor and property panel abstract away layout and evaluation so custom controls only need to work with slot IDs and active/enabled state.

### What slots are

- **Container elements** (e.g. Switch, If-Then, Loop) define a set of **slots**. Each slot is one branch or case.
- At runtime, the **active** slot is the branch that evaluation chose (e.g. the matching case in a Switch).
- Slots can be **enabled or disabled** per branch; the host evaluates this from your element data.
- Custom controls receive slot context via `useSlotContext(slotId)` and can use **slot controls** to render branch lists, enable/disable toggles, and reorder/delete.

### useSlotContext

Use this hook when your control needs to know whether a given slot is active (evaluated path) or enabled (user can toggle).

```tsx
import { useSlotContext } from '@process.co/ui/slots';

function MyBranchLabel({ slotId }: { slotId: string }) {
  const slot = useSlotContext(slotId);
  if (!slot) return null; // Not inside a provider
  return (
    <span className={slot.active ? 'font-bold' : ''}>
      {slot.enabled ? 'On' : 'Off'}
    </span>
  );
}
```

**Returns:** `{ active: boolean, enabled: boolean } | undefined`

- **active** – Whether this slot is the one evaluation selected (e.g. the current case).
- **enabled** – Whether the slot is enabled (from the element’s slot definition).
- **undefined** – When not inside a host that provides slot context (e.g. outside the flow editor property panel).

### Slot controls

These components work with the same context and are intended for building branch/case UIs:

| Export | Description |
|--------|-------------|
| `SlotElements` | Renders the list of elements in a slot (e.g. steps in a case). |
| `SlotEnable` | Toggle to enable/disable a slot (uses context `isSlotEnabled` / `handleSlotEnabledChange`). |
| `SlotDelete` | Control to delete a slot or its contents. |
| `SlotDragHandle` | Drag handle for reordering within a slot. |
| `ExportManager` | UI for managing exports from a slot. |

They are provided by the host (flow editor) via `TemplateFieldProvider`; you do not pass slot state yourself when running inside the editor.

### Slot definition (for element authors)

If you define an action or signal with branches/cases, you declare **slots** in the element definition. The host uses this to build the slot list, resolve the active slot from evaluation results, and wire enable/disable. You do not implement layout or evaluation yourself.

- **Static slots** – Fixed set of branches (e.g. "then" and "else"). In the definition: `type: 'static'`, an `id` (optional template like `{{ID_GUID}}_default_case`), and optional `labelPath`, `labelValue`, `enabledPath`.
- **Dynamic slots** – Branches come from an array in your element data (e.g. `cases[]`). In the definition: a `path` (e.g. `$.data.cases.cases[*]`), plus `idPath`, `labelPath`, and optionally `enabledPath` per item.
- **Active slot** – The host evaluates your element and reads the chosen branch from the evaluation result. You provide paths in the definition (e.g. `activeSlotId`, `activeSlotLabel`) that point into that result; the host uses them to drive `isSlotActive` and the canvas.

The exact schema (e.g. `slots.slots[]`, `slots.activeSlotId`) is defined by the host and the namespace/action APIs. As a custom control author, you only need `useSlotContext(slotId)` and the slot controls; the host wires definitions to context.

---

## Building Custom Controls

### Basic Pattern

```tsx
import { useNodeProperty, useInferredTypes } from '@process.co/ui/fields';

interface MyControlProps {
  fieldName: string;
  readonly?: boolean;
}

export default function MyControl({ fieldName, readonly = false }: MyControlProps) {
  const [value, setValue] = useNodeProperty<MyValueType>(fieldName);
  const ctx = useInferredTypes();
  
  const items = value?.items ?? [];
  
  const addItem = () => {
    setValue({
      ...value,
      items: [...items, { id: generateId(), name: '' }]
    });
  };
  
  return (
    <div>
      {items.map(item => <ItemRow key={item.id} item={item} />)}
      {!readonly && <button onClick={addItem}>Add Item</button>}
    </div>
  );
}
```

### With Type Inference

```tsx
import { useNodeProperty, useInferredTypes, Input, Select } from '@process.co/ui/fields';

export default function ConditionalEditor({ fieldName }) {
  const [value, setValue] = useNodeProperty(fieldName);
  const ctx = useInferredTypes();
  
  const statementType = ctx?.getInferredType(`${fieldName}_statement`) || 'any';
  const operators = getOperatorsForType(statementType);
  
  return (
    <div>
      <Input
        fieldName={`${fieldName}_statement`}
        label="Statement"
        expectedType="$infer<string | number | boolean>"
        value={value?.statement}
        onChange={(v) => setValue({ ...value, statement: v })}
      />
      
      <Select
        fieldName={`${fieldName}_operator`}
        label="Operator"
        options={operators}
        value={value?.operator}
        onChange={(v) => setValue({ ...value, operator: v })}
      />
      
      <Input
        fieldName={`${fieldName}_value`}
        label="Value"
        expectedType={`$infer<[${fieldName}_statement]>`}
        value={value?.value}
        onChange={(v) => setValue({ ...value, value: v })}
      />
    </div>
  );
}
```

---

## Operator Utilities

Shared utilities for building query builders with type-aware operators.

```tsx
import {
  BaseOperatorType,      // 'exists' | 'string_equals' | 'number_gt' | ...
  OperatorDef,           // Generic operator definition type
  parseInferredTypes,    // Parse type string → { baseTypes, stringConstants, ... }
  computeExtendedType,   // Compute extended type for extendsWithBase operators
  filterOperatorsByType, // Filter operators by compatible type
  getStringConstants,    // Extract string literals from type
} from '@process.co/ui/fields';

// Example: Filter operators for a union type
const ops = filterOperatorsByType(OPERATORS, '"adam" | "beth"');
// Returns operators with types: ['any'] or ['string']
```

### Extended Type Narrowing

```tsx
const OPERATORS: OperatorDef[] = [
  // Exact match only
  { value: 'string_equals', narrowsTo: 'string', extendsWithBase: false },
  
  // Accepts literals OR base type
  { value: 'string_starts_with', narrowsTo: 'string', extendsWithBase: true },
];
```

If statement infers `"adam" | "beth"`:
- `string_equals` expects: `"adam" | "beth"` (exact match)
- `string_starts_with` expects: `"adam" | "beth" | string` (allows `"a"`)

---

## Collaboration Features

All field components support real-time collaboration when used within the Process.co flow editor:

- **Cursor sharing** – See where other users are editing
- **Conflict resolution** – Automatic handling via Yjs CRDT
- **Presence indicators** – Visual indication of active editors

These features work automatically within a `NodePropertyProvider` context.

---

## UI Components

```tsx
import {
  Button,
  Card,
  Alert,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  ConfirmationDropdownMenuItem,
} from '@process.co/ui';
```

---

## Storybook

View all components: [Storybook Documentation](https://main--674d30e40a127b13419e46ba.chromatic.com)

---

## Links

- [NPM Package](https://www.npmjs.com/package/@process.co/ui)
- [Storybook Documentation](https://main--674d30e40a127b13419e46ba.chromatic.com)
- [GitHub Repository](https://github.com/process-co/ui)
