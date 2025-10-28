'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface BlogContentProps {
  content: string;
  className?: string;
}

export default function BlogContent({ content, className = '' }: BlogContentProps) {
  const [processedContent, setProcessedContent] = useState<string>('');

  useEffect(() => {
    // Process the content to add IDs to headings and prepare images
    const processContent = () => {
      try {
        console.log('Processing blog content...');
        
        // Add IDs to headings
        let processed = content
          .replace(
            /<h([2-4])>(.*?)<\/h[2-4]>/g, 
            (_, level, headingContent) => {
              const id = headingContent
                .toLowerCase()
                .replace(/[^\w\s-]/g, '')
                .replace(/\s+/g, '-');
              return `<h${level} id="${id}">${headingContent}</h${level}>`;
            }
          );

        // Replace img tags with our custom image component
        processed = processed.replace(
          /<img([^>]*)>/g, 
          (match) => {
            try {
              const srcMatch = match.match(/src=["'](.*?)["']/);
              const altMatch = match.match(/alt=["'](.*?)["']/);
              const classMatch = match.match(/class=["'](.*?)["']/);
              const widthMatch = match.match(/width=["'](\d+)["']/);
              const heightMatch = match.match(/height=["'](\d+)["']/);
              
              if (!srcMatch || !srcMatch[1]) {
                console.warn('Image tag without valid src attribute:', match);
                return '';
              }
              
              const src = srcMatch[1].trim();
              const alt = altMatch?.[1] || '';
              const className = classMatch?.[1] || '';
              const width = widthMatch ? parseInt(widthMatch[1]) : undefined;
              const height = heightMatch ? parseInt(heightMatch[1]) : undefined;
              
              console.log('Processing image:', { src, alt, width, height });
              
              return `
                <div class="relative my-6 w-full ${className}" 
                     data-image-src="${src}" 
                     data-image-alt="${alt}" 
                     ${width ? `data-width="${width}"` : ''} 
                     ${height ? `data-height="${height}"` : ''}>
                  <div class="w-full h-64 bg-gray-100 flex items-center justify-center rounded-lg">
                    <span class="text-gray-400">Loading image...</span>
                  </div>
                </div>
              `;
            } catch (error) {
              console.error('Error processing image tag:', error);
              return '';
            }
          }
        );

        setProcessedContent(processed);
      } catch (error) {
        console.error('Error processing blog content:', error);
        setProcessedContent(content); // Fallback to original content
      }
    };

    processContent();
  }, [content]);

  useEffect(() => {
    // Client-side image loading
    const loadImages = () => {
      try {
        console.log('Loading images in blog content...');
        const imageContainers = document.querySelectorAll('[data-image-src]');
        console.log(`Found ${imageContainers.length} image containers`);
        
        imageContainers.forEach((container, index) => {
          try {
            const src = container.getAttribute('data-image-src');
            const alt = container.getAttribute('data-image-alt') || '';
            const width = container.getAttribute('data-width');
            const height = container.getAttribute('data-height');
            
            if (!src) {
              console.warn(`Image container ${index} has no data-image-src`);
              return;
            }
            
            console.log(`Loading image ${index + 1}:`, { src, alt, width, height });
            
            const img = new window.Image();
            img.src = src;
            img.alt = alt;
            img.className = 'w-full h-auto rounded-lg';
            img.loading = 'lazy';
            
            if (width) img.width = parseInt(width);
            if (height) img.height = parseInt(height);
            
            img.onload = function() {
              console.log(`Image loaded: ${src}`);
              container.innerHTML = '';
              container.appendChild(img);
            };
            
            img.onerror = function(error) {
              console.error(`Failed to load image: ${src}`, error);
              container.innerHTML = `
                <div class="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
                  <span class="text-gray-500">Image not available</span>
                </div>
              `;
            };
          } catch (error) {
            console.error(`Error loading image ${index + 1}:`, error);
          }
        });
      } catch (error) {
        console.error('Error in loadImages:', error);
      }
    };

    // Run after the component mounts and when processed content changes
    const timer = setTimeout(() => {
      loadImages();
    }, 100); // Small delay to ensure DOM is ready
    
    // Cleanup
    return () => {
      clearTimeout(timer);
    };
  }, [processedContent]);

  return (
    <div 
      className={`prose max-w-none prose-lg ${className}`}
      dangerouslySetInnerHTML={{ __html: processedContent }}
    />
  );
}
