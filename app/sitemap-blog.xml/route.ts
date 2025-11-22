import { NextResponse } from 'next/server'
import { getAllBlogPosts } from '@/lib/data/blog'

export async function GET() {
  const baseUrl = 'https://www.yassinox.site'
  const blogPosts = getAllBlogPosts()

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${blogPosts
  .map((post) => {
    const lastmod = new Date(post.date).toISOString().split('T')[0]
    return `  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`
  })
  .join('\n')}
</urlset>`

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}

