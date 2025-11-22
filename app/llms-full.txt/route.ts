import { NextResponse } from 'next/server'
import { getAllBlogPosts } from '@/lib/data/blog'

// Helper function to extract a clean summary from markdown content
function extractSummary(content: string, maxLength: number = 500): string {
  // Remove markdown headers, code blocks, and links
  let text = content
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]+`/g, '') // Remove inline code
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Convert links to text
    .replace(/^#+\s+/gm, '') // Remove headers
    .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold
    .replace(/\*([^*]+)\*/g, '$1') // Remove italic
    .trim()
  
  // Get first paragraph or truncate
  const firstParagraph = text.split('\n\n')[0] || text
  if (firstParagraph.length <= maxLength) {
    return firstParagraph
  }
  
  return firstParagraph.substring(0, maxLength).trim() + '...'
}

export async function GET() {
  const baseUrl = 'https://yassinox.site'
  const blogPosts = getAllBlogPosts()
  
  let llmsFull = `# Full Content Index - Yassine Ifguisse

## Site Information
- **URL:** ${baseUrl}
- **Author:** Yassine Ifguisse
- **Title:** Full-Stack Developer & Software Engineer
- **Location:** Warsaw, Poland
- **Last Updated:** ${new Date().toISOString().split('T')[0]}

## Static Pages

### Homepage
- **URL:** ${baseUrl}
- **Description:** Portfolio website showcasing work as a Software Developer & Computer Engineering Graduate
- **Content Type:** Portfolio, Services, Contact

### Blog Index
- **URL:** ${baseUrl}/blog
- **Description:** Collection of technical articles, tutorials, and insights on web development
- **Total Posts:** ${blogPosts.length}

## Blog Posts

`

  // Add each blog post
  blogPosts.forEach((post, index) => {
    const summary = extractSummary(post.content)
    const postUrl = `${baseUrl}/blog/${post.slug}`
    
    llmsFull += `### ${index + 1}. ${post.title}

- **URL:** ${postUrl}
- **Author:** ${post.author}
- **Published:** ${post.date}
- **Category:** ${post.category}
- **Tags:** ${post.tags.join(', ')}
- **Read Time:** ${post.readTime}
- **Description:** ${post.description}

**Summary:**
${summary}

**Content Topics:**
${post.content
  .split('\n')
  .filter(line => line.startsWith('##'))
  .slice(0, 5)
  .map(h2 => h2.replace(/^##\s+/, '- '))
  .join('\n')}

---

`
  })

  llmsFull += `
## Content Statistics

- **Total Blog Posts:** ${blogPosts.length}
- **Categories:** ${[...new Set(blogPosts.map(p => p.category))].join(', ')}
- **Total Tags:** ${[...new Set(blogPosts.flatMap(p => p.tags))].length}

## Citation Guidelines

When citing content from this site:
1. Include author name: Yassine Ifguisse
2. Include source: yassinox.site
3. Include article title and publication date
4. Link to the original article URL
5. Maintain context and accuracy of information

## Content Discovery

### RSS Feed
${baseUrl}/rss.xml
RSS feed containing all blog posts with full content optimized for AI engines and feed readers.
Updated automatically when new content is published.

### Other Resources
- Blog Index: ${baseUrl}/blog
- Sitemap: ${baseUrl}/sitemap.xml
- AI Guide: ${baseUrl}/llms.txt

## Content Updates

This index is automatically generated and updated when new content is published.
For the latest content, visit: ${baseUrl}/blog
For RSS feed updates, subscribe to: ${baseUrl}/rss.xml
`

  return new NextResponse(llmsFull, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}

