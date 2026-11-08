// app/sitemap.js  ->  https://futbollibre.onl/sitemap.xml
import { channelsData } from '@/lib/channelsData';

const SITE_URL = 'https://futbollibre.onl';

// Note: lastModified jaan-bujh kar nahi diya. `new Date()` har build par "aaj" dikha deta hai
// (Google aise galat dates ko ignore karta hai) aur cacheComponents me current-time error bhi de sakta hai.
// Jab kisi page ki asli update date pata ho tab hi add karein.
export default function sitemap() {
  const channels = Array.isArray(channelsData) ? channelsData : channelsData.channelsData || [];

  return [
    {
      url: `${SITE_URL}/`,
      changeFrequency: 'daily',
      priority: 1,
    },
    ...channels.map((channel) => ({
      url: `${SITE_URL}/en-vivo/${channel.id}`,
      changeFrequency: 'weekly',
      priority: 0.8,
    })),
  ];
}