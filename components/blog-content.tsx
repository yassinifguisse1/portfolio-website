"use client"

import { JSX, useMemo } from "react"

interface BlogContentProps {
  content: string
}

export function BlogContent({ content }: BlogContentProps) {
  const formattedContent = useMemo(() => {
    // Simple markdown-like parser for headings, code blocks, and paragraphs
    const lines = content.split("\n")
    const elements: JSX.Element[] = []
    let currentCodeBlock: string[] = []
    let inCodeBlock = false
    let key = 0

    lines.forEach((line, index) => {
      // Handle code blocks
      if (line.trim().startsWith("```")) {
        if (inCodeBlock) {
          // End code block
          const code = currentCodeBlock.join("\n")
          elements.push(
            <pre
              key={key++}
              className="my-6 overflow-x-auto rounded-lg border border-foreground/20 bg-foreground/5 p-4 font-mono text-sm"
            >
              <code>{code}</code>
            </pre>
          )
          currentCodeBlock = []
          inCodeBlock = false
        } else {
          inCodeBlock = true
        }
        return
      }

      if (inCodeBlock) {
        currentCodeBlock.push(line)
        return
      }

      // Handle headings
      if (line.startsWith("# ")) {
        elements.push(
          <h1 key={key++} className="mb-4 mt-8 font-sans text-3xl font-light text-foreground md:text-4xl">
            {line.substring(2)}
          </h1>
        )
        return
      }

      if (line.startsWith("## ")) {
        elements.push(
          <h2 key={key++} className="mb-3 mt-6 font-sans text-2xl font-light text-foreground md:text-3xl">
            {line.substring(3)}
          </h2>
        )
        return
      }

      if (line.startsWith("### ")) {
        elements.push(
          <h3 key={key++} className="mb-2 mt-4 font-sans text-xl font-light text-foreground md:text-2xl">
            {line.substring(4)}
          </h3>
        )
        return
      }

      // Handle paragraphs
      if (line.trim()) {
        // Check for inline code
        const parts = line.split(/(`[^`]+`)/g)
        const paragraph = (
          <p key={key++} className="mb-4 leading-relaxed text-foreground/90">
            {parts.map((part, partIndex) => {
              if (part.startsWith("`") && part.endsWith("`")) {
                return (
                  <code
                    key={partIndex}
                    className="rounded border border-foreground/20 bg-foreground/10 px-1.5 py-0.5 font-mono text-sm"
                  >
                    {part.slice(1, -1)}
                  </code>
                )
              }
              return <span key={partIndex}>{part}</span>
            })}
          </p>
        )
        elements.push(paragraph)
      } else if (elements.length > 0) {
        // Add spacing between paragraphs
        elements.push(<br key={key++} />)
      }
    })

    // Handle any remaining code block
    if (inCodeBlock && currentCodeBlock.length > 0) {
      const code = currentCodeBlock.join("\n")
      elements.push(
        <pre
          key={key++}
          className="my-6 overflow-x-auto rounded-lg border border-foreground/20 bg-foreground/5 p-4 font-mono text-sm"
        >
          <code>{code}</code>
        </pre>
      )
    }

    return elements
  }, [content])

  return <div className="blog-content">{formattedContent}</div>
}

