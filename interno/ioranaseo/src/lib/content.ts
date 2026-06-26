export interface H1ValidationResult {
  isPresent: boolean;
  content: string | null;
  length: number;
  isOptimal: boolean;
  suggestions: string[];
}

export function validateH1(htmlContent: string): H1ValidationResult {
  const h1Regex = /<h1[^>]*>(.*?)<\/h1>/i;
  const match = htmlContent.match(h1Regex);

  const result: H1ValidationResult = {
    isPresent: !!match,
    content: match ? match[1].replace(/<[^>]*>/g, "") : null,
    length: match ? match[1].replace(/<[^>]*>/g, "").length : 0,
    isOptimal: false,
    suggestions: [],
  };

  if (!result.isPresent) {
    result.suggestions.push("Add an H1 tag to the page");
  } else {
    if (result.length < 30) {
      result.suggestions.push("H1 is too short, aim for 30-60 characters");
    } else if (result.length > 60) {
      result.suggestions.push("H1 is too long, aim for 30-60 characters");
    } else {
      result.isOptimal = true;
    }

    if (htmlContent.match(/<h1/gi)!.length > 1) {
      result.suggestions.push("Multiple H1 tags found, use only one");
    }
  }

  return result;
}

export interface KeywordMetrics {
  keyword: string;
  count: number;
  density: number;
  positions: number[];
  isOptimal: boolean;
}

export interface KeywordAnalysisResult {
  totalWords: number;
  keywords: KeywordMetrics[];
  mainKeyword: KeywordMetrics | null;
  suggestions: string[];
}

export function analyzeKeywordDensity(
  content: string,
  targetKeyword: string,
): KeywordAnalysisResult {
  const text = content.replace(/<[^>]*>/g, " ").toLowerCase();
  const words = text.split(/\s+/).filter((word) => word.length > 0);

  const keywordCount = (
    text.match(new RegExp(`\\b${targetKeyword.toLowerCase()}\\b`, "g")) || []
  ).length;
  const density = (keywordCount / words.length) * 100;

  const positions: number[] = [];
  const regex = new RegExp(`\\b${targetKeyword.toLowerCase()}\\b`, "g");
  let match;
  while ((match = regex.exec(text)) !== null) {
    positions.push(match.index);
  }

  const metrics: KeywordMetrics = {
    keyword: targetKeyword,
    count: keywordCount,
    density: parseFloat(density.toFixed(2)),
    positions,
    isOptimal: density >= 0.5 && density <= 2.5,
  };

  const suggestions: string[] = [];
  if (density < 0.5) {
    suggestions.push(
      `"${targetKeyword}" density is too low (${density.toFixed(2)}%), aim for 0.5-2.5%`,
    );
  } else if (density > 2.5) {
    suggestions.push(
      `"${targetKeyword}" density is too high (${density.toFixed(2)}%), aim for 0.5-2.5% to avoid over-optimization`,
    );
  }

  return {
    totalWords: words.length,
    keywords: [metrics],
    mainKeyword: metrics,
    suggestions,
  };
}

export interface InternalLink {
  url: string;
  text: string;
  anchor: string;
}

export interface InternalLinkingAnalysis {
  totalInternalLinks: number;
  uniqueLinkedPages: Set<string>;
  orphanedPages: string[];
  suggestions: string[];
  links: InternalLink[];
}

export function analyzeInternalLinks(
  htmlContent: string,
  baseUrl: string,
): InternalLinkingAnalysis {
  const aTagRegex = /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1[^>]*>(.*?)<\/a>/gi;
  const links: InternalLink[] = [];
  const uniqueLinkedPages = new Set<string>();

  let match;
  while ((match = aTagRegex.exec(htmlContent)) !== null) {
    const href = match[2];
    const text = match[3].replace(/<[^>]*>/g, "");

    if (href.startsWith(baseUrl) || href.startsWith("/")) {
      links.push({
        url: href,
        text,
        anchor: href.split("#")[1] || "",
      });

      const cleanUrl = href.split("?")[0].split("#")[0];
      uniqueLinkedPages.add(cleanUrl);
    }
  }

  const suggestions: string[] = [];
  if (links.length < 5) {
    suggestions.push(
      "Consider adding more internal links to improve crawlability",
    );
  }

  return {
    totalInternalLinks: links.length,
    uniqueLinkedPages,
    orphanedPages: [],
    suggestions,
    links,
  };
}

export interface MetaDescriptionValidation {
  content: string | null;
  length: number;
  isPresent: boolean;
  isOptimal: boolean;
  suggestions: string[];
}

export function validateAndGenerateMetaDescription(
  title: string,
  content: string,
  customDescription?: string,
): MetaDescriptionValidation {
  const result: MetaDescriptionValidation = {
    content: customDescription || null,
    length: customDescription?.length || 0,
    isPresent: !!customDescription,
    isOptimal: false,
    suggestions: [],
  };

  if (customDescription) {
    if (customDescription.length < 120) {
      result.suggestions.push(
        "Meta description is too short, aim for 120-160 characters",
      );
    } else if (customDescription.length > 160) {
      result.suggestions.push(
        "Meta description is too long, aim for 120-160 characters",
      );
    } else {
      result.isOptimal = true;
    }
  } else {
    result.suggestions.push(
      "No meta description found. Here are some generated options:",
    );

    // Generate from title + first meaningful sentence
    const text = content
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
    const firstSentence = sentences[0]?.trim() || "";

    let generated = `${title}. ${firstSentence}`;
    if (generated.length > 160) {
      generated = generated.substring(0, 157) + "...";
    }

    result.content = generated;
    result.length = generated.length;
  }

  return result;
}

export function generateMetaDescriptionOptions(
  title: string,
  content: string,
): string[] {
  const text = content
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);

  const options: string[] = [];

  // Option 1: Title + first sentence
  let option1 = `${title}. ${sentences[0]?.trim() || ""}`;
  if (option1.length > 160) {
    option1 = option1.substring(0, 157) + "...";
  }
  options.push(option1);

  // Option 2: Title + second sentence
  if (sentences[1]) {
    let option2 = `${title}. ${sentences[1]?.trim() || ""}`;
    if (option2.length > 160) {
      option2 = option2.substring(0, 157) + "...";
    }
    options.push(option2);
  }

  // Option 3: Keyword-focused
  if (title.length > 0) {
    let option3 = `${title} - Learn more about this topic and explore related content in detail.`;
    if (option3.length > 160) {
      option3 = option3.substring(0, 157) + "...";
    }
    options.push(option3);
  }

  return options;
}
