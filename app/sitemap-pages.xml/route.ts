import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = 'https://www.yassinox.site'
  const currentDate = new Date().toISOString().split('T')[0]

  // Static pages
  const pages = [
    {
      url: baseUrl,
      lastmod: currentDate,
    },
    {
      url: `${baseUrl}/blog`,
      lastmod: currentDate,
    },
  ]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
  </url>`
  )
  .join('\n')}
</urlset>`

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}

