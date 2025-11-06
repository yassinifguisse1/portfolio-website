import { getBlogPost, getAllBlogPosts } from "@/lib/data/blog"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Calendar, Clock, ArrowLeft } from "lucide-react"
import { BlogContent } from "@/components/blog-content"

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

  return {
    title: `${post.title} | Yassine Ifguisse`,
    description: post.description,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
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

        <div className="prose prose-invert max-w-none">
          <BlogContent content={post.content} />
        </div>
      </article>
    </main>
  )
}

