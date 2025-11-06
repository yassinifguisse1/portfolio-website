import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog | Yassine Ifguisse - Web Development Insights",
  description: "Thoughts, tutorials, and insights on web development, Next.js, React, TypeScript, and modern software engineering practices.",
  alternates: {
    canonical: "https://yassinox.site/blog",
  },
  openGraph: {
    title: "Blog | Yassine Ifguisse",
    description: "Thoughts, tutorials, and insights on web development, Next.js, React, TypeScript, and modern software engineering practices.",
    url: "https://yassinox.site/blog",
    type: "website",
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

