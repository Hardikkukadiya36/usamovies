import Link from "next/link";
import { Film, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0d1117] border-t border-gray-800 mt-20">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Film className="w-8 h-8 text-[#2ea043]" />
              <span className="text-2xl font-bold">
                <span className="text-[#2ea043]">123</span>
                <span className="text-white">Movies</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm">
              Your ultimate destination for streaming the latest movies and TV shows in HD quality. Watch free movies online without registration.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#2ea043] transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#2ea043] transition-colors" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#2ea043] transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#2ea043] transition-colors" aria-label="YouTube">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/movies" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Movies
                </Link>
              </li>
              <li>
                <Link href="/tv-shows" className="text-gray-400 hover:text-white transition-colors text-sm">
                  TV Shows
                </Link>
              </li>
              <li>
                <Link href="/trending" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Trending Now
                </Link>
              </li>
              <li>
                <Link href="/genres" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Browse Genres
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4">Popular Genres</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/genre/28" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Action Movies
                </Link>
              </li>
              <li>
                <Link href="/genre/35" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Comedy Movies
                </Link>
              </li>
              <li>
                <Link href="/genre/27" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Horror Movies
                </Link>
              </li>
              <li>
                <Link href="/genre/10749" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Romance Movies
                </Link>
              </li>
              <li>
                <Link href="/genre/878" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Science Fiction
                </Link>
              </li>
              <li>
                <Link href="/genre/53" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Thriller
                </Link>
              </li>
              <li>
                <Link href="/genre/18" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Drama
                </Link>
              </li>
              <li>
                <Link href="/genre/16" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Animation
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Information</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/dmca" className="text-gray-400 hover:text-white transition-colors text-sm">
                  DMCA
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} 123Movies. All rights reserved. This site does not store any files on its server.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
              <span>Watch Movies Online</span>
              <span>•</span>
              <span>Free Streaming</span>
              <span>•</span>
              <span>HD Quality</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
