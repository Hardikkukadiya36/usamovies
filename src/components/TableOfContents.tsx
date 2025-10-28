'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    const article = document.querySelector('article');
    if (!article) return;

    const headingElements = Array.from(
      article.querySelectorAll<HTMLHeadingElement>('h2, h3, h4')
    );

    const newHeadings: Heading[] = [];
    let idCounter = 0;

    headingElements.forEach((heading) => {
      // If the heading doesn't have an ID, add one
      if (!heading.id) {
        heading.id = `heading-${idCounter++}`;
      }
      
      newHeadings.push({
        id: heading.id,
        text: heading.textContent || '',
        level: parseInt(heading.tagName.substring(1)), // h2 -> 2, h3 -> 3, etc.
      });
    });

    setHeadings(newHeadings);
  }, [pathname]);

  if (headings.length === 0) {
    return null;
  }

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="sticky top-24 self-start max-h-[calc(100vh-120px)] overflow-y-auto">
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h2 className="text-lg font-semibold mb-3 text-gray-900">Table of Contents</h2>
        <ul className="space-y-2">
          {headings.map((heading) => (
            <li key={heading.id}>
              <button
                onClick={() => scrollToHeading(heading.id)}
                className={`text-left text-sm hover:text-blue-600 transition-colors ${
                  heading.level === 3 ? 'ml-4' : ''
                } ${heading.level === 4 ? 'ml-8' : ''}`}
                style={{ color: '#000' }}
              >
                {heading.text}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
