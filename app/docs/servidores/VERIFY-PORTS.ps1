# ============================================
# VERIFICADOR DE PUERTOS - Detecta conflictos
# ============================================
# Uso: . E:\scripts\verify-ports.ps1
# Referencia: E:\git\app\docs\servidores\VERIFY-PORTS.ps1

# Puertos definidos en master.env (2026-06-10)
$puertos = @{
    "main"                 = 3000
    "io-semantico-front"   = 3002
    "io-neruda-front"      = 3003
    "io-prospector-front"  = 3004
    "io-semantico-back"    = 4000
    "io-neruda-back"       = 4005
    "io-prospector-back"   = 4006
    "io-semantico-python"  = 5000
    "redis"                = 6379
}

function Verificar-Puertos {
    Write-Host "================================================" -ForegroundColor Cyan
    Write-Host "VERIFICADOR DE PUERTOS - Master.env" -ForegroundColor Cyan
    Write-Host "================================================" -ForegroundColor Cyan
    Write-Host ""

    $puertosBloqueados = @()
    $puertosLibres = @()

    foreach ($servicio in $puertos.GetEnumerator()) {
        $puerto = $servicio.Value
        $nombre = $servicio.Key

        # Verificar si puerto está en uso
        try {
            $result = netstat -ano | Select-String ":$puerto"
            if ($result) {
                # Puerto en uso
                $linea = $result -split '\s+' | Where-Object { $_ -match '\d+' }
                $pid = ($linea | Select-Object -Last 1)

                Write-Host "OCUPADO - Puerto $puerto ($nombre) - PID $pid" -ForegroundColor Red
                $puertosBloqueados += @{
                    Puerto   = $puerto
                    Servicio = $nombre
                    PID      = $pid
                }
            } else {
                Write-Host "LIBRE   - Puerto $puerto ($nombre)" -ForegroundColor Green
                $puertosLibres += @{
                    Puerto   = $puerto
                    Servicio = $nombre
                }
            }
        } catch {
            Write-Host "ERROR  - Puerto $puerto ($nombre) - $_" -ForegroundColor Yellow
        }
    }

    Write-Host ""
    Write-Host "================================================" -ForegroundColor Cyan
    Write-Host "RESUMEN:" -ForegroundColor Cyan
    Write-Host "================================================" -ForegroundColor Cyan
    Write-Host "Puertos libres: $($puertosLibres.Count)" -ForegroundColor Green
    Write-Host "Puertos ocupados: $($puertosBloqueados.Count)" -ForegroundColor Red
    Write-Host ""

    if ($puertosBloqueados.Count -gt 0) {
        Write-Host "Puertos OCUPADOS detectados:" -ForegroundColor Yellow
        foreach ($p in $puertosBloqueados) {
            Write-Host "  - $($p.Puerto) ($($p.Servicio)) - PID: $($p.PID)" -ForegroundColor Red
            Write-Host "    Matar proceso: taskkill /PID $($p.PID) /F" -ForegroundColor Yellow
        }
    }

    Write-Host ""
}

# Ejecutar verificación
Verificar-Puertos

# Retornar resultado
return @{
    bloqueados = $puertosBloqueados
    libres     = $puertosLibres
}
