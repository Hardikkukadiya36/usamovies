import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions - 123Movies',
  description: 'Find answers to common questions about 123Movies. Get help with streaming, account issues, and more.',
  keywords: '123movies FAQ, frequently asked questions, help, support, streaming questions',
};

const faqs = [
  {
    question: 'How can I report a broken video?',
    answer: 'If you encounter a broken video, please use the contact form to report the issue. Include the title of the movie or show and the specific issue you\'re experiencing.'
  },
  {
    question: 'Do I need to create an account?',
    answer: 'No, you can enjoy our service without creating an account. All our content is available to stream for free without registration.'
  },
  {
    question: 'Is 123Movies free to use?',
    answer: 'Yes, our service is completely free to use. We don\'t charge for any content or features.'
  },
  {
    question: 'How can I search for specific movies or shows?',
    answer: 'Use the search bar at the top of any page to find specific titles. You can search by movie name, TV show title, or even actor/actress names.'
  },
  {
    question: 'What video quality is available?',
    answer: 'We offer multiple streaming qualities depending on your internet connection. The quality will adjust automatically, but you can also select your preferred quality in the video player settings.'
  },
  {
    question: 'Are subtitles available?',
    answer: 'Yes, most of our content includes multiple subtitle options. Click the CC button in the video player to select your preferred language.'
  },
  {
    question: 'Can I download movies or shows?',
    answer: 'No, our service only supports streaming content online. Downloading content is not available.'
  },
  {
    question: 'Is 123Movies available on mobile devices?',
    answer: 'Yes, our website is fully responsive and works on all mobile devices, including smartphones and tablets.'
  },
  {
    question: 'How often is new content added?',
    answer: 'We regularly update our library with new movies and TV shows. Check back frequently for the latest releases.'
  },
  {
    question: 'Why do I see ads on the site?',
    answer: 'Ads help us keep the service free for all users. We strive to keep ads unobtrusive and relevant to your interests.'
  }
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-[#0d1117] text-gray-100 py-12">
      <div className="container-custom max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-[#2ea043]">Frequently Asked Questions</h1>
        
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-[#161b22] rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-2">{faq.question}</h3>
              <p className="text-gray-300">{faq.answer}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 bg-[#161b22] rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-white">Still have questions?</h2>
          <p className="text-gray-300 mb-4">If you can't find the answer to your question, feel free to contact our support team.</p>
          <a 
            href="/contact" 
            className="inline-block bg-[#238636] hover:bg-[#2ea043] text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}
