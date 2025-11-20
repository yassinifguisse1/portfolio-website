import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Analytics } from "@vercel/analytics/react"
import { CustomCursor } from "@/components/custom-cursor"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Yassine Ifguisse — Full-Stack Developer (Next.js, TypeScript, AI SaaS Developer)",
  description: "Full-stack developer building fast Next.js/React apps, AI-powered SaaS, and modern web applications. Available remote from Warsaw.",
  generator: "Yassine Ifguisse",
  keywords: [
    "Yassine Ifguisse",
    "Software Developer",
    "Computer Engineering",
    "Web Development",
    "Next.js",
    "React",
    "TypeScript",
    "Portfolio",
    "Warsaw",
    "Poland",
    "SaaS Development",
    "Full Stack Developer",
    "Frontend Developer",
    "Backend Developer",
  ],
  authors: [{ name: "Yassine Ifguisse", url: "https://yassinox.site" }],
  creator: "Yassine Ifguisse",
  publisher: "Yassine Ifguisse",
  openGraph: {
    title: "Yassine Ifguisse — Full-Stack Developer (Next.js, TypeScript, AI SaaS Developer)",
    description: "Full-stack developer building fast Next.js/React apps, AI-powered SaaS, and modern web applications. Available remote from Warsaw.",
    images: [
      {
        url: "https://yassinox.site/og-image.png",
        width: 1200,
        height: 630,
        alt: "Yassine Ifguisse - Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yassine Ifguisse — Full-Stack Developer (Next.js, TypeScript, AI SaaS Developer)",
    description: "Full-stack developer building fast Next.js/React apps, AI-powered SaaS, and modern web applications. Available remote from Warsaw.",
    images: ["https://yassinox.site/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
      { url: "/yassinoxLogo.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/yassinoxLogo.svg", type: "image/svg+xml" },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: "https://yassinox.site",
  },
  metadataBase: new URL("https://yassinox.site"),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/yassinoxLogo.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/yassinoxLogo.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body className={`font-sans antialiased`} suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Yassine Ifguisse",
              url: "https://yassinox.site",
              logo: "https://yassinox.site/yassinoxLogo.svg",
              sameAs: [
                "https://github.com/yassinifguisse1",
                "https://www.linkedin.com/in/yassineifguisse/",
                "https://x.com/YIfguisse775",
                "https://www.instagram.com/yassine_ifg/",
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Yassine Ifguisse — Full-Stack Developer",
              url: "https://yassinox.site",
              description: "Full-stack developer building fast Next.js/React apps, AI-powered SaaS, and modern web applications. Available remote from Warsaw.",
            }),
          }}
        />
        <CustomCursor />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
