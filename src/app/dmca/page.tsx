import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'DMCA - 123Movies',
  description: 'DMCA Copyright Infringement Notification and Takedown Policy for 123Movies.',
  alternates: {
    canonical: 'https://123movies.com/dmca',
  },
};

export default function DMCAPage() {
  return (
    <div className="container-custom py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-white">DMCA Copyright Infringement Notification</h1>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-gray-300 mb-6">Last updated: October 25, 2024</p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Digital Millennium Copyright Act (DMCA) Policy</h2>
            <p className="text-gray-300 mb-4">
              123Movies respects the intellectual property rights of others and expects its users to do the same. In accordance with the Digital Millennium Copyright Act of 1998, the text of which may be found on the U.S. Copyright Office website at <a href="https://www.copyright.gov/legislation/dmca.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">copyright.gov</a>, we will respond expeditiously to claims of copyright infringement committed using our website that are reported to our designated copyright agent.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Reporting Claims of Copyright Infringement</h2>
            <p className="text-gray-300 mb-4">
              If you are a copyright owner, or authorized to act on behalf of one, and you believe that the copyrighted work has been copied in a way that constitutes copyright infringement, please submit your claim via email to <strong>dmca@123movies.com</strong> with the subject line: "DMCA Takedown Request".
            </p>
            <p className="text-gray-300 mb-4">
              Your DMCA notice must include the following information:
            </p>
            <ul className="list-decimal pl-6 text-gray-300 space-y-2 mb-6">
              <li>Your physical or electronic signature (typing your full name will suffice).</li>
              <li>Identification of the copyrighted work you believe to have been infringed.</li>
              <li>Identification of the material you claim is infringing, including the URL or other specific location on the service where the material you claim is located.</li>
              <li>Your name, address, telephone number, and email address.</li>
              <li>A statement that you have a good faith belief that the use of the material is not authorized by the copyright owner, its agent, or the law.</li>
              <li>A statement made under penalty of perjury that the information provided is accurate and that you are authorized to make the complaint on behalf of the copyright owner.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Counter-Notification Process</h2>
            <p className="text-gray-300 mb-4">
              If you believe that your content was removed or disabled by mistake or as a result of misidentification, you may file a counter-notification with us by submitting written notification to our copyright agent at the email address provided above.
            </p>
            <p className="text-gray-300 mb-4">
              Your counter-notification must include:
            </p>
            <ul className="list-decimal pl-6 text-gray-300 space-y-2 mb-6">
              <li>Your physical or electronic signature.</li>
              <li>Identification of the material that has been removed or to which access has been disabled and the location at which the material appeared before it was removed or access disabled.</li>
              <li>A statement under penalty of perjury that you have a good faith belief that the material was removed or disabled as a result of mistake or misidentification.</li>
              <li>Your name, address, and telephone number, and a statement that you consent to the jurisdiction of the federal court in your location.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Repeat Infringers</h2>
            <p className="text-gray-300 mb-4">
              It is our policy to disable and/or terminate the accounts of users who are repeat infringers in appropriate circumstances.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Contact Information</h2>
            <p className="text-gray-300">
              Please direct all DMCA notices and counter-notices to our designated agent:
            </p>
            <address className="not-italic text-gray-300 mt-2">
              DMCA Agent<br />
              123Movies<br />
              Email: dmca@123movies.com
            </address>
            <p className="text-gray-300 mt-4">
              Note: This email address is for copyright infringement notices only. For other inquiries, please use our <Link href="/contact" className="text-blue-400 hover:underline">contact form</Link>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
