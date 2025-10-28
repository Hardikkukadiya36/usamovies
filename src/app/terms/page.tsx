import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service - 123Movies',
  description: 'Terms and Conditions for using 123Movies streaming service.',
  alternates: {
    canonical: 'https://123movies.com/terms',
  },
};

export default function TermsOfService() {
  return (
    <div className="container-custom py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-white">Terms of Service</h1>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-gray-300 mb-6">Last updated: October 25, 2024</p>
          
          <section className="mb-8">
            <p className="text-gray-300 mb-6">
              Welcome to 123Movies. By accessing or using our website, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">1. Use License</h2>
            <p className="text-gray-300 mb-4">
              Permission is granted to temporarily access the materials on 123Movies' website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
            </p>
            <p className="text-gray-300 mb-4">
              Under this license, you may not:
            </p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2 mb-6">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose</li>
              <li>Attempt to reverse engineer any software contained on 123Movies' website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">2. Disclaimer</h2>
            <p className="text-gray-300 mb-4">
              The materials on 123Movies' website are provided on an 'as is' basis. 123Movies makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">3. Limitations</h2>
            <p className="text-gray-300 mb-4">
              In no event shall 123Movies or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on 123Movies' website, even if 123Movies or a 123Movies authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">4. Accuracy of Materials</h2>
            <p className="text-gray-300 mb-4">
              The materials appearing on 123Movies' website could include technical, typographical, or photographic errors. 123Movies does not warrant that any of the materials on its website are accurate, complete, or current.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">5. Links</h2>
            <p className="text-gray-300 mb-4">
              123Movies has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by 123Movies of the site. Use of any such linked website is at the user's own risk.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">6. Modifications</h2>
            <p className="text-gray-300 mb-4">
              123Movies may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">7. Governing Law</h2>
            <p className="text-gray-300 mb-4">
              These terms and conditions are governed by and construed in accordance with the laws of the United States and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">8. Contact Us</h2>
            <p className="text-gray-300">
              If you have any questions about these Terms of Service, please contact us at{' '}
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
