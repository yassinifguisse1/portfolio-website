"use client"

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Link from 'next/link'

interface BlogContentProps {
  content: string
}

export function BlogContent({ content }: BlogContentProps) {
  return (
    <div className="blog-content prose prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Headings - ensure proper semantic structure
          h1: ({ node, ...props }) => (
            <h1 className="mb-4 mt-8 font-sans text-3xl font-light text-foreground md:text-4xl" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="mb-3 mt-6 font-sans text-2xl font-light text-foreground md:text-3xl" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="mb-2 mt-4 font-sans text-xl font-light text-foreground md:text-2xl" {...props} />
          ),
          h4: ({ node, ...props }) => (
            <h4 className="mb-2 mt-4 font-sans text-lg font-light text-foreground md:text-xl" {...props} />
          ),
          // Paragraphs
          p: ({ node, ...props }) => (
            <p className="mb-4 leading-relaxed text-foreground/90" {...props} />
          ),
          // Links - use Next.js Link for internal links
          a: ({ node, href, children, ...props }) => {
            if (href?.startsWith('/')) {
              // Handle hash links specially - navigate to home with hash
              if (href.startsWith('/#')) {
                return (
                  <Link
                    href={href}
                    className="text-foreground/80 underline transition-colors hover:text-foreground"
                    onClick={(e) => {
                      // If we're not on the home page, let Next.js navigate first
                      if (window.location.pathname !== '/') {
                        // Next.js will handle navigation, hash will be processed by home page
                        return
                      }
                      // If already on home page, prevent default and handle hash directly
                      e.preventDefault()
                      const hash = href.slice(1) // Remove leading /
                      window.location.hash = hash
                      window.dispatchEvent(new HashChangeEvent('hashchange'))
                    }}
                    {...props}
                  >
                    {children}
                  </Link>
                )
              }
              return (
                <Link href={href} className="text-foreground/80 underline transition-colors hover:text-foreground" {...props} />
              )
            }
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/80 underline transition-colors hover:text-foreground"
                {...props}
              />
            )
          },
          // Lists
          ul: ({ node, ...props }) => (
            <ul className="mb-4 ml-6 list-disc space-y-2 text-foreground/90" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="mb-4 ml-6 list-decimal space-y-2 text-foreground/90" {...props} />
          ),
          li: ({ node, ...props }) => (
            <li className="leading-relaxed" {...props} />
          ),
          // Code blocks
          code: ({ node, inline, className, children, ...props }: any) => {
            if (inline) {
              return (
                <code
                  className="rounded border border-foreground/20 bg-foreground/10 px-1.5 py-0.5 font-mono text-sm text-foreground/90"
                  {...props}
                >
                  {children}
                </code>
              )
            }
            return (
              <code className={className} {...props}>
                {children}
              </code>
            )
          },
          pre: ({ node, ...props }) => (
            <pre
              className="my-6 overflow-x-auto rounded-lg border border-foreground/20 bg-foreground/5 p-4 font-mono text-sm"
              {...props}
            />
          ),
          // Blockquotes
          blockquote: ({ node, ...props }) => (
            <blockquote
              className="my-4 border-l-4 border-foreground/30 pl-4 italic text-foreground/80"
              {...props}
            />
          ),
          // Strong and emphasis
          strong: ({ node, ...props }) => (
            <strong className="font-semibold text-foreground" {...props} />
          ),
          em: ({ node, ...props }) => (
            <em className="italic text-foreground/90" {...props} />
          ),
          // Horizontal rule
          hr: ({ node, ...props }) => (
            <hr className="my-8 border-foreground/20" {...props} />
          ),
          // Images with proper alt text
          img: ({ node, alt, src, ...props }: any) => (
            <img
              src={src}
              alt={alt || ''}
              className="my-6 rounded-lg"
              loading="lazy"
              {...props}
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
