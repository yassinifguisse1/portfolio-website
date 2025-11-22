import { NextResponse } from 'next/server'
import { getBlogPost } from '@/lib/data/blog'

interface RouteParams {
  params: Promise<{ slug: string }>
}

// Helper function to clean markdown for AI consumption
function cleanMarkdownForAI(content: string): string {
  return content
    // Remove excessive whitespace
    .replace(/\n{3,}/g, '\n\n')
    // Clean up code blocks (keep them but ensure proper formatting)
    .replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
      return `\n\`\`\`${lang || ''}\n${code.trim()}\n\`\`\`\n`
    })
    // Ensure proper spacing around headers
    .replace(/(\n)(#{1,6}\s+)/g, '\n\n$2')
    // Clean up list formatting
    .replace(/(\n)([-*+]\s)/g, '\n$2')
    .replace(/(\n)(\d+\.\s)/g, '\n$2')
    .trim()
}

export async function GET(
  request: Request,
  { params }: RouteParams
) {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    return NextResponse.json(
      { error: 'Post not found' },
      { status: 404 }
    )
  }

  const cleanContent = cleanMarkdownForAI(post.content)
  
  const markdownResponse = `# ${post.title}

**Author:** ${post.author}  
**Published:** ${post.date}  
**Category:** ${post.category}  
**Tags:** ${post.tags.join(', ')}  
**Read Time:** ${post.readTime}  
**URL:** https://www.yassinox.site/blog/${post.slug}

---

## Description

${post.description}

---

## Content

${cleanContent}

---

## Metadata

- **Source:** https://www.yassinox.site/blog/${post.slug}
- **Author:** ${post.author}
- **Publication Date:** ${post.date}
- **Last Updated:** ${post.date}
- **Category:** ${post.category}
- **Tags:** ${post.tags.join(', ')}

## Citation

When citing this content:
- Author: ${post.author}
- Title: ${post.title}
- Source: www.yassinox.site
- URL: https://www.yassinox.site/blog/${post.slug}
- Published: ${post.date}
`

  return new NextResponse(markdownResponse, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      'X-Content-Type': 'article',
      'X-Author': post.author,
      'X-Published-Date': post.date,
    },
  })
}

