// app/robots.js  ->  https://futbollibre.onl/robots.txt
const SITE_URL = 'https://futbollibre.onl';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // /embed/ = iframe player pages (?r=...), infinite URLs and no content of their own.
        // /_next/ ko block NAHI karte: Google ko CSS/JS chahiye page render karne ke liye.
        disallow: ['/embed/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}