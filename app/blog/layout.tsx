import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog | Yassine Ifguisse - Web Development Insights",
  description: "Thoughts, tutorials, and insights on web development, Next.js, React, TypeScript, and modern software engineering practices.",
  alternates: {
    canonical: "https://www.yassinox.site/blog",
  },
  openGraph: {
    title: "Blog | Yassine Ifguisse",
    description: "Thoughts, tutorials, and insights on web development, Next.js, React, TypeScript, and modern software engineering practices.",
    url: "https://www.yassinox.site/blog",
    type: "website",
    images: [
      {
        url: "https://www.yassinox.site/og-image.png",
        width: 1200,
        height: 630,
        alt: "Yassine Ifguisse Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Yassine Ifguisse",
    description: "Thoughts, tutorials, and insights on web development, Next.js, React, TypeScript, and modern software engineering practices.",
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

