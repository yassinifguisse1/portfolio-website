import Link from "next/link"
import { MagneticButton } from "@/components/magnetic-button"
import Image from "next/image"

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center bg-background px-6 py-24 md:px-12">
      <div className="mx-auto w-full max-w-4xl text-center">
        <div className="mb-8 inline-block animate-in fade-in slide-in-from-bottom-4 rounded-full border border-foreground/20 bg-foreground/15 px-4 py-1.5 backdrop-blur-md duration-700">
          <p className="font-mono text-xs text-foreground/90">404 Error</p>
        </div>
        
        <h1 className="mb-6 animate-in fade-in slide-in-from-bottom-8 font-sans text-6xl font-light leading-[1.1] tracking-tight text-foreground duration-1000 md:text-8xl lg:text-9xl">
          Page Not Found
        </h1>
        
        <p className="mb-8 max-w-xl mx-auto animate-in fade-in slide-in-from-bottom-4 text-base leading-relaxed text-foreground/90 duration-1000 delay-200 md:text-xl">
          <span className="text-pretty">
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </span>
        </p>

        <div className="flex animate-in fade-in slide-in-from-bottom-4 flex-col gap-4 duration-1000 delay-300 sm:flex-row sm:items-center sm:justify-center">
          <Link href="/">
            <MagneticButton size="lg" variant="primary">
              Go Home
            </MagneticButton>
          </Link>
          <Link href="/blog">
            <MagneticButton size="lg" variant="secondary">
              View Blog
            </MagneticButton>
          </Link>
        </div>

        <div className="mt-16 flex items-center justify-center gap-2 text-foreground/60">
          <Image 
            src="/yassinoxLogo.svg" 
            alt="Yassine Ifguisse" 
            width={24} 
            height={24} 
            className="opacity-60"
          />
          <span className="font-mono text-xs">Yassine Ifguisse</span>
        </div>
      </div>
    </main>
  )
}

