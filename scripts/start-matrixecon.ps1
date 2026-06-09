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
    throw 'MatrixEcon 本地服务未能在 30 秒内启动，请运行 npm.cmd run dev:local 查看错误。'
  }
}

if (-not $NoBrowser) {
  Start-Process $siteUrl
}

Write-Output "MatrixEcon 已运行：$siteUrl"
