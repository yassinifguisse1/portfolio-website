import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Yassine Ifguisse - Portfolio Website",
  description: "A modern, shader-powered portfolio website showcasing my work as a Software Developer & Computer Engineering Graduate.",
  generator: "Yassine Ifguisse",
  keywords: ["Yassine Ifguisse", "Portfolio", "Software Developer", "Computer Engineering", "Warsaw", "Poland", "Yassinox", "Yassinox.site" , "Yassinox.com" , "saas" , "Saas" , "building digital experiences" , "building digital products" , "building digital solutions" , "building digital services" , "building digital infrastructure" , "building digital systems" , "building digital networks" , "building digital architectures" , "building digital environments" , "building digital systems" , "building digital networks" , "building digital architectures" , "building digital environments" , "hiring" , "hire" , "hire me" , "hire yassine" , "hire yassinox" , "hire yassinox.site" , "hire yassinox.com" , "hire yassinox.net" , "hire yassinox.org" , "hire yassinox.io" , "hire yassinox.ai" , "hire yassinox.com" , "hire yassinox.net" , "hire yassinox.org" , "hire yassinox.io" , "hire yassinox.ai" , "hire yassinox.com" , "hire yassinox.net" , "hire yassinox.org" , "hire yassinox.io" , "hire yassinox.ai" , "looking for a software engineer" , "looking for a software developer" , "looking for a computer engineer" , "looking for a computer science engineer" , "looking for a software engineer" , "looking for a software developer" , "looking for a computer engineer" , "looking for a computer science engineer" , "looking for a software engineer" , "looking for a software developer" , "looking for a computer engineer" , "looking for a computer science engineer" , "looking for a software engineer" , "looking for a software developer" , "looking for a computer engineer" , "looking for a computer science engineer" , "looking for a software engineer" , "looking for a software developer" , "looking for a computer engineer" , "looking for a computer science engineer" , "looking for a software engineer" , "looking for a software developer" , "looking for a computer engineer" , "looking for a computer science engineer" , "looking for a software engineer" , "looking for a software developer" , "looking for a computer engineer" , "looking for a computer science engineer" , "looking for a software engineer" , "looking for a software developer" , "looking for a computer engineer" , "looking for a computer science engineer" , "looking for a software engineer" , "looking for a software developer" , "looking for a computer engineer" , "looking for a computer science engineer" , "looking for a software engineer" , "looking for a software developer" , "looking for a computer engineer" , "looking for a computer science engineer" , "looking for a software engineer" , "looking for a software developer" , "looking for a computer engineer" , "looking for a computer science engineer" , "looking for a software engineer" , "looking for a software developer" , "looking for a computer engineer" , "looking for a computer science engineer" , "looking for a software engineer" , "looking for a software developer" , "looking for a computer engineer" , "looking for a computer science engineer" , "looking for a software engineer" , "looking for a software developer" , "looking for a computer engineer" , "looking for a computer science engineer" , "looking for a software engineer" , "looking for a software developer" , "looking for a computer engineer" , "looking for a computer science engineer" , "looking for a software engineer" , "looking for a software developer" , "looking for a computer engineer" , "looking for a computer science engineer" , "looking for a software engineer" , "looking for a software developer" , "looking for a computer engineer" , "looking for a computer science engineer" , "looking for a software engineer" , "looking for a software developer" , "looking for a computer engineer" , "looking for a computer science engineer" , "looking for a software engineer" , "looking for a software developer" , "looking for a computer engineer" , "looking for a computer science engineer" , "looking for a software engineer" , "looking for a software developer" , "looking for a computer engineer" , "looking for a computer science engineer" , "looking for a software engineer" , "looking for a software developer" , "looking for a computer engineer" , "looking for a computer science engineer" , "looking for a software engineer" , "looking for a software developer" , "looking for a computer engineer" , "looking for a computer science engineer" , "looking for a software engineer" , "looking for a software developer" , "looking for a computer engineer" , "looking for a computer science engineer" , "looking for a software engineer" , "looking for a software developer" , "looking for a computer engineer" , "looking for a computer science engineer" , "looking for a software engineer" , "looking for a software developer" , "looking for a computer engineer" , "looking for a computer science engineer" , "looking for a software engineer" , "looking for a software developer" , "looking for a computer engineer" , "looking for a computer science engineer" , "looking for a software engineer" , "looking for a software developer" , "looking for a computer engineer" , "looking for a computer science engineer" , "looking for a software engineer" , "looking for a software developer" , "looking for a computer engineer" , "looking for a computer science engineer" , "looking for a software engineer" , "looking for a software developer" , "looking for a computer engineer" , "looking for a computer science engineer" , "looking for a software engineer" , "looking for a software developer" , "looking for a computer engineer" , "looking for a computer science engineer" , "looking for a software engineer" , "looking for a software developer" , "looking for a computer engineer" , "looking for a computer science engineer" , "looking for a software engineer" , "looking for a software developer" ],
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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
      </head>
      <body className={`font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
