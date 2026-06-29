-- ============================================================
-- VALIDATION SCRIPT: Check schema structure post-migration
-- ============================================================

-- 1. Validate io_sem_clientes table exists and has correct columns
SELECT '1. io_sem_clientes structure:' as validation;
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'io_sem_clientes'
ORDER BY ordinal_position;

-- 2. Validate io_sem_palabras_clave table exists
SELECT '2. io_sem_palabras_clave structure:' as validation;
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'io_sem_palabras_clave'
ORDER BY ordinal_position;

-- 3. Validate io_sem_urls_rastreadas table exists with standardized column names
SELECT '3. io_sem_urls_rastreadas structure (standardized columns):' as validation;
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'io_sem_urls_rastreadas'
ORDER BY ordinal_position;

-- 4. Validate io_sem_asignaciones_kw_url table exists
SELECT '4. io_sem_asignaciones_kw_url structure:' as validation;
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'io_sem_asignaciones_kw_url'
ORDER BY ordinal_position;

-- 5. Validate io_sem_optimizaciones table exists
SELECT '5. io_sem_optimizaciones structure:' as validation;
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'io_sem_optimizaciones'
ORDER BY ordinal_position;

-- 6. Check for Foreign Key relationships
SELECT '6. Foreign Key constraints:' as validation;
SELECT constraint_name, table_name, column_name, referenced_table_name, referenced_column_name
FROM information_schema.referential_constraints rc
JOIN information_schema.key_column_usage kcu ON rc.constraint_name = kcu.constraint_name
WHERE table_schema = 'public'
ORDER BY table_name;

-- 7. Data counts (post ESGARDEN import)
SELECT '7. Data counts:' as validation;
SELECT 'io_sem_clientes' as table_name, COUNT(*) as row_count FROM io_sem_clientes
UNION ALL
SELECT 'io_sem_palabras_clave', COUNT(*) FROM io_sem_palabras_clave
UNION ALL
SELECT 'io_sem_urls_rastreadas', COUNT(*) FROM io_sem_urls_rastreadas
UNION ALL
SELECT 'io_sem_asignaciones_kw_url', COUNT(*) FROM io_sem_asignaciones_kw_url
UNION ALL
SELECT 'io_sem_optimizaciones', COUNT(*) FROM io_sem_optimizaciones;

-- 8. Check for orphaned records (data integrity)
SELECT '8. Orphaned records check:' as validation;
SELECT 'URL without cliente' as issue, COUNT(*) as count
FROM io_sem_urls_rastreadas
WHERE cliente_id NOT IN (SELECT id FROM io_sem_clientes)
UNION ALL
SELECT 'Keyword without cliente', COUNT(*)
FROM io_sem_palabras_clave
WHERE cliente_id NOT IN (SELECT id FROM io_sem_clientes)
UNION ALL
SELECT 'Assignment with missing URL', COUNT(*)
FROM io_sem_asignaciones_kw_url
WHERE url_id NOT IN (SELECT id FROM io_sem_urls_rastreadas)
UNION ALL
SELECT 'Assignment with missing keyword', COUNT(*)
FROM io_sem_asignaciones_kw_url
WHERE keyword_id NOT IN (SELECT id FROM io_sem_palabras_clave)
UNION ALL
SELECT 'Optimization with missing URL', COUNT(*)
FROM io_sem_optimizaciones
WHERE url_id NOT IN (SELECT id FROM io_sem_urls_rastreadas);
