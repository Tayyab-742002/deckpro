interface Faq {
  q: string;
  a: string;
}

/** FAQPage JSON-LD built from a page's FAQ list. Keep it rendered on the same
 *  page as the visible FAQ section — the markup must match on-page content. */
const FaqSchema = ({ faqs }: { faqs: Faq[] }) => {
  const json = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
};

export default FaqSchema;
