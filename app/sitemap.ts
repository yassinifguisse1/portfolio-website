import { MetadataRoute } from 'next'
import { getAllBlogPosts } from '@/lib/data/blog'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://yassinox.site'
  const currentDate = new Date()
  const blogPosts = getAllBlogPosts()

  const blogPostUrls: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...blogPostUrls,
  ]
}

