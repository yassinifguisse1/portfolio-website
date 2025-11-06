"use client"

import { useReveal } from "@/hooks/use-reveal"
import { getAllBlogPosts, type BlogPost } from "@/lib/data/blog"
import Link from "next/link"
import { Calendar, Clock, ArrowRight } from "lucide-react"

export default function BlogPage() {
  const posts = getAllBlogPosts()
  const { ref, isVisible } = useReveal(0.2)

  return (
    <main className="relative min-h-screen w-full bg-background">
      <div className="mx-auto w-full max-w-7xl px-6 py-24 md:px-12 md:py-32">
        <div
          ref={ref}
          className={`mb-16 transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
          }`}
        >
          <h1 className="mb-4 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Blog
          </h1>
          <p className="font-mono text-sm text-foreground/60 md:text-base">
            / Thoughts, tutorials, and insights on web development
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <BlogCard key={post.slug} post={post} index={index} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </main>
  )
}

function BlogCard({
  post,
  index,
  isVisible,
}: {
  post: BlogPost
  index: number
  isVisible: boolean
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group block transition-all duration-700 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
      }`}
      style={{ transitionDelay: `${200 + index * 100}ms` }}
    >
      <article className="flex h-full flex-col rounded-lg border border-foreground/10 bg-foreground/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-foreground/20 hover:bg-foreground/10">
        <div className="mb-3 flex items-center gap-4 text-xs text-foreground/60">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3 w-3" />
            <span>{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
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

        <p className="mb-4 flex-1 text-sm leading-relaxed text-foreground/80 md:text-base">
          {post.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-foreground/20 bg-foreground/5 px-2 py-0.5 font-mono text-xs text-foreground/60"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2 font-mono text-sm text-foreground/60 transition-colors group-hover:text-foreground/80">
          <span>Read more</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </article>
    </Link>
  )
}

