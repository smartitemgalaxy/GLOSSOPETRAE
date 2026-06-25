# 09_CodeSkin Module

## Overview
The CodeSkin module creates a "legibility skin" layer for CodeForge-generated programming languages. It transforms the surface syntax of a language while preserving its underlying Abstract Syntax Tree (AST) and semantics, enabling research into the human-machine readability trade-off in programming languages.

## Purpose
CodeSkin allows you to:
- Generate multiple surface representations of the same underlying language
- Study how syntax affects human readability vs. machine processability
- Create obfuscated versions of code that remain executable by the same interpreter
- Experiment with visual programming language concepts
- Create "alien" code aesthetics while maintaining computational equivalence

## How It Works
CodeSkin operates on four levels of transformation:
- **L0 (Identity)**: Original CodeForge syntax (readable-ish)
- **L1 (Cryptic)**: Keywords replaced with short non-word tokens
- **L2 (Glyphic)**: Keywords and operators replaced with distinct Unicode symbols
- **L3 (Alien)**: All syntax elements (including delimiters) replaced with symbols

The transformation is bijective - each skin level can be reversed to recover the original code using the `unskin()` method.

## Interface
```javascript
import { CodeForge } from './CodeForge.js';
import { CodeSkin } from './CodeSkin.js';

// Generate a base language
const codeForge = new CodeForge(42);

// Apply different skins
const readable = new CodeSkin(codeForge, 0);   // L0 - original syntax
const cryptic  = new CodeSkin(codeForge, 1);   // L1 - encoded keywords
const glyphic  = new CodeSkin(codeForge, 2);   // L2 - symbolic operators
const alien    = new CodeSkin(codeForge, 3);   // L3 - fully symbolic

// Generate code in the base language
const sourceCode = "let x := 10;\nwhile x > 0 do {\n  print x;\n  x := x - 1;\n}";

// Apply skin to make it less/more readable
const skinnedCode = alien.skin(sourceCode);
console.log(skinnedCode);
// Output might look like: "⟐ x ⊛ 10 ⁈ ⫷ ⊛ x ʘ 0 ⫸ ⁈ { ⊡ x ⁈ ⊜ x ⊛ 1 ⁈ }"

// To execute, unskin first then parse
const original = alien.unskin(skinnedCode);
// Now process with CodeForge parser/interpreter
```

## Key Features
### Bijective Transformation
- Lossless conversion between skin levels
- Preserves all semantic meaning
- Only changes surface tokens, not structure

### Configurable Levels
- **Level 0**: Original CodeForge syntax (baseline)
- **Level 1**: Keywords → cryptic tokens (ops unchanged)
- **Level 2**: Keywords+operators → symbolic tokens
- **Level 3**: All syntax → symbolic (maximally opaque)

### Unicode Symbol Support
- Uses carefully selected non-ASCII glyphs
- Symbols chosen for visual distinction
- Avoids confusable characters
- Works in any Unicode-compliant environment

### Identifier Preservation
- Variable names, numbers, and strings unchanged
- Only language syntax is transformed
- Maintains code semantics completely

## Usage Example
```javascript
// Create a language and some sample code
const cf = new CodeForge(12345);
const cs = new CodeSkin(cf, 2);  // Glyphic level

const program = `
  func factorial(n) {
    if n <= 1 {
      return 1;
    }
    return n * factorial(n - 1);
  }
  
  print factorial(5);
`;

// Apply skin
const skinned = cs.skin(program);
console.log("Skinned code:");
console.log(skinned);

// To execute, we must first unskin
const original = cs.unskin(skinned);
// Now parse/execute with the original CodeForge instance
```

## Best Practices
1. **Consistent Level Usage**: Use the same skin level for encoding and decoding
2. **Document Your Skin**: Record which level you're using for reproducibility
3. **Test Round-Trip**: Always verify `skin(unskin(code)) == code`
4. **Consider Your Audience**: Higher levels are less readable but more "alien"
5. **Combine with Themes**: Pair with visual themes for maximal effect

## Customization
While the default glyph set is carefully chosen, you can customize:
- Symbol pools by modifying the GLYPH_POOL array
- Mapping strategies by adjusting the _build() method
- Delimiter handling for different bracket styles

## Integration Notes
CodeSkin is designed to work specifically with CodeForge output:
- Requires a CodeForge instance as input
- Preserves the exact same AST and semantics
- Works with CodeForge's tokenizer/parser/interpreter unchanged
- Can be chained with other modules like Exporter for distribution

## Research Applications
This module enables studies in:
- Programming language design and usability
- Code obfuscation and deobfuscation techniques
- Neural network interpretation of source code
- Syntax preference experiments
- Esoteric programming language design
- Visual programming language concepts

## Security Note
While CodeSkin can obfuscate code syntax, it does not provide cryptographic security. The transformation is reversible with access to the skinning parameters. For true code protection, combine with actual encryption techniques.
