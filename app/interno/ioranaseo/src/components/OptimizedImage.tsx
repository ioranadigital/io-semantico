"use client";

import Image from "next/image";
import React, { CSSProperties } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  quality?: number;
  className?: string;
  style?: CSSProperties;
  sizes?: string;
  fill?: boolean;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  quality = 75,
  className = "",
  style,
  sizes,
  fill = false,
}: OptimizedImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      priority={priority}
      quality={quality}
      className={className}
      style={style}
      sizes={sizes}
      fill={fill}
      loading={priority ? "eager" : "lazy"}
    />
  );
}

interface ResponsiveImageProps extends OptimizedImageProps {
  srcSet?: Record<string, string>;
  placeholder?: "blur" | "empty";
}

export function ResponsiveImage({
  src,
  alt,
  width,
  height,
  srcSet,
  placeholder,
  ...props
}: ResponsiveImageProps) {
  const imageSizes = [
    "(max-width: 640px) 100vw",
    "(max-width: 1024px) 50vw",
    "(max-width: 1280px) 33vw",
    "100vw",
  ].join(", ");

  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={imageSizes}
      {...props}
    />
  );
}
