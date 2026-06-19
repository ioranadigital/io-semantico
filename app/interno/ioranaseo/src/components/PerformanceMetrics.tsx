"use client";

import React, { useEffect, useState } from "react";
import {
  getPerformanceMetrics,
  type PerformanceMetricsData,
} from "@/lib/technical-seo";

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
}

function formatMs(ms: number | null): string {
  if (ms === null) return "—";
  return `${Math.round(ms)}ms`;
}

export function PerformanceMetrics() {
  const [metrics, setMetrics] = useState<PerformanceMetricsData | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const performanceMetrics = getPerformanceMetrics();
    setMetrics(performanceMetrics);
  }, []);

  if (!isClient || !metrics) {
    return (
      <div className="rounded-lg bg-gray-100 p-6">
        <h3 className="mb-4 text-lg font-bold text-gray-900">
          Performance Metrics
        </h3>
        <p className="text-sm text-gray-600">Loading performance data...</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-200">
      <h3 className="mb-6 text-lg font-bold text-gray-900">
        Performance Metrics
      </h3>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Load Times */}
        <div className="rounded-lg bg-blue-50 p-4">
          <p className="text-xs font-medium uppercase text-blue-600">
            DOM Loaded
          </p>
          <p className="mt-2 text-2xl font-bold text-blue-900">
            {formatMs(metrics.domContentLoaded)}
          </p>
          <p className="mt-1 text-xs text-blue-600">Time to DOM ready</p>
        </div>

        <div className="rounded-lg bg-purple-50 p-4">
          <p className="text-xs font-medium uppercase text-purple-600">
            Load Complete
          </p>
          <p className="mt-2 text-2xl font-bold text-purple-900">
            {formatMs(metrics.loadComplete)}
          </p>
          <p className="mt-1 text-xs text-purple-600">Total page load time</p>
        </div>

        {/* Resource Count */}
        <div className="rounded-lg bg-indigo-50 p-4">
          <p className="text-xs font-medium uppercase text-indigo-600">
            Resources
          </p>
          <p className="mt-2 text-2xl font-bold text-indigo-900">
            {metrics.resourceCount}
          </p>
          <p className="mt-1 text-xs text-indigo-600">Total requests</p>
        </div>

        {/* Total Size */}
        <div className="rounded-lg bg-green-50 p-4">
          <p className="text-xs font-medium uppercase text-green-600">
            Total Size
          </p>
          <p className="mt-2 text-2xl font-bold text-green-900">
            {formatBytes(metrics.totalSize)}
          </p>
          <p className="mt-1 text-xs text-green-600">Page size</p>
        </div>
      </div>

      {/* Size Breakdown */}
      <div className="mt-6 border-t border-gray-200 pt-6">
        <h4 className="mb-4 text-sm font-semibold text-gray-900">
          Asset Size Breakdown
        </h4>

        <div className="space-y-3">
          {/* JavaScript */}
          <div>
            <div className="mb-1 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                JavaScript
              </span>
              <span className="text-sm text-gray-600">
                {formatBytes(metrics.jsSize)}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full bg-yellow-500"
                style={{
                  width: `${(metrics.jsSize / metrics.totalSize) * 100 || 0}%`,
                }}
              />
            </div>
          </div>

          {/* CSS */}
          <div>
            <div className="mb-1 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">CSS</span>
              <span className="text-sm text-gray-600">
                {formatBytes(metrics.cssSize)}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full bg-blue-500"
                style={{
                  width: `${(metrics.cssSize / metrics.totalSize) * 100 || 0}%`,
                }}
              />
            </div>
          </div>

          {/* Images */}
          <div>
            <div className="mb-1 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Images</span>
              <span className="text-sm text-gray-600">
                {formatBytes(metrics.imageSize)}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full bg-green-500"
                style={{
                  width: `${(metrics.imageSize / metrics.totalSize) * 100 || 0}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="mt-6 border-t border-gray-200 pt-6">
        <h4 className="mb-3 text-sm font-semibold text-gray-900">
          Optimization Tips
        </h4>
        <ul className="space-y-2 text-sm text-gray-700">
          {metrics.jsSize > metrics.totalSize * 0.4 && (
            <li className="flex gap-2">
              <span className="text-yellow-600">⚠</span>
              <span>
                JavaScript is taking up a large portion. Consider code splitting
                and lazy loading.
              </span>
            </li>
          )}
          {metrics.imageSize > metrics.totalSize * 0.5 && (
            <li className="flex gap-2">
              <span className="text-yellow-600">⚠</span>
              <span>
                Images are the largest asset. Use WebP/AVIF formats and optimize
                with tools like TinyPNG.
              </span>
            </li>
          )}
          {metrics.resourceCount > 50 && (
            <li className="flex gap-2">
              <span className="text-yellow-600">⚠</span>
              <span>
                High number of requests detected. Consider bundling and HTTP/2
                optimization.
              </span>
            </li>
          )}
          {metrics.jsSize <= metrics.totalSize * 0.4 &&
            metrics.imageSize <= metrics.totalSize * 0.5 &&
            metrics.resourceCount <= 50 && (
              <li className="flex gap-2">
                <span className="text-green-600">✓</span>
                <span>
                  Performance looks good! Keep monitoring for improvements.
                </span>
              </li>
            )}
        </ul>
      </div>
    </div>
  );
}
