"use client"

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
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
          h2: ({ node, children, ...props }: any) => {
            // Generate ID from heading text
            const extractText = (children: any): string => {
              if (typeof children === 'string') {
                return children
              }
              if (Array.isArray(children)) {
                return children
                  .map((c: any) => {
                    if (typeof c === 'string') return c
                    if (c?.props?.children) return extractText(c.props.children)
                    return ''
                  })
                  .join('')
              }
              if (children?.props?.children) {
                return extractText(children.props.children)
              }
              return ''
            }
            
            const text = extractText(children)
            
            const slugify = (str: string) => {
              return str
                .toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, '') // Remove special characters
                .replace(/[\s_-]+/g, '-') // Replace spaces/underscores with hyphens
                .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
            }
            
            const id = slugify(text) || 'heading'
            
            return (
              <h2 
                id={id}
                className="mb-4 mt-12 scroll-mt-24 font-sans text-2xl font-light text-foreground md:text-3xl lg:text-4xl" 
                {...props}
              >
                {children}
              </h2>
            )
          },
          h3: ({ node, ...props }) => (
            <h3 className="mb-3 mt-8 font-sans text-xl font-light text-foreground md:text-2xl lg:text-3xl" {...props} />
          ),
          h4: ({ node, ...props }) => (
            <h4 className="mb-3 mt-6 font-sans text-lg font-light text-foreground md:text-xl lg:text-2xl" {...props} />
          ),
          // Paragraphs
          p: ({ node, ...props }) => (
            <p className="mb-6 leading-relaxed text-foreground/90 text-base md:text-lg" {...props} />
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
            <ul className="mb-6 ml-6 list-disc space-y-3 text-foreground/90 text-base md:text-lg" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="mb-6 ml-6 list-decimal space-y-3 text-foreground/90 text-base md:text-lg" {...props} />
          ),
          li: ({ node, ...props }) => (
            <li className="leading-relaxed pl-2" {...props} />
          ),
          // Code blocks with syntax highlighting
          pre: ({ node, children, ...props }: any) => {
            // react-markdown wraps code blocks in <pre><code className="language-xxx">
            if (children && typeof children === 'object' && 'props' in children) {
              const codeProps = children.props
              const className = codeProps?.className || ''
              const match = /language-(\w+)/.exec(className)
              const language = match ? match[1] : ''
              
              if (language || className.includes('language-')) {
                // This is a code block with language, use SyntaxHighlighter
                return (
                  <SyntaxHighlighter
                    language={language || 'text'}
                    style={vscDarkPlus}
                  customStyle={{
                  margin: '2rem 0',
                  borderRadius: '0.75rem',
                  padding: '1.5rem',
                  fontSize: '0.9rem',
                  lineHeight: '1.75',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
                    PreTag="div"
                    {...props}
                  >
                    {String(codeProps?.children || '').replace(/\n$/, '')}
                  </SyntaxHighlighter>
                )
              }
            }
            // Fallback for other pre tags
            return (
              <pre
                className="my-8 overflow-x-auto rounded-lg border border-foreground/20 bg-foreground/5 p-6 font-mono text-sm md:text-base"
                {...props}
              >
                {children}
              </pre>
            )
          },
          code: ({ node, inline, className, children, ...props }: any) => {
            // Inline code (not in a pre block)
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
            // Code inside pre (handled by pre component above)
            return (
              <code className={className} {...props}>
                {children}
              </code>
            )
          },
          // Blockquotes
          blockquote: ({ node, ...props }) => (
            <blockquote
              className="my-8 border-l-4 border-foreground/30 pl-6 pr-4 italic text-foreground/80 text-base md:text-lg leading-relaxed"
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
            <hr className="my-12 border-foreground/20" {...props} />
          ),
          // Images with proper alt text
          img: ({ node, alt, src, ...props }: any) => (
            <img
              src={src}
              alt={alt || ''}
              className="my-10 rounded-lg w-full"
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
