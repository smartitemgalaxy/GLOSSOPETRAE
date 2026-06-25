# GLOSSOPETRAE Setup: Complete Tools Catalog

This document catalogs all tools available through the GLOSSOPETRAE setup, including the core conlang generation modules, integrated language model APIs, and auxiliary tools.

## Overview

The GLOSSOPETRAE setup provides access to approximately 60+ tools organized into these categories:
1. **Core Conlang Generation Modules** (25 tools) - The heart of GLOSSOPETRAE
2. **Language Model API Gateway** (~35 tools) - Litellm proxy with multiple providers
3. **Auxiliary Development Tools** - Supporting utilities and interfaces
4. **Specialized Processing Pipelines** - Domain-specific workflows

---

## 1. Core Conlang Generation Modules (25 Tools)

These are the fundamental building blocks of GLOSSOPETRAE for creating complete constructed languages.

### Phonology & Orthography
- **PhonemeSelector.js** - Generates phonologically plausible consonant/vowel inventories respecting linguistic universals
- **SyllableForge.js** - Creates syllable structures and phonotactic rules from phoneme inventories
- **GlyphForge.js** - Produces procedural SVG glyphs for writing systems with stylistic consistency
- **ScriptGenerator.js** - Designs complete writing systems (alphabet, abjad, etc.) with directionality and aesthetics

### Audio & Pronunciation
- **AudioForge.js** - Klatt-style speech synthesizer generating audio from text with prosody and articulation modeling
- **ProsodyEngine.js** - Models intonation, stress, rhythm, and emotional tone in synthetic speech

### Morphology & Grammar
- **MorphologyWeaver.js** - Builds complete morphological systems (agglutinative, fusional, polysynthetic, etc.)
- **LanguageAttributes.js** - Defines high-level language properties influencing other modules
- **NameForge.js** - generates procedurally correct personal and place names

### Lexicon & Semantics
- **LexiconGenerator.js** - Creates semantically organized vocabulary with paradigms and frequency distributions
- **TextLibrary.js** - Manages text corpora and linguistic examples
- **TokenCompressor.js** - Implements compression algorithms for linguistic tokens
- **TokenExploiter.js** - Explores token-level patterns and statistics in generated text

### Translation & Transformation
- **TranslationEngine.js** - Bidirectional translation between conlang and pivot languages
- **ReverseTranslator.js** - Specialized module for back-translation and consistency checking
- **CodeForge.js** - Generates programming language syntax inspired by linguistic structures
- **CodeSkin.js** - Creates visual "skins" or themes for code editors based on language aesthetics

### Knowledge & Reasoning
- **QualityEngine.js** - Evaluates linguistic quality, coherence, and naturalness of generated elements
- **DivergenceEngine.js** - Measures divergence from natural languages or specific linguistic types
- **EvolutionEngine.py** - Models language evolution over time with historical change simulation
- **DeadLanguageReviver.js** - Assists in reconstructing proto-languages from daughter languages

### Specialized Functions
- **SteganographyEngine.js** - Encodes hidden messages in linguistic features (prosody, orthography, etc.)
- **SemanticStego.js** - Embeds information in semantic relationships and lexical choices
- **StoneGenerator.js** - Creates procedurally generated artifacts with linguistic inscriptions

---

## 2. Language Model API Gateway (~35 Tools)

The Litellm gateway provides unified access to diverse language models through multiple API keys for load balancing and fallback.

### Text Generation Models (High Volume)
These models are optimized for high-throughput text generation with multiple API keys:

- **Groq Llama 3.3 70B Versatile** (10 API keys) - Fast inference via Groq hardware
- **Cerebras GPT-OSS 120B** (8 API keys) - Large parameter model via Cerebras wafer-scale engine  
- **Google Gemini 2.5 Flash** (5 API keys each for text-fast & synthesis profiles) - Multimodal reasoning model
- **Mistral Large Latest** (2 API keys) - Mixture of experts model for complex reasoning
- **OpenRouter Nemotron 3 Super 120B** (8 API keys) - NVIDIA's top-tier open model
- **OpenRouter Qwen 3 Next 80B** (8 API keys) - Alibaba's latest reasoning model
- **OpenRouter Llama 3.3 70B Instruct** (8 API keys) - Meta's latest instruction-tuned model

### Specialized Processing Models
- **Mistral Large Latest** (8 API keys, ingest profile) - Optimized for long-context document processing (32k tokens)
- **Llama 3.2 11B Vision** (7 API keys) - Vision-language model for image understanding
- **Qwen 3 VL Series** 
  - 32B Instruct (4 API keys) - Advanced vision-language understanding
  - 30B A3B Instruct (9 API keys) - Efficient vision-language model
  - 8B Instruct (9 API keys) - Compact vision-language option

### Control & Routing Models
- **Cloudflare Llama 3.3 70B FP8 Fast** (6 API keys) - Quantized model for rapid gating decisions
- **Microsoft Phi-4 Mini Instruct** (8 API keys) - Small, efficient model for lightweight tasks

### Text Embedding Models
These models convert text to numerical vectors for semantic search, clustering, and similarity measurement:

- **Qwen3 Embedding 8B** (9 API keys) - High-dimensional embeddings (4096-dim)
- **Qwen3 Embedding 4B** (9 API keys) - Medium-dimensional embeddings (2560-dim)
- **Qwen3 Embedding 0.6B** (9 API keys) - Low-dimensional embeddings (1024-dim)
- **Cloudflare Qwen3 Embedding 0.6B** (6 API keys, multiple accounts) - Edge-optimized embeddings
- **DeepInfra Qwen3 Embedding 8B** (1 API key) - Alternative hosting for 8B embeddings

