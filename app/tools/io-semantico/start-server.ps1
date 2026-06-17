#!/usr/bin/env pwsh

# Script para mantener el servidor corriendo en puerto 4006
$port = 4006
$maxRetries = 5
$retryCount = 0

Write-Host "🚀 Iniciando servidor en puerto $port..." -ForegroundColor Green

while ($retryCount -lt $maxRetries) {
    Write-Host "`n▶️  Intento $($retryCount + 1)/$maxRetries" -ForegroundColor Yellow

    # Ejecutar el servidor
    & npx next dev --port $port --hostname 127.0.0.1

    # Si llegamos aquí, el servidor se cerró
    $retryCount++
    if ($retryCount -lt $maxRetries) {
        Write-Host "`n⚠️  Servidor cerrado. Reintentando en 5 segundos..." -ForegroundColor Red
        Start-Sleep -Seconds 5
    }
}

Write-Host "`n❌ No se pudo iniciar el servidor después de $maxRetries intentos" -ForegroundColor Red
