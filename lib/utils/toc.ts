// Server-safe utility for extracting H2 headings from markdown
// This can be used in both server and client components

export interface TOCItem {
  id: string
  text: string
}

// Helper function to slugify text (convert to URL-friendly ID)
function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
}

// Extract H2 headings from markdown content
export function extractH2Headings(content: string): TOCItem[] {
  const h2Regex = /^##\s+(.+)$/gm
  const headings: TOCItem[] = []
  let match

  while ((match = h2Regex.exec(content)) !== null) {
    const text = match[1].trim()
    // Remove markdown formatting from heading text
    const cleanText = text
      .replace(/\*\*/g, '') // Remove bold
      .replace(/\*/g, '') // Remove italic
      .replace(/`/g, '') // Remove code backticks
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Remove links, keep text
      .trim()
    
    if (cleanText) {
      headings.push({
        id: slugify(cleanText),
        text: cleanText,
      })
    }
  }

  return headings
}

