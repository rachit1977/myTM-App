"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ProductIcon } from "./product-icon";
import type { ProductSlug } from "@/types";

interface ProductImageProps {
  slug: ProductSlug;
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

export function ProductImage({
  slug,
  src,
  alt,
  className,
  sizes,
  priority,
}: ProductImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-muted",
          className
        )}
      >
        <ProductIcon slug={slug} size="lg" />
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden bg-muted/40", className)}>
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-muted" />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes ?? "(max-width: 768px) 100vw, 448px"}
        priority={priority}
        className={cn(
          "object-contain transition-opacity duration-300",
          loaded ? "opacity-100" : "opacity-0"
        )}
        onLoad={() => setLoaded(true)}
        onError={() => setErrored(true)}
      />
    </div>
  );
}
