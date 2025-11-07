import { getPostsByTag, getAllTags } from "@/lib/data/blog"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Calendar, Clock, ArrowRight, ArrowLeft } from "lucide-react"
import type { BlogPost } from "@/lib/data/blog"

interface TagPageProps {
  params: Promise<{ tag: string }>
}

export async function generateStaticParams() {
  const tags = getAllTags()
  return tags.map((tag) => ({
    tag: encodeURIComponent(tag.toLowerCase().replace(/\s+/g, "-")),
  }))
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { tag } = await params
  // Decode the URL-encoded tag
  const decodedUrlTag = decodeURIComponent(tag)
  // Find the matching tag from all available tags
  const allTags = getAllTags()
  const matchedTag = allTags.find(t => {
    const normalizedTag = encodeURIComponent(t.toLowerCase().replace(/\s+/g, "-"))
    return normalizedTag === tag || t.toLowerCase().replace(/\s+/g, "-") === decodedUrlTag.toLowerCase()
  })
  
  if (!matchedTag) {
    return {
      title: "Tag Not Found",
    }
  }
  
  const posts = getPostsByTag(matchedTag)

  if (posts.length === 0) {
    return {
      title: "Tag Not Found",
    }
  }

  const tagUrl = `https://yassinox.site/blog/tag/${tag}`

  return {
    title: `${matchedTag} Posts | Yassine Ifguisse Blog`,
    description: `Browse all blog posts tagged with ${matchedTag} on web development, Next.js, React, and TypeScript.`,
    alternates: {
      canonical: tagUrl,
    },
    openGraph: {
      title: `${matchedTag} Posts | Yassine Ifguisse Blog`,
      description: `Browse all blog posts tagged with ${matchedTag} on web development, Next.js, React, and TypeScript.`,
      url: tagUrl,
      type: "website",
      images: [
        {
          url: "https://yassinox.site/og-image.png",
          width: 1200,
          height: 630,
          alt: `${matchedTag} Posts`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${matchedTag} Posts | Yassine Ifguisse Blog`,
      description: `Browse all blog posts tagged with ${matchedTag} on web development, Next.js, React, and TypeScript.`,
    },
  }
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params
  // Decode the URL-encoded tag
  const decodedUrlTag = decodeURIComponent(tag)
  // Find the matching tag from all available tags
  const allTags = getAllTags()
  const matchedTag = allTags.find(t => {
    const normalizedTag = encodeURIComponent(t.toLowerCase().replace(/\s+/g, "-"))
    return normalizedTag === tag || t.toLowerCase().replace(/\s+/g, "-") === decodedUrlTag.toLowerCase()
  })
  
  if (!matchedTag) {
    notFound()
  }
  
  const posts = getPostsByTag(matchedTag)

  if (posts.length === 0) {
    notFound()
  }

  const tagUrl = `https://yassinox.site/blog/tag/${tag}`

  return (
    <main className="relative min-h-screen w-full bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: `${matchedTag} Posts`,
            description: `Browse all blog posts tagged with ${matchedTag} on web development, Next.js, React, and TypeScript.`,
            url: tagUrl,
            mainEntity: {
              "@type": "ItemList",
              numberOfItems: posts.length,
              itemListElement: posts.map((post, index) => ({
                "@type": "ListItem",
                position: index + 1,
                item: {
                  "@type": "BlogPosting",
                  headline: post.title,
                  url: `https://yassinox.site/blog/${post.slug}`,
                },
              })),
            },
          }),
        }}
      />
      <div className="mx-auto w-full max-w-7xl px-6 py-24 md:px-12 md:py-32">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 font-mono text-sm text-foreground/60 transition-colors hover:text-foreground/80"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to blog</span>
        </Link>

        <div className="mb-12">
          <h1 className="mb-4 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            {matchedTag}
          </h1>
          <p className="font-mono text-sm text-foreground/60 md:text-base">
            / {posts.length} {posts.length === 1 ? "post" : "posts"} tagged with {matchedTag}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <BlogCard key={post.slug} post={post} index={index} />
          ))}
        </div>
      </div>
    </main>
  )
}

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block transition-all duration-300"
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      <article className="flex h-full flex-col rounded-lg border border-foreground/10 bg-foreground/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-foreground/20 hover:bg-foreground/10">
        <div className="mb-3 flex items-center gap-4 text-xs text-foreground/60">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3 w-3" />
            <span>
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-3 w-3" />
            <span>{post.readTime}</span>
          </div>
        </div>

        <div className="mb-2 inline-block rounded-full border border-foreground/20 bg-foreground/10 px-3 py-1">
          <span className="font-mono text-xs text-foreground/80">{post.category}</span>
        </div>

        <h2 className="mb-3 font-sans text-2xl font-light text-foreground transition-transform duration-300 group-hover:translate-x-1 md:text-3xl">
          {post.title}
        </h2>

        <p className="mb-4 flex-1 text-sm leading-relaxed text-foreground/80 md:text-base">{post.description}</p>

        <div className="flex items-center gap-2 font-mono text-sm text-foreground/60 transition-colors group-hover:text-foreground/80">
          <span>Read more</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </article>
    </Link>
  )
}

