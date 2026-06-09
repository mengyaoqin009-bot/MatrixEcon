# Shared Translation Instructions

Translate the assigned source chunk from English into Simplified Chinese for an academic economics and finance audience.

## Required Output

1. Preserve every `<!-- page:N -->` marker and every Markdown heading.
2. For each substantive English paragraph, table row, caption, note, or disclosure:
   - retain the original English;
   - place the Chinese translation immediately below it in a block beginning with `> **中文：**`.
3. Do not summarize, omit, merge away, or add substantive claims.
4. Preserve equations, numbers, variable names, citations, figure/table identifiers, footnote markers, significance stars, and JEL codes exactly.
5. Keep bibliographic references in English. Do not translate author names or journal names.
6. Repair obvious PDF line-break hyphenation, but retain genuine compound-word hyphens.
7. Use formal, precise Chinese. Preserve hedging and the strength of causal claims.
8. Apply the terminology in `01-analysis.md` consistently.
9. If a table's extraction order is ambiguous, translate faithfully and add `[版面提取顺序待核对]`; do not reconstruct values by inference.
10. Output only the bilingual Markdown for the assigned chunk.

