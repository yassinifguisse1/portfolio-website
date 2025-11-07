import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Analytics } from "@vercel/analytics/react"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Yassine Ifguisse - Portfolio Website",
  description: "A modern, shader-powered portfolio website showcasing my work as a Software Developer & Computer Engineering Graduate.",
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
    title: "Yassine Ifguisse - Portfolio Website",
    description: "A modern, shader-powered portfolio website showcasing my work as a Software Developer & Computer Engineering Graduate.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yassine Ifguisse - Portfolio Website",
    description: "A modern, shader-powered portfolio website showcasing my work as a Software Developer & Computer Engineering Graduate.",
    images: ["https://yassinox.site/og-image.png"],
  },
  icons: {
    icon: "/yassinoxLogo.svg",
    shortcut: "/yassinoxLogo.svg",
    apple: "/yassinoxLogo.svg",
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
      </head>
      <body className={`font-sans antialiased`}>
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
              name: "Yassine Ifguisse - Portfolio",
              url: "https://yassinox.site",
              description: "Software Developer & Computer Engineering Graduate portfolio showcasing modern web applications and development expertise.",
            }),
          }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
