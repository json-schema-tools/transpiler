# JSON Schema Transpiler

Turn your JSON Schemas into types to be used in various languages.

- Generate types for:
  - Golang
  - Typescript
  - Rust
  - Python
- handles cycle detection
- automatically determines references
- includes documentation annotations for easy documentation generation with native language tools.
- minimal dependencies (wip)

## Getting Started

`npm install @json-schema-tools/transpiler`

```typescript
const JsonSchemaTranspiler = require("@json-schema-tools/transpiler").default;

const mySchema = {
  "title": "PlowAnimals",
  "description": "an array of animals that are good at pulling things",
  "type": "array",
  "items": {
    "oneOf": [
      { "title": "Horse" },
      { "title": "Donkey" },
      { "title": "YaMadda" },
    ]
  }
};

const transpiler = new JsonSchemaTranspiler(mySchema);

console.log(transpiler.toTypescript());
console.log(transpiler.toRust());
console.log(transpiler.to("go")); // same thing, different form/interface
console.log(transpiler.to("python")); // works with shorthand of the language aswell (py or python)
```

### Contributing

How to contribute, build and release are outlined in [CONTRIBUTING.md](CONTRIBUTING.md), [BUILDING.md](BUILDING.md) and [RELEASING.md](RELEASING.md) respectively. Commits in this repository follow the [CONVENTIONAL_COMMITS.md](CONVENTIONAL_COMMITS.md) specification.
