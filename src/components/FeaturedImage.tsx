'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

interface FeaturedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

export default function FeaturedImage({ 
  src, 
  alt, 
  className = '',
  width,
  height
}: FeaturedImageProps) {
  const [imageSrc, setImageSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    console.log('FeaturedImage: Source changed', { src });
    if (!src) {
      console.error('FeaturedImage: No source provided');
      setHasError(true);
      return;
    }
    
    // Reset states when src changes
    setIsLoading(true);
    setHasError(false);
    
    // Check if image loads
    const img = new window.Image();
    img.src = src;
    
    img.onload = () => {
      console.log('FeaturedImage: Image loaded successfully', { src });
      setImageSrc(src);
      setIsLoading(false);
    };
    
    img.onerror = (e) => {
      console.error('FeaturedImage: Failed to load image', { 
        src, 
        error: e,
        imgElement: img 
      });
      setHasError(true);
      setIsLoading(false);
    };
    
    return () => {
      // Cleanup
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  if (!src) {
    console.error('FeaturedImage: No source provided');
    return (
      <div className={`relative w-full h-64 bg-red-100 flex items-center justify-center rounded-lg border border-red-200 ${className}`}>
        <span className="text-red-500">No image source provided</span>
      </div>
    );
  }
  
  if (hasError) {
    return (
      <div className={`relative w-full h-64 bg-gray-100 flex items-center justify-center rounded-lg overflow-hidden ${className}`}>
        <span className="text-gray-500">Image not available</span>
      </div>
    );
  }

  return (
    <div className={`relative w-full ${className}`} style={width && height ? {} : { paddingBottom: '56.25%' }}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <span className="text-gray-500">Loading...</span>
        </div>
      )}
      <Image
        src={imageSrc}
        alt={alt}
        fill={!width || !height}
        width={width}
        height={height}
        className={`object-cover transition-opacity duration-200 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
        priority
        onLoad={() => setIsLoading(false)}
        onError={() => {
          console.error(`Failed to load image: ${src}`);
          setHasError(true);
          setIsLoading(false);
        }}
      />
    </div>
  );
}
