import React from 'react'
import { Card } from './UI.jsx'

const METRICS_BY_CATEGORY = {
  'CORE WEB VITALS': [
    {
      title: 'LCP (Largest Contentful Paint)',
      desc: 'Mide el tiempo que tarda en cargarse el elemento visual más grande visible en pantalla. Indica la velocidad de carga percibida.',
      good: '≤2.5s',
      warn: '2.5-4s',
      crit: '>4s',
    },
    {
      title: 'INP (Interaction to Next Paint)',
      desc: 'Mide la capacidad de respuesta de la página ante interacciones del usuario (clics, teclado). Reemplaza a FID desde marzo 2024.',
      good: '≤200ms',
      warn: '200-500ms',
      crit: '>500ms',
    },
    {
      title: 'CLS (Cumulative Layout Shift)',
      desc: 'Mide la estabilidad visual — cuánto se mueven inesperadamente los elementos mientras carga la página.',
      good: '≤0.1',
      warn: '0.1-0.25',
      crit: '>0.25',
    },
    {
      title: 'FCP (First Contentful Paint)',
      desc: 'Tiempo hasta que aparece el primer elemento de contenido (texto o imagen).',
      good: '≤1.8s',
      warn: '1.8-3s',
      crit: '>3s',
    },
    {
      title: 'TTFB (Time to First Byte)',
      desc: 'Tiempo que tarda el servidor en enviar el primer byte de respuesta. Indica la velocidad del servidor y hosting.',
      good: '≤800ms',
      warn: '800ms-1.8s',
      crit: '>1.8s',
    },
    {
      title: 'Speed Index',
      desc: 'Mide qué tan rápido el contenido visible se muestra durante la carga.',
      good: '≤3.4s',
      warn: '3.4-5.8s',
      crit: '>5.8s',
    },
  ],
  'SEO ON-PAGE': [
    {
      title: 'Title Tag',
      desc: 'Título de la página que aparece en Google. Debe ser único, con keyword principal y entre 50-60 caracteres.',
    },
    {
      title: 'Meta Description',
      desc: 'Descripción que aparece bajo el título en Google. Influye en el CTR. Ideal: 140-160 caracteres con llamada a la acción.',
    },
    {
      title: 'H1',
      desc: 'Encabezado principal de la página. Debe haber exactamente uno por página, contener la keyword principal y ser diferente al title tag.',
    },
    {
      title: 'Alt Text',
      desc: 'Texto alternativo de las imágenes. Necesario para accesibilidad y para que Google indexe las imágenes correctamente.',
    },
    {
      title: 'Hreflang',
      desc: 'Etiqueta que indica a Google el idioma y país de cada versión de página. Obligatorio en webs multiidioma o multimercado.',
    },
    {
      title: 'Canonical',
      desc: 'Etiqueta que indica cuál es la URL preferida cuando hay contenido duplicado o similar.',
    },
  ],
  'SEO TÉCNICO': [
    {
      title: 'Compresión Brotli/GZIP',
      desc: 'Comprime los archivos antes de enviarlos al navegador, reduciendo el tamaño de transferencia hasta un 70%.',
    },
    {
      title: 'Render-blocking resources',
      desc: 'Recursos (CSS/JS) que bloquean la carga de la página. Cada recurso bloqueante añade tiempo de carga visible.',
    },
    {
      title: 'Unused CSS/JS',
      desc: 'Código descargado pero no usado en la página actual. Aumenta el peso sin beneficio — se debe diferir o eliminar.',
    },
    {
      title: 'Cache TTL',
      desc: 'Tiempo que el navegador guarda los archivos estáticos en local. Reduce peticiones en visitas posteriores.',
    },
    {
      title: 'Font-display swap',
      desc: 'Permite mostrar texto con fuente alternativa mientras carga la fuente definitiva, evitando texto invisible durante la carga.',
    },
    {
      title: 'HTTP/2',
      desc: 'Protocolo que permite enviar múltiples recursos en paralelo por una sola conexión, acelerando la carga.',
    },
    {
      title: 'Total Blocking Time (TBT)',
      desc: 'Tiempo total en que el hilo principal está bloqueado, impidiendo responder a interacciones del usuario.',
    },
  ],
  'GOOGLE SEARCH CONSOLE': [
    {
      title: 'CTR (Click-Through Rate)',
      desc: 'Porcentaje de usuarios que hacen clic al ver tu resultado en Google.',
      good: '>3%',
      warn: '1.5-3%',
      crit: '<1.5%',
    },
    {
      title: 'Posición media',
      desc: 'Posición promedio en la que aparecen tus páginas en Google.',
      good: '≤10',
      warn: '11-20',
      crit: '>20',
    },
    {
      title: 'Impresiones',
      desc: 'Número de veces que tu web apareció en resultados de búsqueda, aunque el usuario no hiciera clic.',
    },
    {
      title: 'Keywords Top 3/10/100',
      desc: 'Número de keywords posicionadas en cada rango. Las del Top 3 concentran el 75% de los clics orgánicos.',
    },
  ],
  'SEO LOCAL': [
    {
      title: 'NAP Consistency',
      desc: 'Nombre, Dirección y Teléfono deben ser idénticos en la web, Google Business Profile y todos los directorios. Las inconsistencias confunden a Google y reducen el posicionamiento local.',
    },
    {
      title: 'Google Business Profile (GBP)',
      desc: 'Ficha de Google Maps y búsqueda local. Factor #1 de posicionamiento local. Debe estar verificada y completa.',
    },
    {
      title: 'E-E-A-T',
      desc: 'Experience, Expertise, Authoritativeness, Trust. Marco de evaluación de calidad de contenido de Google. Crítico para sectores YMYL (salud, finanzas, legal).',
    },
  ],
  'AI OVERVIEWS 2026': [
    {
      title: 'AI Overviews',
      desc: 'Respuestas generadas por IA que Google muestra encima de los resultados orgánicos. Para aparecer: respuestas directas en primeros 100 palabras, estructura clara, Schema FAQ y fuentes expertas citadas.',
    },
    {
      title: 'Entity SEO',
      desc: 'Optimización basada en entidades (personas, lugares, conceptos) en lugar de solo keywords. Google usa Knowledge Graph para entender de qué trata realmente una web.',
    },
  ],
}

