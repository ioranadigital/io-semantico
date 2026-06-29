#!/usr/bin/env python3
import os
import sys
from supabase import create_client, Client
from pathlib import Path

# Credenciales
SUPABASE_URL = "https://zvehtloitnuglyjtxwye.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2ZWh0bG9pdG51Z2x5anR4d3llIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTA3NjgyNCwiZXhwIjoyMDkwNjUyODI0fQ.5qoJbZfeY7o4W5nnIWKRKSPHstjuEmRuYbTnt_74xtY"

# Leer SQL
sql_file = Path("supabase/apply_migrations.sql")
if not sql_file.exists():
    print(f"ERROR: {sql_file} not found")
    sys.exit(1)

sql_content = sql_file.read_text()

print("✓ SQL file loaded")
print(f"✓ Supabase URL: {SUPABASE_URL}")

# Intentar ejecutar via RPC
try:
    client: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

    # Ejecutar cada statement por separado
    statements = [s.strip() for s in sql_content.split(';') if s.strip()]

    for i, stmt in enumerate(statements, 1):
        if not stmt:
            continue
        print(f"\n[{i}/{len(statements)}] Executing migration...")
        print(f"  {stmt[:80]}...")

        try:
            # Usar RPC para ejecutar SQL (requiere función en Supabase)
            # Por ahora, apenas reportamos
            print(f"  ✓ Ready to execute")
        except Exception as e:
            print(f"  ⚠ {str(e)}")

    print("\n✓ Migrations ready!")
    print("\nTo apply manually in Supabase SQL Editor:")
    print("1. Go to https://supabase.com/dashboard/project/zvehtloitnuglyjtxwye")
    print("2. Go to SQL Editor")
    print("3. Copy & paste the SQL from supabase/apply_migrations.sql")
    print("4. Click 'Run'")

except Exception as e:
    print(f"ERROR: {e}")
    sys.exit(1)
