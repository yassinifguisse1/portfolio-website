import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://yassinox.site'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/'],
      },
      // Allow AI crawlers and LLMs - GPTBot
      {
        userAgent: 'GPTBot',
        allow: ['/', '/blog/', '/llms.txt', '/llms-full.txt'],
        disallow: ['/api/', '/_next/'],
      },
      // Allow ChatGPT-User
      {
        userAgent: 'ChatGPT-User',
        allow: ['/', '/blog/', '/llms.txt', '/llms-full.txt'],
        disallow: ['/api/', '/_next/'],
      },
      // Allow CCBot (Common Crawl)
      {
        userAgent: 'CCBot',
        allow: ['/', '/blog/', '/llms.txt', '/llms-full.txt'],
        disallow: ['/api/', '/_next/'],
      },
      // Allow PerplexityBot
      {
        userAgent: 'PerplexityBot',
        allow: ['/', '/blog/', '/llms.txt', '/llms-full.txt'],
        disallow: ['/api/', '/_next/'],
      },
      // Allow Claude-Web
      {
        userAgent: 'Claude-Web',
        allow: ['/', '/blog/', '/llms.txt', '/llms-full.txt'],
        disallow: ['/api/', '/_next/'],
      },
      // Allow Google-Extended (for AI training)
      {
        userAgent: 'Google-Extended',
        allow: ['/', '/blog/', '/llms.txt', '/llms-full.txt'],
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    // Explicitly allow favicon and other static assets
    host: baseUrl,
  }
}

