"use client";

import React from "react";
import { useWebVitalsTracker, VITALS_THRESHOLDS } from "@/lib/technical-seo";

interface VitalBadgeProps {
  label: string;
  value: number | null;
  unit: string;
  threshold: { good: number; poor: number };
}

function VitalBadge({ label, value, unit, threshold }: VitalBadgeProps) {
  if (value === null) {
    return (
      <div className="flex items-center justify-between rounded-lg bg-gray-100 px-4 py-2">
        <span className="text-sm font-medium text-gray-600">{label}</span>
        <span className="text-xs text-gray-500">Loading...</span>
      </div>
    );
  }

  const isGood = value <= threshold.good;
  const isPoor = value > threshold.poor;
  const status = isGood ? "good" : isPoor ? "poor" : "needs-improvement";

  const statusClasses = {
    good: "bg-green-100 text-green-800",
    "needs-improvement": "bg-yellow-100 text-yellow-800",
    poor: "bg-red-100 text-red-800",
  };

  return (
    <div className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-2">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-600">
          {value.toFixed(0)}
          {unit}
        </span>
        <span
          className={`rounded px-2 py-1 text-xs font-semibold ${statusClasses[status]}`}
        >
          {status === "good" ? "✓" : status === "needs-improvement" ? "⚠" : "✕"}
        </span>
      </div>
    </div>
  );
}

export function WebVitalsMonitor() {
  const metrics = useWebVitalsTracker();

  const statusClass =
    metrics.rating === "good"
      ? "bg-green-50 border-green-200"
      : metrics.rating === "poor"
        ? "bg-red-50 border-red-200"
        : "bg-yellow-50 border-yellow-200";

  const statusColor =
    metrics.rating === "good"
      ? "text-green-800"
      : metrics.rating === "poor"
        ? "text-red-800"
        : "text-yellow-800";

  return (
    <div className={`rounded-lg border ${statusClass} p-6`}>
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900">Web Vitals</h3>
        <div
          className={`rounded-full px-3 py-1 text-sm font-semibold ${statusColor}`}
        >
          {metrics.rating === "good"
            ? "✓ Good"
            : metrics.rating === "poor"
              ? "✕ Poor"
              : "⚠ Needs Improvement"}
        </div>
      </div>

      <div className="space-y-3">
        <VitalBadge
          label="LCP (Largest Contentful Paint)"
          value={metrics.lcp}
          unit="ms"
          threshold={VITALS_THRESHOLDS.lcp}
        />
        <VitalBadge
          label="FCP (First Contentful Paint)"
          value={metrics.fcp}
          unit="ms"
          threshold={VITALS_THRESHOLDS.fcp}
        />
        <VitalBadge
          label="FID (First Input Delay)"
          value={metrics.fid}
          unit="ms"
          threshold={VITALS_THRESHOLDS.fid}
        />
        <VitalBadge
          label="CLS (Cumulative Layout Shift)"
          value={metrics.cls}
          unit=""
          threshold={VITALS_THRESHOLDS.cls}
        />
        <VitalBadge
          label="TTFB (Time to First Byte)"
          value={metrics.ttfb}
          unit="ms"
          threshold={VITALS_THRESHOLDS.ttfb}
        />
      </div>

      <div className="mt-4 border-t border-gray-200 pt-4">
        <p className="text-xs text-gray-600">
          Core Web Vitals are real user metrics that Google uses to evaluate
          page experience. Good performance improves your search ranking.
        </p>
      </div>
    </div>
  );
}
