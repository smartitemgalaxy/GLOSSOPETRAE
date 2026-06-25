# 08_CodeForge Module

## Overview
The CodeForge module generates complete, executable programming languages from linguistic principles. It creates a full language stack including tokenizer, parser, interpreter, and runtime - all derived from your constructed language's phonology, morphology, and aesthetic preferences.

## What It Does
- Generates a complete programming language with syntax inspired by your conlang's phonetic patterns
- Creates a tokenizer that recognizes language-appropriate operators and keywords
- Builds a recursive-descent parser with precedence climbing for expressions
- Implements a tree-walking interpreter with execution limits for safety
- Produces language-specific error messages and debugging information
- Generates executable code that can run simple programs immediately

## Key Features

### Linguistic-Integrated Syntax
- **Phoneme-Based Keywords**: Keywords are generated from your language's phoneme inventory
- **Morphologically-Inspired Operators**: Operators reflect your language's grammatical structures
- **Aesthetic-Consistent Syntax**: Symbol choices match your script's visual style (angular, curved, etc.)

### Complete Language Stack
1. **Tokenizer**: Splits source code into meaningful tokens
2. **Parser**: Converts tokens into an Abstract Syntax Tree (AST)
3. **Interpreter**: Executes the AST with proper scoping and control flow
4. **Runtime**: Provides built-in functions and error handling

### Safety Features
- Step limits to prevent infinite loops
- Depth limits for recursion protection
- Comprehensive error reporting with line numbers
- Sandboxed execution environment

## Usage Example
```javascript
import { CodeForge } from './src/modules/CodeForge.js';
import { PhonemeSelector } from './src/modules/PhonemeSelector.js';
import { MorphologyWeaver } from './src/modules/MorphologyWeaver.js';

// Generate language components first
const phonemeSelector = new PhonemeSelector(42);
const phonemes = phonemeSelector.select();

const morphologyWeaver = new MorphologyWeaver(42, {
  phonemes: phonemes,
  type: 'agglutinative'
});

// Create the code generator
const codeForge = new CodeForge(42, {
  phonemes: phonemes,
  morphology: morphologyWeaver.getMorphemes(),
  aesthetic: 'angular',      // Match your script's visual style
  keywordStyle: 'prefix',    // How to derive keywords from roots
  operatorTheme: 'logical'   // Operator symbols based on linguistic concepts
});

// Generate the programming language
const language = codeForge.forge();
console.log(`Generated language: ${language.name}`);
console.log(`Keywords: ${Object.values(language.keywords).join(', ')}`);
console.log(`Operators: ${Object.values(language.operators).join(', ')}`);

// Use the generated language
const program = `
  let x = 10
  let y = 20
  if x < y {
    print "x is less than y"
  } else {
    print "x is greater or equal to y"
  }
  while x > 0 {
    print x
    x = x - 1
  }
`;

try {
  const result = language.interpreter.run(program);
  console.log('Program output:', result.output);
} catch (error) {
  console.error('Execution error:', error.message);
}
```

## Configuration Options
The CodeForge constructor accepts an options object to customize the generated language:

```javascript
new CodeForge(seed, {
  // Language foundations
  phonemes: Object,      // Required: from PhonemeSelector
  morphology: Object,    // Required: from MorphologyWeaver
  
  // Syntax styling
  aesthetic: 'angular|organic|geometric|contrast', // Default: 'angular'
  keywordStyle: 'prefix|suffix|infix|root',        // Default: 'prefix'
  operatorTheme: 'logical|mathematical|geometric', // Default: 'logical'
  
  // Behavioral settings
  statementTerminator: ';', // Default: newline
  blockDelimiters: ['{', '}'], // Default: language-appropriate
  commentPrefix: '#',       // Default: language-appropriate
  
  // Advanced features
  includeFunctions: true,   // Default: true
  includeConditionals: true, // Default: true
  includeLoops: true,       // Default: true
  maxVariableNameLength: 12 // Default: 10
});
```

## Generated Language Features
Each generated language includes:

### Core Constructs
- Variable declaration (`let`)
- Assignment (`=`)
- Basic data types (numbers, strings, booleans, null)
- Arithmetic operations (+, -, *, /, %)
- Comparison operations (<, >, <=, >=, ==, !=)
- Logical operations (and, or, not)

### Control Flow
- Conditional statements (`if`/`else`)
- Loops (`while`)
- Function definition and calling
- Return statements

### I/O Operations
- `print` function for output
- String literals with escape sequences
- Numeric literals (integers and floats)

## Best Practices
1. **Language Cohesion**: Always generate phonology, morphology, and CodeForge from the same seed for coherent language design
2. **Aesthetic Matching**: Set the `aesthetic` option to match your GlyphForge and ScriptGenerator choices
3. **Complexity Matching**: Use simpler language options for isolating languages, more complex features for polysynthetic ones
4. **Testing**: Start with simple programs to verify your generated language works correctly
5. **Documentation**: Use the generated language's keyword and operator lists to create reference documentation

## Common Pitfalls
- ❌ **Mismatched Seeds**: Using different seeds for phonology/morphology/code generation creates incoherent languages
- ❌ **Overly Complex Syntax**: Agrarian or nomadic cultures might not need complex programming constructs
- ❌ **Ignoring Phonotactics**: Generated keywords should respect your language's sound patterns
- ❌ **Inconsistent Terminators**: Mixing statement terminators can cause parsing errors

## Integration with Other Modules
CodeForge works closely with:
- **PhonemeSelector**: Provides the sound inventory for keyword generation
- **MorphologyWeaver**: Supplies grammatical structures that inspire control flow constructs
- **ScriptGenerator**: Influences aesthetic choices for syntax symbols
- **GlyphForge**: Can create visual symbols for operators that match your writing system
- **AudioForge**: Can generate audio feedback for code execution events
- **TranslationEngine**: Enables translating code comments between your conlang and natural languages
- **Exporter**: Exports the language specification and example programs in multiple formats

## Example Output
A typical generated language might include:
```
Language: Zemnian Script-Code
Keywords: let, if, else, while, func, return, print, and, or, not, true, false, null
Operators: +, -, *, /, %, =, ==, !=, <, >, <=, , 
Delimiters: Statement end: newline, Blocks: { }, Comments: #
Data Types: Numbers, Strings, Booleans, Null
```