import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/*', '/formation*', '/stack*'],
    },
    sitemap: 'https://www.ovizai.com/sitemap.xml',
  };
}
