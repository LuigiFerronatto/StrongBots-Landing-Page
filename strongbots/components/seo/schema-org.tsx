export function OrganizationSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Strongbots",
          url: "https://www.strongbots.com",
          logo: "https://www.strongbots.com/logo.png",
          sameAs: [
            "https://www.facebook.com/strongbots",
            "https://www.linkedin.com/company/strongbots",
            "https://twitter.com/strongbots",
          ],
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+55-11-1234-5678",
            contactType: "customer service",
            availableLanguage: ["Portuguese", "English"],
          },
        }),
      }}
    />
  )
}

export function ServiceSchema({ service }: { service: { name: string; description: string } }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.name,
          description: service.description,
          provider: {
            "@type": "Organization",
            name: "Strongbots",
          },
          areaServed: "Brazil",
          serviceType: "AI Consulting",
        }),
      }}
    />
  )
}

export function FAQSchema({ faqs }: { faqs: { question: string; answer: string }[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }),
      }}
    />
  )
}

