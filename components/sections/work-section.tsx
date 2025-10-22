"use client"

import { useReveal } from "@/hooks/use-reveal"

export function WorkSection() {
  const { ref, isVisible } = useReveal(0.3)

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-6 pt-20 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-12 transition-all duration-700 md:mb-16 ${
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            My Work
          </h2>
          <p className="font-mono text-sm text-foreground/60 md:text-base">/ Featured projects</p>
        </div>

        <div className="space-y-6 md:space-y-8">
          {[
            {
              number: "01",
              title: "DadOfSEO",
              category: "SaaS Platform",
              year: "2024",
              direction: "left",
              description: "AI-driven SEO content platform empowering businesses & bloggers to create high-impact articles in minutes.",
              technologies: "Next.js, Node.js, React, Tailwind CSS, Supabase, Prisma, Stripe, Vercel",
              link: "https://dadofseo.com/"
            },
            {
              number: "02",
              title: "Amseel Cars",
              category: "E-Commerce Platform",
              year: "2025",
              direction: "right",
              description: "Premium car rental platform with real-time booking system and fleet management.",
              technologies: "Next.js, Tailwind CSS, GSAP, Resend, Vercel",
              link: "https://amseelcars.com/"
            },
            {
              number: "03",
              title: "iTA Groupe",
              category: "Software Development",
              year: "2025",
              direction: "left",
              description: "Professional software development company website with comprehensive digital solutions showcase.",
              technologies: "Next.js, Tailwind CSS, Resend, Vercel",
              link: "https://www.itagroupe.com/"
            },
          ].map((project, i) => (
            <ProjectCard key={i} project={project} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({
  project,
  index,
  isVisible,
}: {
  project: { 
    number: string; 
    title: string; 
    category: string; 
    year: string; 
    direction: string;
    description: string;
    technologies: string;
    link: string;
  }
  index: number
  isVisible: boolean
}) {
  const getRevealClass = () => {
    if (!isVisible) {
      return project.direction === "left" ? "-translate-x-16 opacity-0" : "translate-x-16 opacity-0"
    }
    return "translate-x-0 opacity-100"
  }

  const handleClick = () => {
    window.open(project.link, "_blank")
  }

  return (
    <div
      className={`group flex items-center justify-between border-b border-foreground/10 py-6 transition-all duration-700 hover:border-foreground/20 md:py-8 cursor-pointer ${getRevealClass()}`}
      style={{
        transitionDelay: `${index * 150}ms`,
        marginLeft: index % 2 === 0 ? "0" : "auto",
        maxWidth: index % 2 === 0 ? "85%" : "90%",
      }}
      onClick={handleClick}
    >
      <div className="flex items-baseline gap-4 md:gap-8">
        <span className="font-mono text-sm text-foreground/30 transition-colors group-hover:text-foreground/50 md:text-base">
          {project.number}
        </span>
        <div>
          <h3 className="mb-1 font-sans text-2xl font-light text-foreground transition-transform duration-300 group-hover:translate-x-2 md:text-3xl lg:text-4xl">
            {project.title}
          </h3>
          <p className="font-mono text-xs text-foreground/50 md:text-sm mb-2">{project.category}</p>
          <p className="font-mono text-xs text-foreground/40 md:text-sm max-w-md">{project.description}</p>
          <p className="font-mono text-xs text-foreground/30 md:text-sm mt-1">{project.technologies}</p>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <span className="font-mono text-xs text-foreground/30 md:text-sm">{project.year}</span>
        <span className="font-mono text-xs text-foreground/40 mt-1 group-hover:text-foreground/60 transition-colors">
          View Live →
        </span>
      </div>
    </div>
  )
}
