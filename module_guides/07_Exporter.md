# 06_Exporter Module

## Overview
The Exporter module handles multiple export formats for generated conlangs, enabling integration with language learning tools, linguistic analysis software, and documentation systems. It provides four distinct export formats: Anki flashcards, machine-readable JSON dictionaries, printable HTML grammars, and plain CSV dumps.

## Purpose
Export generated language data in standardized formats for:
- Language learning (Anki spaced repetition)
- Linguistic research and analysis
- Grammar documentation and publication
- Data interchange with other NLP/conlang tools

## Interface
```javascript
import { Exporter } from './modules/Exporter.js';

const exporter = new Exporter(language);
// language: Object containing lexicon, phonology, morphology, syntax, etc.

// Export methods return strings (no filesystem I/O)
const ankiCSV = exporter.toAnkiCSV({ deck: 'extended', limit: 1000 });
const jsonDict = exporter.toDictionaryJSON();
const htmlGrammar = exporter.toGrammarHTML();
const plainCSV = exporter.toCSV();
```

## Export Formats

### Anki CSV (`toAnkiCSV()`)
- **Format**: Semicolon-separated values
- **Content**: Bidirectional flashcards (conlang→english and english→conlang)
- **Ordering**: Core vocabulary first, then extended lexicon
- **Parameters**:
  - `deck`: Name for Anki deck (default: 'core')
  - `limit`: Maximum number of entries (default: Infinity)
- **Use case**: Import into Anki for spaced repetition language learning

### Dictionary JSON (`toDictionaryJSON()`)
- **Format**: Machine-readable JSON
- **Content**: Complete lexicon with paradigmatic forms
- **Structure**:
  ```json
  [
    {
      "lemma": "lexeme",
      "gloss": "english translation",
      "class": "part of speech",
      "paradigms": {
        "nominal": {...},
        "verbal": {...}
      }
    }
  ]
  ```
- **Use case**: Linguistic analysis, NLP pipelines, database import

### Grammar HTML (`toGrammarHTML()`)
- **Format**: Standalone HTML document
- **Content**: Complete reference grammar in monograph style
- **Sections**: Title page, introduction, phonology, orthography, morphology, syntax, lexicon samples
- **Styling**: Print-optimized with proper heading hierarchy
- **Use case**: Language documentation, academic publications, sharing with linguists

### Plain CSV (`toCSV()`)
- **Format**: Comma-separated values
- **Content**: Simple lemma-gloss-class-field dump
- **Headers**: lemma,gloss,class,field
- **Use case**: Spreadsheet analysis, basic data interchange, quick inspection

## Implementation Details
- Zero dependencies: Pure ESM JavaScript
- Browser and Node.js >= 18 compatible
- No DOM manipulation or filesystem access
- Deterministic output: Same language object always produces identical export
- Escaping: Proper CSV/JSON/HTML escaping for special characters
- Memory efficient: Processes entries sequentially

## Best Practices
1. **Format Selection**: 
   - Use Anki CSV for language learning applications
   - Use Dictionary JSON for computational linguistics
   - Use Grammar HTML for documentation and sharing
   - Use Plain CSV for quick data inspection

2. **Parameter Tuning**:
   - Adjust `limit` in `toAnkiCSV()` for focused study decks
   - Combine exports for comprehensive language packages
   - Post-process JSON output for specific analysis tools

3. **Integration**:
   - Pipe output directly to files: `node export.js > language.apkg`
   - Use with build systems for automated documentation
   - Import JSON into linguistic databases (Toolbox, ELAN, etc.)

## Example Usage
```javascript
// Generate and export a complete language package
import { Harness } from './harness.js';
import { Exporter } from './modules/Exporter.js';

// Generate language
const harness = new Harness({ seed: 42 });
const language = harness.generate();

// Create exporter
const exporter = new Exporter(language);

// Generate all export formats
const exports = {
  anki: exporter.toAnkiCSV({ limit: 2000 }),
  dictionary: exporter.toDictionaryJSON(),
  grammar: exporter.toGrammarHTML(),
  csv: exporter.toCSV()
};

// Save to files (in your application code)
// require('fs').writeFileSync('language_anki.csv', exports.anki);
// require('fs').writeFileSync('language_dict.json', exports.dictionary);
// require('fs').writeFileSync('language_grammar.html', exports.grammar);
// require('fs').writeFileSync('language_lexicon.csv', exports.csv);
```

## Dependencies
- None (pure JavaScript)
- Compatible with any ES2020+ environment
- Works in browser contexts (web-based conlang tools)
- Node.js >= 18.0.0 required for harness integration

## Related Modules
- **LexiconGenerator**: Provides the language.lexicon object used by Exporter
- **MorphologyWeaver**: Supplies paradigmatic forms for Dictionary JSON export
- **PhonemeSelector/GlyphForge**: Inform orthographic sections in HTML grammar
- **AudioForge**: Could be extended to export audio pronunciations alongside text

## Quality Assurance
- All export methods return strings (no side effects)
- Output validated against format specifications (RFC 4180 for CSV, ECMA-404 for JSON, HTML5 for grammar)
- Tested with diverse language types (isolating, agglutinative, fusional, polysynthetic)
- Handles edge cases: empty lexicons, special characters, Unicode scripts