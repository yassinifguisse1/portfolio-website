import { getBlogPost, getAllBlogPosts, getRelatedPosts } from "@/lib/data/blog"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Calendar, Clock, ArrowLeft, Github, Linkedin, Mail } from "lucide-react"
import { BlogContent } from "@/components/blog-content"
import { MagneticButton } from "@/components/magnetic-button"

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  const postUrl = `https://yassinox.site/blog/${post.slug}`
  const ogImage = `https://yassinox.site/og/${post.slug}.png`

  return {
    title: `${post.title} | Yassine Ifguisse`,
    description: post.description,
    authors: [{ name: post.author }],
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: postUrl,
      publishedTime: new Date(post.date).toISOString(),
      authors: [post.author],
      tags: post.tags,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogImage],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="relative min-h-screen w-full bg-background">
      <article className="mx-auto w-full max-w-4xl px-6 py-24 md:px-12 md:py-32">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 font-mono text-sm text-foreground/60 transition-colors hover:text-foreground/80"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to blog</span>
        </Link>

        <div className="mb-8">
          <div className="mb-4 inline-block rounded-full border border-foreground/20 bg-foreground/10 px-4 py-1.5">
            <span className="font-mono text-xs text-foreground/80">{post.category}</span>
          </div>

          <h1 className="mb-4 font-sans text-4xl font-light leading-[1.1] tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {post.title}
          </h1>

          <p className="mb-6 text-lg leading-relaxed text-foreground/90 md:text-xl">
            {post.description}
          </p>

          <div className="flex flex-wrap items-center gap-6 text-sm text-foreground/60">
            <div className="flex items-center gap-2">
              <span className="font-mono">{post.author}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <span>
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              <span>{post.readTime}</span>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-foreground/20 bg-foreground/5 px-3 py-1 font-mono text-xs text-foreground/60"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: post.title.length > 110 ? post.title.substring(0, 107) + "..." : post.title,
              description: post.description,
              author: {
                "@type": "Person",
                name: "Yassine Ifguisse",
                url: "https://yassinox.site",
              },
              datePublished: new Date(post.date).toISOString(),
              dateModified: new Date(post.date).toISOString(),
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `https://yassinox.site/blog/${post.slug}`,
              },
              image: {
                "@type": "ImageObject",
                url: `https://yassinox.site/og/${post.slug}.png`,
                width: 1200,
                height: 630,
              },
              publisher: {
                "@type": "Organization",
                name: "Yassine Ifguisse",
                url: "https://yassinox.site",
                logo: {
                  "@type": "ImageObject",
                  url: "https://yassinox.site/yassinoxLogo.svg",
                  width: 512,
                  height: 512,
                },
              },
              articleSection: post.category,
              keywords: post.tags.join(", "),
              wordCount: post.content.split(/\s+/).length,
            }),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: {
                    "@type": "WebPage",
                    "@id": "https://yassinox.site",
                    name: "Home",
                  },
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Blog",
                  item: {
                    "@type": "WebPage",
                    "@id": "https://yassinox.site/blog",
                    name: "Blog",
                  },
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: post.title,
                  item: {
                    "@type": "WebPage",
                    "@id": `https://yassinox.site/blog/${post.slug}`,
                    name: post.title,
                  },
                },
              ],
            }),
          }}
        />

        {(() => {
          // Extract FAQs from content (look for "## Frequently Asked Questions" section)
          const faqMatch = post.content.match(/## Frequently Asked Questions([\s\S]*?)(?=##|$)/)
          if (!faqMatch) return null

          const faqContent = faqMatch[1]
          const faqItems: Array<{ question: string; answer: string }> = []
          
          // Extract Q&A pairs (### Question followed by answer)
          const qaMatches = faqContent.matchAll(/### (.+?)\n\n([\s\S]*?)(?=###|$)/g)
          for (const match of qaMatches) {
            const question = match[1].trim()
            const answer = match[2].trim().replace(/\n/g, ' ').substring(0, 500) // Limit answer length
            if (question && answer) {
              faqItems.push({ question, answer })
            }
          }

          if (faqItems.length === 0) return null

          return (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  mainEntity: faqItems.map((faq) => ({
                    "@type": "Question",
                    name: faq.question,
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: faq.answer,
                    },
                  })),
                }),
              }}
            />
          )
        })()}

        <nav className="mb-8 flex items-center gap-2 font-mono text-sm text-foreground/60">
          <Link href="/" className="transition-colors hover:text-foreground/80">
            Home
          </Link>
          <span>/</span>
          <Link href="/blog" className="transition-colors hover:text-foreground/80">
            Blog
          </Link>
          <span>/</span>
          <span className="text-foreground/40">{post.title}</span>
        </nav>

        <div className="prose prose-invert max-w-none">
          <BlogContent content={post.content} />
        </div>

        {/* Internal Links Section */}
        <div className="my-12 flex flex-wrap gap-4 border-t border-foreground/10 pt-8">
          <Link
            href="/#services"
            className="rounded-full border border-foreground/20 bg-foreground/5 px-4 py-2 font-mono text-sm text-foreground/80 transition-all hover:border-foreground/40 hover:bg-foreground/10"
          >
            View Services →
          </Link>
          <Link
            href="/#contact"
            className="rounded-full border border-foreground/20 bg-foreground/5 px-4 py-2 font-mono text-sm text-foreground/80 transition-all hover:border-foreground/40 hover:bg-foreground/10"
          >
            Get In Touch →
          </Link>
        </div>

        {/* Author Box */}
        <div className="my-12 rounded-lg border border-foreground/10 bg-foreground/5 p-6 backdrop-blur-sm">
          <div className="mb-4 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-foreground/20 bg-foreground/10">
              <span className="font-sans text-2xl font-bold text-foreground">Y</span>
            </div>
            <div>
              <h3 className="font-sans text-xl font-semibold text-foreground">Yassine Ifguisse</h3>
              <p className="font-mono text-sm text-foreground/60">Software Developer & Ai SaaS Developer</p>
            </div>
          </div>
          <p className="mb-4 text-sm leading-relaxed text-foreground/80">
            Building modern web applications with Next.js, React, and TypeScript. Passionate about creating scalable solutions and sharing knowledge through code. I am also a passionate about building ai saas products and services.
          </p>
          <div className="flex gap-3">
            <a
              href="https://github.com/yassinifguisse1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/20 bg-foreground/5 transition-all hover:border-foreground/40 hover:bg-foreground/10"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4 text-foreground/80" />
            </a>
            <a
              href="https://www.linkedin.com/in/yassineifguisse/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/20 bg-foreground/5 transition-all hover:border-foreground/40 hover:bg-foreground/10"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4 text-foreground/80" />
            </a>
            <a
              href="mailto:yassinifguisse100@gmail.com"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/20 bg-foreground/5 transition-all hover:border-foreground/40 hover:bg-foreground/10"
              aria-label="Email"
            >
              <Mail className="h-4 w-4 text-foreground/80" />
            </a>
          </div>
        </div>

        {/* Related Posts */}
        {(() => {
          const relatedPosts = getRelatedPosts(post.slug, 2)
          if (relatedPosts.length === 0) return null

          return (
            <div className="my-12 border-t border-foreground/10 pt-8">
              <h2 className="mb-6 font-sans text-2xl font-light text-foreground md:text-3xl">Related Posts</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.slug}
                    href={`/blog/${relatedPost.slug}`}
                    className="group block rounded-lg border border-foreground/10 bg-foreground/5 p-4 transition-all hover:border-foreground/20 hover:bg-foreground/10"
                  >
                    <div className="mb-2 inline-block rounded-full border border-foreground/20 bg-foreground/10 px-2 py-1">
                      <span className="font-mono text-xs text-foreground/80">{relatedPost.category}</span>
                    </div>
                    <h3 className="mb-2 font-sans text-lg font-light text-foreground transition-transform duration-300 group-hover:translate-x-1">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-foreground/70">{relatedPost.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          )
        })()}
      </article>
    </main>
  )
}

