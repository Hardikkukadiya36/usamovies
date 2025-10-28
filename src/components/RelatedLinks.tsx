"use client";

import Link from "next/link";
import { TrendingUp, Film, Sparkles, Search } from "lucide-react";

export default function RelatedLinks() {
  const links = [
    {
      icon: TrendingUp,
      title: "Trending Movies",
      description: "Most popular movies this week",
      href: "/trending",
      color: "from-red-600 to-orange-600"
    },
    {
      icon: Film,
      title: "All Movies",
      description: "Browse our complete collection",
      href: "/movies",
      color: "from-blue-600 to-cyan-600"
    },
    {
      icon: Sparkles,
      title: "Browse Genres",
      description: "Find movies by category",
      href: "/genres",
      color: "from-purple-600 to-pink-600"
    },
    {
      icon: Search,
      title: "Search Movies",
      description: "Find your favorite films",
      href: "/search",
      color: "from-green-600 to-emerald-600"
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <Link
            key={link.href}
            href={link.href}
            className="group"
          >
            <div className={`bg-gradient-to-br ${link.color} rounded-lg p-6 h-full transition-all duration-300 hover:scale-105 hover:shadow-xl`}>
              <Icon className="w-8 h-8 text-white mb-3" />
              <h3 className="text-lg font-bold text-white mb-1">
                {link.title}
              </h3>
              <p className="text-sm text-white/80">
                {link.description}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
