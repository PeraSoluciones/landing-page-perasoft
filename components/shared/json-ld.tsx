export function JsonLd({ locale: _locale }: { locale: string }) {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Pablo Aucapiña",
    jobTitle: "Full-Stack Software Engineer",
    url: "https://pablo-aucapina.dev",
    sameAs: [
      "https://www.linkedin.com/in/pablo-aucapina/",
      "https://github.com/PeraSoluciones",
    ],
    worksFor: {
      "@type": "Organization",
      name: "Darkcam S.A",
    },
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "University of Wollongong",
      },
      {
        "@type": "CollegeOrUniversity",
        name: "Universidad Técnica de Ambato",
      },
    ],
    knowsAbout: [
      "Next.js",
      "TypeScript",
      "React",
      "Node.js",
      "AWS",
      "Docker",
      "Full-Stack Development",
      "AI-Assisted Development",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Quito",
      addressCountry: "EC",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
    />
  );
}