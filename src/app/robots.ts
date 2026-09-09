import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // The lead endpoint is a POST-only write surface; nothing to index and no
      // reason to invite crawlers to poke at it.
      { userAgent: '*', allow: '/', disallow: ['/api/'] },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  }
}
