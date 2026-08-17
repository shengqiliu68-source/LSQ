$ErrorActionPreference = "Stop"

$scriptPath = Join-Path $PSScriptRoot "sync-giftbox-cases.py"
$bundledPython = Join-Path $env:USERPROFILE ".cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe"
$python = Get-Command python -ErrorAction SilentlyContinue

if ($python -and $python.Source -notlike "*WindowsApps*") {
    & $python.Source $scriptPath
} elseif (Test-Path -LiteralPath $bundledPython) {
    & $bundledPython $scriptPath
} else {
    throw "Python 3 with Pillow is required to sync gift box cases."
}

exit $LASTEXITCODE