function MetricCard({ metric }) {
  return (
    <div style={{
      background: 'var(--bg-2)',
      borderRadius: 'var(--radius-sm)',
      padding: '0.85rem',
      marginBottom: '0.5rem',
      borderLeft: '3px solid var(--border)',
    }}>
      <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)', marginBottom: '0.5rem' }}>
        {metric.title}
      </div>
      <div style={{ fontSize: 12, color: 'var(--text-2)', marginBottom: '0.5rem', lineHeight: 1.5 }}>
        {metric.desc}
      </div>
      {(metric.good || metric.warn || metric.crit) && (
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', fontSize: 11, color: 'var(--text-3)' }}>
          {metric.good && <span style={{ color: 'var(--ok)' }}>✓ Bueno: {metric.good}</span>}
          {metric.warn && <span style={{ color: 'var(--warn)' }}>⚠ Mejorar: {metric.warn}</span>}
          {metric.crit && <span style={{ color: 'var(--crit)' }}>✗ Crítico: {metric.crit}</span>}
        </div>
      )}
    </div>
  )
}

export function VariablesPanel() {
  return (
    <div>
      {Object.entries(METRICS_BY_CATEGORY).map(([category, metrics]) => (
        <div key={category}>
          <h3 style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)', marginTop: '1.5rem', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            {category}
          </h3>
          <div>
            {metrics.map((metric, i) => <MetricCard key={i} metric={metric} />)}
          </div>
        </div>
      ))}
    </div>
  )
}