### Model Aliases & Profiles
The gateway provides these semantic aliases for easy model selection:
- `text-fast` - Optimized for speed and cost-effectiveness
- `text-pro` - Optimized for quality and reasoning ability  
- `synthesis` - Optimized for creative text generation and combining ideas
- `ingest` - Optimized for processing large documents and text corpora
- `vision-primary` / `vision-secondary` - Optimized for image understanding tasks
- `gate-control` - Optimized for quick classification and routing decisions
- `embed` / `embed-4096d` / `embed-4096d-deepinfra` - Optimized for text embedding generation

*Note: The "~60 tools" count comes from the total number of API key configurations (approximately 65) across these models, providing redundancy, load balancing, and provider diversity.*

---

## 3. Auxiliary Development Tools

### AI Agent Interfaces
- **Goose** - Agentic AI interface for natural language interaction with development tools
  - Sessions Panel - Persistent session management with search and pinning
  - File system navigation and manipulation
  - Code generation and refactoring assistance

### Documentation & Knowledge Tools
- **NotebookLM CLI** - Local document understanding and question-answering system
  - Processes PDFs, text files, and web content for semantic search
  - Generates study guides, FAQs, and summaries from source materials

### Vision & Multimedia
- **Proofcast** - Video processing and analysis system
  - Golden curation workflow for educational content selection
  - Subagent-driven pipeline for automated video analysis
  - Integration with external grounding (G6 ladder) for fact verification

### Audio Processing
- **OpenWhispr** - Speech-to-text system for voice command processing
  - Audio device management and routing
  - Noise cancellation and speech enhancement

---

## 4. Specialized Processing Pipelines

### Educational Content Processing
- **Dave Feather Pipeline** (5 phases A→E)
  - Phase A: Content acquisition and metadata extraction
  - Phase B: Transcription and alignment
  - Phase C: Translation and localization
  - Phase D: Enhancement and enrichment
  - Phase E: Archival and distribution (images GCS local + course.pdf per course)

### Knowledge Vault Systems
- **Vault-NBL-Tri_FR** - Multilingual knowledge fusion system
  - Applies canonical reconciliation rules (Orlek/Patrick/Nicolas/KIVAM/KSLB/address)
  - Merges information from multiple trusted sources
  - Resolves conflicts using authority-weighted consensus

### Document Processing
- **Souk Ingest System** - Wiki and document processing pipeline
  - Wiki compiler for processing Compendium_EN and similar sources
  - Multi-format support (PDF, DOCX, plain text) with automatic format detection
  - Jury-based validation (G0-G5 scales) for quality assurance
  - Karpathy-format output optimized for language model training

### Linguistic Analysis & Benchmarking
- **Souk Bench** - Language model evaluation framework
  - Multi-provider benchmarking with standardized metrics
  - Karpathy-format dataset generation and validation
  - Automated scoring across quality dimensions (factuality, hallucination, coherence)
  - Throughput measurement (tokens/jour) for performance tracking

### Cryptographic & Steganographic Tools
- **Steganography Engine** - Information hiding in linguistic carriers
  - Prosodic steganography (pitch, timing, intensity variations)
  - Orthographic steganography (glyph variants, diacritical marks)
  - Semantic steganography (word choice, relational encoding)

---

## Usage Patterns & Integration

### Typical Workflows
1. **Language Creation Pipeline**
   ```
   PhonemeSelector → SyllableForge → ScriptGenerator → GlyphForge → 
   AudioForge → MorphologyWeaver → LexiconGenerator → TranslationEngine → Exporter
   ```

2. **Multilingual Content Processing**
   ```
   Document Input → Souk Ingest → Litellm Gateway (ingest profile) → 
   TranslationEngine → NotebookLM → Output/Formatting
   ```

3. **Educational Material Development**
   ```
   Source Video → Preprocessing → Speech Recognition (AudioForge) → 
   Transcription → Translation → Enhancement → Packaging (Dave Feather)
   ```

4. **Research & Analysis**
   ```
   Hypothesis → Language Generation (GLOSSOPETRAE modules) → 
   Evaluation (Souk Bench / QualityEngine) → Iteration → Publication
   ```

### API Access Patterns
- **Direct Module Import**: `import { PhonemeSelector } from './src/modules/PhonemeSelector.js'`
- **Gateway Access**: HTTP requests to `http://127.0.0.1:5020/v1/chat/completions` with model aliases
- **Worker Direct Access**: HTTP requests to specific worker ports (5021-5026) for dedicated providers
- **Batch Processing**: Asynchronous job submission via souk-dispatch-inbox.py

### Configuration & Customization
- Environment variables control API key routing and model selection
- Worker-specific configuration in `souk-bench/configs/.env.<provider>`
- Gateway behavior tuned via `litellm-gateway/litellm-config.yaml`
- Individual module parameters adjustable through constructor options

---

## Summary

This setup provides a comprehensive ecosystem for:
- **Constructed Language Creation**: 25 specialized modules for complete language engineering
- **AI-Powered Linguistic Processing**: ~65 language model configurations via Litellm gateway for diverse NLP tasks
- **Integrated Workflow Automation**: Pipelines for education, research, and content production
- **Extensible Architecture**: Modular design allowing combination and extension of capabilities

The tools work together to enable sophisticated linguistic research, language creation, multilingual content processing, and AI-assisted documentation workflows—all accessible through a unified interface.