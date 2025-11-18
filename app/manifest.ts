import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Yassine Ifguisse - Full-Stack Developer',
    short_name: 'Yassine Ifguisse',
    description: 'Full-stack developer building fast Next.js/React apps, AI-powered SaaS, and modern web applications.',
    start_url: '/',
    display: 'standalone',
    background_color: '#1a1a1a',
    theme_color: '#1275d8',
    icons: [
      {
        src: '/yassinoxLogo.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}

