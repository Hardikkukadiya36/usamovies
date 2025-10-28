"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, Menu, X, Film } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0d1117]/95 backdrop-blur-sm border-b border-gray-800">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Film className="w-8 h-8 text-[#2ea043] group-hover:text-[#2ea043]/80 transition-colors" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#2ea043] rounded-full animate-pulse"></div>
            </div>
            <span className="text-2xl font-bold">
              <span className="text-[#2ea043]">123</span>
              <span className="text-white">Movies</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-300 hover:text-[#2ea043] transition-colors font-medium">
              Home
            </Link>
            <Link href="/movies" className="text-gray-300 hover:text-[#2ea043] transition-colors font-medium">
              Movies
            </Link>
            <Link href="/tv-shows" className="text-gray-300 hover:text-[#2ea043] transition-colors font-medium">
              TV Shows
            </Link>
            <Link href="/trending" className="text-gray-300 hover:text-[#2ea043] transition-colors font-medium">
              Trending
            </Link>
            <Link href="/genres" className="text-gray-300 hover:text-[#2ea043] transition-colors font-medium">
              Genres
            </Link>
          </nav>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search movies, TV shows..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field w-64 pr-10"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </form>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-300 hover:text-[#2ea043] transition-colors font-medium">
                Home
              </Link>
              <Link href="/movies" className="text-gray-300 hover:text-[#2ea043] transition-colors font-medium">
                Movies
              </Link>
              <Link href="/tv-shows" className="text-gray-300 hover:text-[#2ea043] transition-colors font-medium">
                TV Shows
              </Link>
              <Link href="/trending" className="text-gray-300 hover:text-[#2ea043] transition-colors font-medium">
                Trending
              </Link>
              <Link href="/genres" className="text-gray-300 hover:text-[#2ea043] transition-colors font-medium">
                Genres
              </Link>
              <form onSubmit={handleSearch} className="pt-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input-field w-full pr-10"
                  />
                  <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Search className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
