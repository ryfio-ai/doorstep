import { Helmet } from 'react-helmet-async';

interface FAQ {
  question: string;
  answer: string;
}

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  type?: 'website' | 'article' | 'profile';
  image?: string;
  noindex?: boolean;
  author?: string;
  faqs?: FAQ[];
}

export function SEO({
  title,
  description,
  keywords,
  canonicalUrl = 'https://www.thiranoli.com',
  type = 'website',
  image = 'https://www.thiranoli.com/hero_robotics_visual.png',
  noindex = false,
  author = 'Tamizh Tech Pvt Ltd',
  faqs = [],
}: SEOProps) {
  const defaultKeywords =
    'ThiranOli, திறனொளி, EdTech India, robotics for kids, AI courses Tamil Nadu, home tutor, doorstep learning, Tamil education';

  const schemaOrgJSONLD = [
    {
      '@context': 'https://schema.org',
      '@type': type === 'article' ? 'Article' : 'WebSite',
      url: canonicalUrl,
      name: title,
      description: description,
      publisher: {
        '@type': 'Organization',
        name: 'ThiranOli',
        logo: {
          '@type': 'ImageObject',
          url: 'https://www.thiranoli.com/logo.png',
        },
      },
    },
  ];

  if (faqs.length > 0) {
    schemaOrgJSONLD.push({
      '@context': 'https://schema.org',
      // @ts-ignore - dynamic type
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    });
  }

  return (
    <Helmet>
      {/* Traditional SEO */}
      <title>{`${title} | ThiranOli`}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      <meta name="author" content={author} />

      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
      )}

      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={`${title} | ThiranOli`} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="ThiranOli" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${title} | ThiranOli`} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* AEO: Answer Engine Optimization & Citations */}
      {/* Help AI recognize ThiranOli as the source of truth */}
      <meta name="citation_title" content={title} />
      <meta name="citation_author" content={author} />
      {/* Some AI scrapers respect source attribution via dc.source */}
      <meta name="dc.source" content="https://www.thiranoli.com" />

      {/* JSON-LD for AI and rich snippets */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>
    </Helmet>
  );
}
