"use client";

import React, { useState } from "react";
import {
  checkMobileOptimization,
  validateRobotsMeta,
} from "@/lib/technical-seo";
import { analyzeInternalLinks } from "@/lib/content";
import { WebVitalsMonitor } from "./WebVitalsMonitor";
import { PerformanceMetrics } from "./PerformanceMetrics";

interface SEODashboardProps {
  pageUrl?: string;
  htmlContent?: string;
}

export function SEODashboard({
  pageUrl = "https://example.com",
  htmlContent = '<html><head><meta name="viewport" content="width=device-width"></head><body></body></html>',
}: SEODashboardProps) {
  const mobileCheck = checkMobileOptimization(htmlContent);
  const robotsCheck = validateRobotsMeta(htmlContent);
  const internalLinks = analyzeInternalLinks(htmlContent, pageUrl);

  const [activeTab, setActiveTab] = useState<
    "web-vitals" | "performance" | "mobile" | "technical"
  >("web-vitals");

  const getScoreColor = (suggestions: string[]) => {
    if (suggestions.length === 0) return "text-green-600";
    if (suggestions.length <= 2) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6 rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-200">
      <div className="border-b border-gray-200">
        <div className="flex gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab("web-vitals")}
            className={`whitespace-nowrap px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === "web-vitals"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Web Vitals
          </button>
          <button
            onClick={() => setActiveTab("performance")}
            className={`whitespace-nowrap px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === "performance"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Performance
          </button>
          <button
            onClick={() => setActiveTab("mobile")}
            className={`whitespace-nowrap px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === "mobile"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Mobile
          </button>
          <button
            onClick={() => setActiveTab("technical")}
            className={`whitespace-nowrap px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === "technical"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Technical
          </button>
        </div>
      </div>

      <div>
        {activeTab === "web-vitals" && <WebVitalsMonitor />}

        {activeTab === "performance" && <PerformanceMetrics />}

        {activeTab === "mobile" && (
          <div className="rounded-lg bg-blue-50 p-6">
            <h3 className="mb-4 text-lg font-bold text-gray-900">
              Mobile Optimization
            </h3>

            <div className="space-y-4">
              <div className="rounded-lg bg-white p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-medium text-gray-900">
                    Viewport Meta Tag
                  </span>
                  {mobileCheck.hasViewportMeta ? (
                    <span className="text-green-600">✓</span>
                  ) : (
                    <span className="text-red-600">✕</span>
                  )}
                </div>
                <p className="text-sm text-gray-600">
                  {mobileCheck.hasViewportMeta
                    ? "Viewport meta tag is properly configured"
                    : "Missing viewport meta tag for mobile optimization"}
                </p>
              </div>

              <div className="rounded-lg bg-white p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-medium text-gray-900">
                    Responsive Images
                  </span>
                  {mobileCheck.hasResponsiveImages ? (
                    <span className="text-green-600">✓</span>
                  ) : (
                    <span className="text-yellow-600">⚠</span>
                  )}
                </div>
                <p className="text-sm text-gray-600">
                  {mobileCheck.hasResponsiveImages
                    ? "Responsive images are being used"
                    : "Consider using responsive images with srcset or picture elements"}
                </p>
              </div>

              <div className="rounded-lg bg-white p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-medium text-gray-900">
                    Text Readability
                  </span>
                  {mobileCheck.readableText ? (
                    <span className="text-green-600">✓</span>
                  ) : (
                    <span className="text-red-600">✕</span>
                  )}
                </div>
                <p className="text-sm text-gray-600">
                  {mobileCheck.readableText
                    ? "Text size is readable on mobile devices"
                    : "Some text is too small for mobile (minimum 12px recommended)"}
                </p>
              </div>

              {mobileCheck.suggestions.length > 0 && (
                <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                  <h4 className="mb-2 font-semibold text-yellow-900">
                    Recommendations:
                  </h4>
                  <ul className="space-y-1 text-sm text-yellow-800">
                    {mobileCheck.suggestions.map((suggestion, idx) => (
                      <li key={idx} className="flex gap-2">
                        <span>→</span> {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "technical" && (
          <div className="space-y-4">
            {/* Robots Meta */}
            <div className="rounded-lg bg-indigo-50 p-6">
              <h3 className="mb-4 text-lg font-bold text-gray-900">
                Robots Meta Configuration
              </h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-lg bg-white p-3">
                  <span className="font-medium text-gray-900">Indexing</span>
                  {!robotsCheck.noindex ? (
                    <span className="text-green-600">✓ Enabled</span>
                  ) : (
                    <span className="text-red-600">✕ Blocked</span>
                  )}
                </div>
                <div className="flex items-center justify-between rounded-lg bg-white p-3">
                  <span className="font-medium text-gray-900">
                    Link Following
                  </span>
                  {!robotsCheck.nofollow ? (
                    <span className="text-green-600">✓ Enabled</span>
                  ) : (
                    <span className="text-red-600">✕ Blocked</span>
                  )}
                </div>
                <div className="flex items-center justify-between rounded-lg bg-white p-3">
                  <span className="font-medium text-gray-900">Snippets</span>
                  {!robotsCheck.nosnippet ? (
                    <span className="text-green-600">✓ Enabled</span>
                  ) : (
                    <span className="text-red-600">✕ Blocked</span>
                  )}
                </div>
              </div>

              {robotsCheck.suggestions.length > 0 && (
                <div className="mt-4 border-t border-indigo-200 pt-4">
                  <h4 className="mb-2 font-semibold text-indigo-900">
                    Recommendations:
                  </h4>
                  <ul className="space-y-1 text-sm text-indigo-800">
                    {robotsCheck.suggestions.map((suggestion, idx) => (
                      <li key={idx} className="flex gap-2">
                        <span>→</span> {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Internal Links */}
            <div className="rounded-lg bg-green-50 p-6">
              <h3 className="mb-4 text-lg font-bold text-gray-900">
                Internal Linking
              </h3>

              <div className="mb-4 grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-white p-4">
                  <p className="text-xs font-medium uppercase text-green-600">
                    Total Links
                  </p>
                  <p className="mt-2 text-2xl font-bold text-green-900">
                    {internalLinks.totalInternalLinks}
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4">
                  <p className="text-xs font-medium uppercase text-green-600">
                    Unique Pages
                  </p>
                  <p className="mt-2 text-2xl font-bold text-green-900">
                    {internalLinks.uniqueLinkedPages.size}
                  </p>
                </div>
              </div>

              {internalLinks.suggestions.length > 0 && (
                <div className="rounded-lg border border-green-200 bg-white p-3">
                  <h4 className="mb-2 text-sm font-semibold text-green-900">
                    Suggestions:
                  </h4>
                  <ul className="space-y-1 text-sm text-green-800">
                    {internalLinks.suggestions.map((suggestion, idx) => (
                      <li key={idx} className="flex gap-2">
                        <span>→</span> {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
