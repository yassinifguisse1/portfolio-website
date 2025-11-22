import { getAllBlogPosts } from '@/lib/data/blog'

export async function GET() {
  const posts = getAllBlogPosts()
  const baseUrl = 'https://www.yassinox.site'

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Yassine Ifguisse - Full-Stack Developer Blog</title>
    <description>Thoughts, tutorials, and insights on web development, Next.js, React, TypeScript, and modern software engineering practices. Full-stack developer building fast Next.js/React apps, AI-powered SaaS, and modern web applications.</description>
    <link>${baseUrl}/blog</link>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <managingEditor>yassinifguisse100@gmail.com (Yassine Ifguisse)</managingEditor>
    <webMaster>yassinifguisse100@gmail.com (Yassine Ifguisse)</webMaster>
    <copyright>Copyright ${new Date().getFullYear()} Yassine Ifguisse</copyright>
    <generator>Next.js RSS Generator</generator>
    <image>
      <url>${baseUrl}/yassinoxLogo.svg</url>
      <title>Yassine Ifguisse - Full-Stack Developer</title>
      <link>${baseUrl}</link>
    </image>
    ${posts
      .map(
        (post) => {
          // Extract first 300 characters of content for description
          const contentPreview = post.content
            .replace(/[#*`]/g, '')
            .replace(/\n+/g, ' ')
            .trim()
            .substring(0, 300)
            .replace(/\s+\S*$/, '') + '...'
          
          // Clean markdown for RSS (remove code blocks, keep structure)
          const cleanContent = post.content
            .replace(/```[\s\S]*?```/g, '[Code block removed for brevity]')
            .replace(/`([^`]+)`/g, '$1')
          
          // Include full content for AI consumption (up to 5000 chars for better AI indexing)
          const fullContent = cleanContent.length > 5000 
            ? cleanContent.substring(0, 5000) + '...' 
            : cleanContent
          
          return `    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.description}]]></description>
      <content:encoded><![CDATA[${fullContent}]]></content:encoded>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <dc:creator><![CDATA[Yassine Ifguisse]]></dc:creator>
      <author>yassinifguisse100@gmail.com (Yassine Ifguisse)</author>
      <category><![CDATA[${post.category}]]></category>
      ${post.tags.map((tag) => `<category><![CDATA[${tag}]]></category>`).join('\n      ')}
      <dc:subject><![CDATA[${post.category}]]></dc:subject>
    </item>`
        }
      )
      .join('\n')}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  })
}

