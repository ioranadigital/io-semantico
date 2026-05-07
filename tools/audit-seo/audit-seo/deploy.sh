#!/bin/bash
# deploy.sh — Despliega audit-seo en el VPS de Hetzner
# Uso: bash deploy.sh <IP_DEL_SERVIDOR> [usuario]
# Ejemplo: bash deploy.sh 65.21.xx.xx root

set -e

SERVER_IP="${1:?Falta la IP del servidor. Uso: bash deploy.sh <IP>}"
SERVER_USER="${2:-root}"
REMOTE_DIR="/opt/audit-seo"
MCP_DIR="/opt/mcp"

echo ""
echo "🚀 Desplegando audit-seo en $SERVER_USER@$SERVER_IP"
echo "   Directorio remoto: $REMOTE_DIR"
echo ""

# ── 1. Copiar archivos del proyecto ──────────────────────────────────────────
echo "📦 Copiando archivos del proyecto..."
ssh "$SERVER_USER@$SERVER_IP" "mkdir -p $REMOTE_DIR/templates $REMOTE_DIR/data $REMOTE_DIR/informes"

scp -r \
  server.js collect.js generate.js package.json .env.example \
  templates/ \
  "$SERVER_USER@$SERVER_IP:$REMOTE_DIR/"

# Crear .env en el servidor
ssh "$SERVER_USER@$SERVER_IP" "
  if [ ! -f $REMOTE_DIR/.env ]; then
    cp $REMOTE_DIR/.env.example $REMOTE_DIR/.env
    echo 'PORT=3700' >> $REMOTE_DIR/.env
    echo 'MCP_CRAWL_PATH=$MCP_DIR/crawl-mcp/dist/index.js' >> $REMOTE_DIR/.env
    echo 'MCP_PUPPETEER_PATH=$MCP_DIR/puppeteer-mcp/dist/index.js' >> $REMOTE_DIR/.env
  fi
"

# ── 2. Copiar servidores MCP ──────────────────────────────────────────────────
echo "📦 Copiando servidores MCP..."
ssh "$SERVER_USER@$SERVER_IP" "mkdir -p $MCP_DIR/crawl-mcp $MCP_DIR/puppeteer-mcp"

# crawl-mcp
scp -r /e/mcp/crawl-mcp/dist /e/mcp/crawl-mcp/package.json \
  "$SERVER_USER@$SERVER_IP:$MCP_DIR/crawl-mcp/"

# puppeteer-mcp
scp -r /e/mcp/puppeteer-mcp/dist /e/mcp/puppeteer-mcp/package.json \
  "$SERVER_USER@$SERVER_IP:$MCP_DIR/puppeteer-mcp/"

# ── 3. Instalar dependencias en el servidor ───────────────────────────────────
echo "📦 Instalando dependencias en el servidor..."
ssh "$SERVER_USER@$SERVER_IP" "
  set -e

  # Node.js 20 si no está instalado
  if ! command -v node &>/dev/null; then
    echo 'Instalando Node.js 20...'
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt-get install -y nodejs
  fi
  echo \"Node.js: \$(node -v)\"

  # Dependencias de audit-seo
  cd $REMOTE_DIR && npm install --omit=dev

  # Dependencias de crawl-mcp
  cd $MCP_DIR/crawl-mcp && npm install --omit=dev

  # Dependencias de puppeteer-mcp (descarga Chromium automáticamente)
  cd $MCP_DIR/puppeteer-mcp && npm install --omit=dev

  # Dependencias del sistema para Puppeteer/Chrome
  apt-get install -y -q \
    libgbm1 libasound2 libatk1.0-0 libatk-bridge2.0-0 \
    libcups2 libdrm2 libxkbcommon0 libxcomposite1 \
    libxdamage1 libxfixes3 libxrandr2 libpango-1.0-0 \
    libcairo2 libnss3 libnspr4 fonts-liberation \
    libappindicator3-1 xdg-utils 2>/dev/null || true
"

# ── 4. Instalar PM2 y arrancar el servicio ────────────────────────────────────
echo "⚙️  Configurando PM2..."
ssh "$SERVER_USER@$SERVER_IP" "
  set -e
  npm install -g pm2 2>/dev/null || true

  # Parar instancia anterior si existe
  pm2 stop audit-seo 2>/dev/null || true
  pm2 delete audit-seo 2>/dev/null || true

  # Arrancar
  cd $REMOTE_DIR
  pm2 start server.js --name audit-seo --interpreter node
  pm2 save
  pm2 startup 2>/dev/null || true

  echo ''
  pm2 status audit-seo
"

# ── 5. Verificar que responde ─────────────────────────────────────────────────
echo ""
echo "✅ Verificando health check..."
sleep 3
ssh "$SERVER_USER@$SERVER_IP" "curl -s http://localhost:3700/health"

echo ""
echo ""
echo "✅ Despliegue completado."
echo ""
echo "   El servidor corre en: http://$SERVER_IP:3700"
echo "   Actualiza el nodo 'HTTP — Lanzar auditoría' en n8n a:"
echo "   → http://localhost:3700/audit  (si n8n está en el mismo VPS)"
echo ""
echo "   Comandos útiles en el servidor:"
echo "   pm2 logs audit-seo     # ver logs en tiempo real"
echo "   pm2 restart audit-seo  # reiniciar"
echo "   pm2 status             # ver estado"
echo ""
