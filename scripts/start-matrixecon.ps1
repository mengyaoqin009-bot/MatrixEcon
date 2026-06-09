param(
  [switch]$NoBrowser
)

$ErrorActionPreference = 'Stop'
$OutputEncoding = [Console]::OutputEncoding = [Text.UTF8Encoding]::new($false)

$projectRoot = Split-Path -Parent $PSScriptRoot
$siteUrl = 'http://127.0.0.1:4173/'

function Test-MatrixEconSite {
  try {
    $response = Invoke-WebRequest -Uri $siteUrl -UseBasicParsing -TimeoutSec 2
    return $response.StatusCode -ge 200 -and $response.StatusCode -lt 500
  }
  catch {
    return $false
  }
}

if (-not (Test-MatrixEconSite)) {
  Start-Process `
    -FilePath 'npm.cmd' `
    -ArgumentList @('run', 'dev:local') `
    -WorkingDirectory $projectRoot `
    -WindowStyle Hidden

  $ready = $false
  for ($attempt = 0; $attempt -lt 30; $attempt++) {
    Start-Sleep -Seconds 1
    if (Test-MatrixEconSite) {
      $ready = $true
      break
    }
  }

  if (-not $ready) {
    throw 'MatrixEcon did not start within 30 seconds. Run npm.cmd run dev:local to inspect the error.'
  }
}

if (-not $NoBrowser) {
  Start-Process $siteUrl
}

Write-Output "MatrixEcon is running: $siteUrl"
