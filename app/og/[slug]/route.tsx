import { ImageResponse } from 'next/og'
import { getBlogPost } from '@/lib/data/blog'

export const runtime = 'edge'
export const alt = 'Blog Post'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    if (!slug) {
      return new Response('Missing slug', { status: 400 })
    }

    const post = getBlogPost(slug)
    
    if (!post) {
      console.error(`OG Image: Post not found for slug: ${slug}`)
      return new Response(`Post not found: ${slug}`, { status: 404 })
    }

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#1a1a1a',
            backgroundImage: 'linear-gradient(135deg, #1275d8 0%, #e19136 100%)',
            padding: '80px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              padding: '60px',
              borderRadius: '20px',
            }}
          >
            <div
              style={{
                fontSize: '24px',
                color: '#d1d1d1',
                marginBottom: '20px',
                fontFamily: 'monospace',
              }}
            >
              {post.category}
            </div>
            <div
              style={{
                fontSize: '64px',
                fontWeight: '300',
                color: '#ffffff',
                lineHeight: '1.1',
                marginBottom: '30px',
                fontFamily: 'sans-serif',
              }}
            >
              {post.title}
            </div>
            <div
              style={{
                fontSize: '28px',
                color: '#d1d1d1',
                lineHeight: '1.5',
                fontFamily: 'sans-serif',
              }}
            >
              {post.description}
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginTop: '40px',
                fontSize: '20px',
                color: '#ffffff',
                fontFamily: 'monospace',
              }}
            >
              Yassine Ifguisse · {new Date(post.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </div>
          </div>
        </div>
      ),
      {
        ...size,
      }
    )
  } catch (e: any) {
    console.error('OG Image generation error:', e.message, e.stack)
    return new Response(`Failed to generate the image: ${e.message}`, {
      status: 500,
    })
  }
}

