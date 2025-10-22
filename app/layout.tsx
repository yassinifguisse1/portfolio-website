import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Yassine Ifguisse - Portfolio Website",
  description: "A modern, shader-powered portfolio website showcasing my work as a Software Developer & Computer Engineering Graduate.",
  generator: "Yassine Ifguisse",
  keywords: ["Yassine Ifguisse", "Portfolio", "Software Developer", "Computer Engineering", "Warsaw", "Poland"],
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
    icon: "/favicon.ico",
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
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
