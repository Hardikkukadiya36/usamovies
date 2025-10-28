import React from 'react';

export const metadata = {
  title: 'About Us - 123Movies',
  description: 'Learn more about 123Movies - Your ultimate destination for streaming movies and TV shows online for free.',
  keywords: 'about 123movies, about us, streaming movies, watch movies online',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0d1117] text-gray-100 py-12">
      <div className="container-custom">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-[#2ea043]">About 123Movies</h1>
        
        <div className="bg-[#161b22] rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-white">Who We Are</h2>
          <p className="text-gray-300 mb-4">
            123Movies is your premier destination for streaming the latest movies and TV shows online. 
            We provide a vast collection of high-quality content that you can watch for free.
          </p>
          <p className="text-gray-300 mb-4">
            Our platform is designed to be user-friendly, with a clean interface that makes it easy to find and watch 
            your favorite movies and TV shows across various genres.
          </p>
        </div>

        <div className="bg-[#161b22] rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-white">Our Mission</h2>
          <p className="text-gray-300">
            Our mission is to provide free access to entertainment for everyone. We strive to maintain a platform 
            that is easy to use, reliable, and constantly updated with the latest content.
          </p>
        </div>

        <div className="bg-[#161b22] rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-white">Disclaimer</h2>
          <p className="text-gray-300 mb-4">
            123Movies does not host any videos on its servers. All content is provided by non-affiliated third parties.
            We do not accept responsibility for content hosted on third-party sites.
          </p>
          <p className="text-gray-300">
            By using our service, you acknowledge that you are complying with all applicable laws regarding copyright 
            and content usage in your country.
          </p>
        </div>
      </div>
    </div>
  );
}
