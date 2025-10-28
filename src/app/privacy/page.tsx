import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy - 123Movies',
  description: 'Read our Privacy Policy to understand how we collect, use, and protect your information when you use our streaming service.',
  alternates: {
    canonical: 'https://123movies.com/privacy',
  },
};

export default function PrivacyPolicy() {
  return (
    <div className="container-custom py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-white">Privacy Policy</h1>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-gray-300 mb-6">Last updated: October 25, 2024</p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">1. Information We Collect</h2>
            <p className="text-gray-300 mb-4">
              We collect information that your browser sends whenever you visit our website. This may include:
            </p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2 mb-6">
              <li>Your IP address</li>
              <li>Browser type and version</li>
              <li>Pages you visit on our site</li>
              <li>Time and date of your visit</li>
              <li>Time spent on those pages</li>
              <li>Other diagnostic data</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-300 mb-4">
              We use the collected data for various purposes:
            </p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2 mb-6">
              <li>To provide and maintain our service</li>
              <li>To notify you about changes to our service</li>
              <li>To allow you to participate in interactive features</li>
              <li>To provide customer support</li>
              <li>To gather analysis or valuable information</li>
              <li>To monitor the usage of our service</li>
              <li>To detect, prevent and address technical issues</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">3. Cookies and Tracking</h2>
            <p className="text-gray-300 mb-4">
              We use cookies and similar tracking technologies to track activity on our website and hold certain information.
              You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">4. Third-Party Services</h2>
            <p className="text-gray-300 mb-4">
              We may employ third-party companies and individuals to facilitate our service, provide the service on our behalf,
              perform service-related services, or assist us in analyzing how our service is used.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">5. Changes to This Privacy Policy</h2>
            <p className="text-gray-300 mb-4">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
              Privacy Policy on this page and updating the "Last updated" date at the top of this policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">6. Contact Us</h2>
            <p className="text-gray-300">
              If you have any questions about this Privacy Policy, please contact us at{' '}
              <Link href="/contact" className="text-blue-400 hover:underline">
                our contact page
              </Link>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
