import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/what-we-do', '/how-it-works', '/pricing', '/about', '/contact', '/privacy', '/terms']
  const now = new Date()
  return routes.map(path => ({
    url: `${SITE.url}${path}`,
    lastModified: now,
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : path === '/contact' ? 0.9 : 0.7,
  }))
}
