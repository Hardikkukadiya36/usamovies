import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - 123Movies',
  description: 'Get in touch with 123Movies. We value your feedback and are here to help with any questions or concerns.',
  keywords: 'contact 123movies, support, feedback, help, customer service',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#0d1117] text-gray-100 py-12">
      <div className="container-custom max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-[#2ea043]">Contact Us</h1>
        
        <div className="bg-[#161b22] rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-white">Send us a Message</h2>
          
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-2 rounded-md bg-[#0d1117] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#2ea043] focus:border-transparent"
                placeholder="John Doe"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 rounded-md bg-[#0d1117] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#2ea043] focus:border-transparent"
                placeholder="your@email.com"
                required
              />
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="w-full px-4 py-2 rounded-md bg-[#0d1117] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#2ea043] focus:border-transparent"
                placeholder="How can we help?"
                required
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className="w-full px-4 py-2 rounded-md bg-[#0d1117] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#2ea043] focus:border-transparent"
                placeholder="Please type your message here..."
                required
              ></textarea>
            </div>
            
            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 text-[#2ea043] focus:ring-[#2ea043] border-gray-600 rounded"
                required
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-300">
                I agree to the <a href="/terms" className="text-[#2ea043] hover:underline">Terms of Service</a> and <a href="/privacy" className="text-[#2ea043] hover:underline">Privacy Policy</a>
              </label>
            </div>
            
            <div>
              <button
                type="submit"
                className="w-full md:w-auto bg-[#238636] hover:bg-[#2ea043] text-white font-semibold py-2 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#161b22] rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-white">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-[#2ea043]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-3 text-base text-gray-300">
                  <p>Email us at</p>
                  <a href="mailto:support@123movies.com" className="text-[#2ea043] hover:underline">support@123movies.com</a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-[#2ea043]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                </div>
                <div className="ml-3 text-base text-gray-300">
                  <p>Live Chat</p>
                  <p className="text-sm text-gray-400">Available 24/7</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-[#2ea043]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-3 text-base text-gray-300">
                  <p>Response Time</p>
                  <p className="text-sm text-gray-400">Typically within 24 hours</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-[#161b22] rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-white">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-[#2ea043]">How can I report a broken video?</h4>
                <p className="text-sm text-gray-400 mt-1">Please use the contact form to report any issues with video playback.</p>
              </div>
              
              <div>
                <h4 className="font-medium text-[#2ea043]">Do I need to create an account?</h4>
                <p className="text-sm text-gray-400 mt-1">No, you can enjoy our service without creating an account.</p>
              </div>
              
              <div>
                <h4 className="font-medium text-[#2ea043]">Is 123Movies free to use?</h4>
                <p className="text-sm text-gray-400 mt-1">Yes, our service is completely free to use.</p>
              </div>
              
              <div className="pt-2">
                <a href="/faq" className="text-[#2ea043] hover:underline text-sm font-medium">
                  View all FAQs →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
