param(
    [Parameter(Mandatory = $true)]
    [ValidateRange(1, 99)]
    [int]$Chunk
)

$ErrorActionPreference = "Stop"
$OutputEncoding = [Console]::OutputEncoding = [Text.UTF8Encoding]::new($false)

$root = Split-Path -Parent $PSScriptRoot
$translationRoot = Join-Path $root "translations/why-have-ceo-pay-levels-become-less-diverse-zh-CN"
$chunkName = "chunk-{0:D2}" -f $Chunk

$analysis = Get-Content -Raw -Encoding UTF8 (Join-Path $translationRoot "01-analysis.md")
$rules = Get-Content -Raw -Encoding UTF8 (Join-Path $translationRoot "02-prompt.md")
$source = Get-Content -Raw -Encoding UTF8 (Join-Path $translationRoot "chunks/chunks/$chunkName.md")
$output = Join-Path $translationRoot "chunks/$chunkName-draft.md"

$inputText = @"
你只做翻译。以下 SOURCE 是唯一允许翻译的原文，不得检索、读取或改用其他版本。最终回答只能是完整中英对照 Markdown。

=== ANALYSIS ===
$analysis
=== RULES ===
$rules
=== SOURCE BEGIN ===
$source
=== SOURCE END ===
"@

$inputText | codex.cmd exec `
    --ephemeral `
    --ignore-user-config `
    --ignore-rules `
    --sandbox read-only `
    -C $root `
    -o $output `
    -

if ($LASTEXITCODE -ne 0) {
    throw "Translation failed for $chunkName with exit code $LASTEXITCODE"
}

