"use client";

import { useEffect, useRef } from "react";

interface AdBannerProps {
  slot: string;
  format?: string;
  layout?: string;
  layoutKey?: string;
  className?: string;
}

export default function AdBanner({ 
  slot, 
  format = "auto",
  layout = "",
  layoutKey = "",
  className = "" 
}: AdBannerProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const adInitialized = useRef(false);

  useEffect(() => {
    // Only initialize once
    if (adInitialized.current || !window) return;
    
    const loadAd = () => {
      try {
        // Check if adsbygoogle is defined
        if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
          // Only push if the ad container is in the viewport
          const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                try {
                  // @ts-ignore
                  (window.adsbygoogle = window.adsbygoogle || []).push({});
                  adInitialized.current = true;
                  observer.disconnect(); // Stop observing once ad is loaded
                } catch (err) {
                  console.error("AdSense push error:", err);
                }
              }
            });
          }, {
            threshold: 0.1 // Trigger when 10% of the ad is visible
          });

          if (adRef.current) {
            observer.observe(adRef.current);
          }

          // Cleanup
          return () => {
            if (adRef.current) {
              observer.unobserve(adRef.current);
            }
          };
        } else {
          // If adsbygoogle is not loaded yet, retry after a delay
          const timer = setTimeout(loadAd, 500);
          return () => clearTimeout(timer);
        }
      } catch (err) {
        console.error("AdSense error:", err);
      }
    };

    // Add a small delay to ensure the DOM is ready
    const timer = setTimeout(loadAd, 300);
    return () => clearTimeout(timer);
  }, [slot]);

  return (
    <div className={`container-custom py-4 ${className}`}>
      <div 
        ref={adRef}
        className="bg-gray-900 rounded-lg p-4 flex items-center justify-center min-h-[90px] sm:min-h-[250px] border border-gray-800 w-full overflow-hidden"
        style={{ minWidth: '320px' }}
      >
        <ins
          className="adsbygoogle"
          style={{
            display: 'block',
            minWidth: '320px',
            width: '100%',
            height: format === 'auto' ? 'auto' : '250px',
          }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive={format === 'auto' ? 'true' : 'false'}
          data-ad-layout={layout || undefined}
          data-ad-layout-key={layoutKey || undefined}
        ></ins>
        
        {/* Fallback for development and ad blockers */}
        <div className="text-gray-600 text-center" style={{ display: 'none' }}>
          <p className="text-sm">Advertisement</p>
          <p className="text-xs mt-1">Google AdSense - {slot}</p>
        </div>
      </div>
    </div>
  );
}
