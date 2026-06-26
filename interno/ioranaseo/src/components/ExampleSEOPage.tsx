"use client";

import React from "react";
import { WebVitalsMonitor } from "./WebVitalsMonitor";
import { PerformanceMetrics } from "./PerformanceMetrics";
import { ContentAnalyzer } from "./ContentAnalyzer";
import { SEODashboard } from "./SEODashboard";
import { OptimizedImage } from "./OptimizedImage";

export default function ExampleSEOPage() {
  const sampleHtml = `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="robots" content="index, follow">
      </head>
      <body>
        <h1>The Ultimate Guide to SEO</h1>
        <p>Search engine optimization is crucial for online visibility.
           SEO helps your website rank higher in search results and attracts
           more organic traffic. Learn about SEO best practices and tools
           that can help improve your SEO performance.</p>
        <a href="/blog">Read more SEO articles</a>
        <a href="/tools">SEO tools</a>
      </body>
    </html>
  `;

  return (
    <div className="space-y-8 bg-gray-50 p-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900">
          SEO Advanced Tools Demo
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Explore performance optimization, content analysis, and technical SEO
          utilities
        </p>
      </div>

      {/* Hero Image Example */}
      <section className="rounded-lg bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">
          Optimized Image Example
        </h2>
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-gray-200">
          <OptimizedImage
            src="https://images.unsplash.com/photo-1460925895917-adf4e565db17?w=1200&q=75"
            alt="Digital marketing metrics"
            width={1200}
            height={600}
            priority
          />
        </div>
        <p className="mt-4 text-sm text-gray-600">
          This image is optimized with Next.js Image, WebP/AVIF formats, and
          lazy loading
        </p>
      </section>

      {/* Web Vitals Monitor */}
      <section className="rounded-lg bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">
          Core Web Vitals Monitor
        </h2>
        <WebVitalsMonitor />
        <p className="mt-4 text-sm text-gray-600">
          These metrics measure page experience: LCP (loading speed), FCP (paint
          timing), FID (interactivity), CLS (visual stability), and TTFB (server
          response time).
        </p>
      </section>

      {/* Performance Metrics */}
      <section className="rounded-lg bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">
          Page Performance Metrics
        </h2>
        <PerformanceMetrics />
        <p className="mt-4 text-sm text-gray-600">
          Analyze your page's load times, resource counts, and asset size
          breakdown to identify optimization opportunities.
        </p>
      </section>

      {/* Content Analysis */}
      <section className="rounded-lg bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">
          Content SEO Analysis
        </h2>
        <ContentAnalyzer
          title="The Ultimate Guide to SEO"
          content="Search engine optimization is crucial for online visibility. SEO helps your website rank higher in search results and attracts more organic traffic. Learn about SEO best practices, keyword research, and technical SEO tools that can help improve your overall SEO performance and search rankings."
          targetKeyword="SEO"
        />
        <p className="mt-4 text-sm text-gray-600">
          Validates H1 tags, analyzes keyword density, checks meta descriptions,
          and suggests improvements for better SEO.
        </p>
      </section>

      {/* Complete SEO Dashboard */}
      <section className="rounded-lg bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">
          Complete SEO Dashboard
        </h2>
        <SEODashboard pageUrl="https://example.com" htmlContent={sampleHtml} />
        <p className="mt-4 text-sm text-gray-600">
          Comprehensive dashboard with tabs for Web Vitals, Performance Metrics,
          Mobile Optimization, and Technical SEO settings.
        </p>
      </section>

      {/* Documentation */}
      <section className="rounded-lg bg-blue-50 p-6">
        <h2 className="mb-4 text-2xl font-bold text-blue-900">Documentation</h2>
        <div className="space-y-3 text-sm text-blue-800">
          <p>
            <strong>Paso 4: Performance ⚡</strong>
            <br />
            Image optimization, cache headers, code splitting, and performance
            monitoring.
          </p>
          <p>
            <strong>Paso 5: Content & Keywords 📝</strong>
            <br />
            H1 validation, keyword density analysis, internal linking, and meta
            descriptions.
          </p>
          <p>
            <strong>Paso 6: Technical SEO 🔧</strong>
            <br />
            Web Vitals tracking, mobile optimization, robots meta, and sitemap
            generation.
          </p>
          <p className="mt-4 border-t border-blue-200 pt-4">
            See{" "}
            <code className="bg-white px-2 py-1 text-blue-900">
              docs/SEO-ADVANCED-IMPLEMENTATION.md
            </code>{" "}
            for detailed documentation.
          </p>
        </div>
      </section>
    </div>
  );
}
