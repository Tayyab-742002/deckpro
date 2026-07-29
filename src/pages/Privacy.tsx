import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

// Reflects what the site actually does with personal information — keep in
// sync if the enquiry flow or third-party services change.
const Privacy = () => {
  return (
    <main className="bg-white">
      <section className="bg-gradient-to-b from-[#8CC3C8]/30 to-white pt-44 sm:pt-52 pb-10">
        <div className="mx-auto max-w-3xl px-6">
          <h1 className="text-3xl font-semibold leading-tight text-[#1a2f45] sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-[#1a2f45]/50">Last updated: July 2026</p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-20">
        <div className="prose prose-slate max-w-none prose-headings:font-display prose-headings:font-semibold prose-headings:text-[#1a2f45] prose-p:text-[#1a2f45]/70 prose-li:text-[#1a2f45]/70 prose-a:text-[#3A868F]">
          <p>
            Deckpro Marine Flooring WA Pty Ltd (&ldquo;Deckpro&rdquo;, &ldquo;we&rdquo;,
            &ldquo;us&rdquo;) respects your privacy. This policy explains what personal
            information we collect through this website, why we collect it, and how we
            handle it, in line with the Australian Privacy Principles under the Privacy
            Act 1988 (Cth).
          </p>

          <h2>What we collect</h2>
          <p>
            When you submit an enquiry through our <Link to="/contact">contact form</Link>,
            we collect the details you provide: your name, phone number, email address,
            suburb/address, information about your boat or vehicle, project measurements,
            and any photos or logo files you upload.
          </p>
          <p>
            We do not use advertising trackers or analytics cookies on this website, and
            we do not collect personal information from visitors who simply browse the
            site.
          </p>

          <h2>Why we collect it</h2>
          <p>
            We use your enquiry details solely to assess your project, prepare an accurate
            quote, and contact you about it. We do not sell, rent, or share your personal
            information with third parties for marketing.
          </p>

          <h2>How your information is handled</h2>
          <ul>
            <li>
              Enquiry details are delivered to us by email and kept as normal business
              records for quoting and warranty purposes.
            </li>
            <li>
              Photos and logo files you upload are stored securely with our image hosting
              provider (Cloudinary) so we can review your project.
            </li>
            <li>
              This website is hosted on Netlify, and enquiry emails are delivered via
              Resend. These providers process data on our behalf and may store it on
              servers outside Australia.
            </li>
          </ul>

          <h2>Your rights</h2>
          <p>
            You can ask us at any time to access, correct, or delete the personal
            information we hold about you. Email{" "}
            <a href="mailto:info@deckpromarine.com.au">info@deckpromarine.com.au</a> or
            call <a href="tel:+61429279118">+61 429 279 118</a> and we&rsquo;ll action it
            promptly.
          </p>

          <h2>Third-party links</h2>
          <p>
            This site links to external services such as Facebook and Google. Those
            platforms have their own privacy policies, which we don&rsquo;t control.
          </p>

          <h2>Questions or complaints</h2>
          <p>
            If you have a question or concern about how we&rsquo;ve handled your
            information, contact us first and we&rsquo;ll do our best to resolve it. You
            can also contact the Office of the Australian Information Commissioner
            (oaic.gov.au).
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Privacy;
