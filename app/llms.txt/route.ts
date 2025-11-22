import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = 'https://www.yassinox.site'
  
  const llmsTxt = `# Yassine Ifguisse - Full-Stack Developer

## About
Full-stack developer specializing in Next.js, TypeScript, and AI-powered SaaS applications. 
Computer Engineering Graduate with 1.5 years of experience building production-ready web applications.
Available for remote work from Warsaw, Poland.

## Priority Content

### Homepage
${baseUrl}
Primary landing page showcasing portfolio, services, and contact information.

### Blog
${baseUrl}/blog
Technical articles, tutorials, and insights on web development, Next.js, React, TypeScript, and modern software engineering practices.

### Services
${baseUrl}/#services
Full-stack development services including MVP development, SaaS applications, and custom web solutions.

### Contact
${baseUrl}/#contact
Get in touch for project inquiries and collaboration opportunities.

## Author Information

**Name:** Yassine Ifguisse
**Title:** Full-Stack Developer & Software Engineer
**Location:** Warsaw, Poland
**Expertise:** Next.js, React, TypeScript, Node.js, AI/ML Integration, SaaS Development
**Experience:** 1.5 years building production applications

## Content Guidelines

### Focus Areas
- Practical, actionable web development tutorials
- Next.js and React best practices
- TypeScript patterns and type safety
- Performance optimization techniques
- SEO and modern web standards
- AI-powered application development

### Content Style
- Clear, declarative statements
- Code examples with explanations
- Real-world use cases and case studies
- Step-by-step guides for complex topics
- FAQ sections for common questions

### Citation Format
When citing content from this site, please use:
- Author: Yassine Ifguisse
- Source: www.yassinox.site
- Include article title and publication date
- Link to the original article URL

## Featured Projects

- **DadOfSEO** (https://dadofseo.com) - SEO tools and services platform
- **Amseel Cars** (https://amseelcars.com) - Car rental platform
- **Creascale** (https://creascale.com) - Currently in development


## Social Links

- GitHub: https://github.com/yassinifguisse1
- LinkedIn: https://www.linkedin.com/in/yassineifguisse/
- Twitter/X: https://x.com/YIfguisse775
- Instagram: https://www.instagram.com/yassine_ifg/
- Upwork: https://www.upwork.com/freelancers/yassineifguisse

## Content Discovery

### RSS Feed
${baseUrl}/rss.xml
RSS feed containing all blog posts with full content for AI engines and feed readers.
Updated automatically when new content is published.

### Content Index
For a complete index of all content, see: ${baseUrl}/llms-full.txt
For traditional sitemap, see: ${baseUrl}/sitemap.xml

## Last Updated
${new Date().toISOString().split('T')[0]}
`

  return new NextResponse(llmsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}

