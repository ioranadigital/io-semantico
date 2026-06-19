"use client";

import React, { useState } from "react";
import {
  validateH1,
  analyzeKeywordDensity,
  validateAndGenerateMetaDescription,
} from "@/lib/content";

interface ContentAnalyzerProps {
  title?: string;
  content?: string;
  targetKeyword?: string;
}

export function ContentAnalyzer({
  title = "Sample Title",
  content = "Sample content for analysis",
  targetKeyword = "sample",
}: ContentAnalyzerProps) {
  const [analysis, setAnalysis] = useState(() => {
    const h1Result = validateH1(`<h1>${title}</h1>${content}`);
    const keywordResult = analyzeKeywordDensity(content, targetKeyword);
    const metaResult = validateAndGenerateMetaDescription(title, content);

    return { h1Result, keywordResult, metaResult };
  });

  const handleAnalyze = (newContent: string, newKeyword: string) => {
    const h1Result = validateH1(`<h1>${title}</h1>${newContent}`);
    const keywordResult = analyzeKeywordDensity(newContent, newKeyword);
    const metaResult = validateAndGenerateMetaDescription(title, newContent);
    setAnalysis({ h1Result, keywordResult, metaResult });
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-200">
      <h3 className="mb-6 text-lg font-bold text-gray-900">
        Content SEO Analysis
      </h3>

      {/* H1 Analysis */}
      <div className="mb-6 rounded-lg bg-blue-50 p-4">
        <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-blue-900">
          {analysis.h1Result.isOptimal ? (
            <span className="text-lg">✓</span>
          ) : (
            <span className="text-lg">⚠</span>
          )}
          H1 Tag Analysis
        </h4>
        <div className="space-y-2 text-sm text-blue-800">
          <p>
            <span className="font-medium">Status:</span>{" "}
            {analysis.h1Result.isPresent
              ? `Found - ${analysis.h1Result.length} characters`
              : "Not found"}
          </p>
          {analysis.h1Result.content && (
            <p className="italic text-blue-700">
              "{analysis.h1Result.content}"
            </p>
          )}
          {analysis.h1Result.suggestions.length > 0 && (
            <div className="border-t border-blue-200 pt-2">
              {analysis.h1Result.suggestions.map((suggestion, idx) => (
                <p key={idx} className="flex gap-2">
                  <span className="text-blue-600">→</span> {suggestion}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Keyword Analysis */}
      <div className="mb-6 rounded-lg bg-green-50 p-4">
        <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-green-900">
          {analysis.keywordResult.mainKeyword?.isOptimal ? (
            <span className="text-lg">✓</span>
          ) : (
            <span className="text-lg">⚠</span>
          )}
          Keyword Density
        </h4>
        <div className="space-y-2 text-sm text-green-800">
          <p>
            <span className="font-medium">Keyword:</span> "
            {analysis.keywordResult.mainKeyword?.keyword}"
          </p>
          <p>
            <span className="font-medium">Density:</span>{" "}
            {analysis.keywordResult.mainKeyword?.density}%
          </p>
          <p>
            <span className="font-medium">Count:</span>{" "}
            {analysis.keywordResult.mainKeyword?.count} occurrences
          </p>
          <p>
            <span className="font-medium">Total Words:</span>{" "}
            {analysis.keywordResult.totalWords}
          </p>
          {analysis.keywordResult.suggestions.length > 0 && (
            <div className="border-t border-green-200 pt-2">
              {analysis.keywordResult.suggestions.map((suggestion, idx) => (
                <p key={idx} className="flex gap-2">
                  <span className="text-green-600">→</span> {suggestion}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Meta Description */}
      <div className="rounded-lg bg-purple-50 p-4">
        <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-purple-900">
          {analysis.metaResult.isOptimal ? (
            <span className="text-lg">✓</span>
          ) : (
            <span className="text-lg">⚠</span>
          )}
          Meta Description
        </h4>
        <div className="space-y-2 text-sm text-purple-800">
          <p>
            <span className="font-medium">Status:</span>{" "}
            {analysis.metaResult.isPresent ? "Present" : "Missing"}
          </p>
          {analysis.metaResult.content && (
            <>
              <p className="italic text-purple-700">
                "{analysis.metaResult.content}"
              </p>
              <p className="text-purple-700">
                Length:{" "}
                <span className="font-medium">
                  {analysis.metaResult.length}
                </span>{" "}
                characters
              </p>
            </>
          )}
          {analysis.metaResult.suggestions.length > 0 && (
            <div className="border-t border-purple-200 pt-2">
              {analysis.metaResult.suggestions.map((suggestion, idx) => (
                <p key={idx} className="flex gap-2">
                  <span className="text-purple-600">→</span> {suggestion}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
