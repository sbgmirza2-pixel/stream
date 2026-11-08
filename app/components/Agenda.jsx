// SERVER component: agenda ab HTML me hi aati hai (pehle useEffect se client par load hoti thi,
// isliye Google ko matches nazar nahi aate the). Interactivity AgendaList.jsx me hai.
import { cacheLife } from 'next/cache';
import AgendaList from './AgendaList';

const API_BASE = 'https://api.wqxag.com';
// Images ka domain. Agar api.wqxag.com/uploads/... 404 de, to yahan original site ka domain likhein
const IMG_BASE = 'https://img.wqxag.com';

// API ke object se image URL nikalne ki koshish (alag-alag possible fields)
function pickImage(attr) {
  // API ka exact path: attributes.country.data.attributes.image.data.attributes.url
  const exact = attr.country?.data?.attributes?.image?.data?.attributes;
  if (exact?.url) {
    const u = exact.formats?.thumbnail?.url || exact.url;
    return u.startsWith('http') ? u : `${IMG_BASE}${u}`;
  }

  const candidates = [
    attr.image,
    attr.icon,
    attr.logo,
    attr.flag,
    attr.diary_image,
    attr.diary_icon,
    attr.country?.data?.attributes?.image,
    attr.country?.data?.attributes?.flag,
    attr.country?.data?.attributes?.icon,
    attr.country?.image,
    attr.country?.flag,
    attr.country?.icon,
    attr.league?.data?.attributes?.image,
    attr.league?.data?.attributes?.logo,
    attr.league?.image,
    attr.league?.logo,
    attr.sport?.data?.attributes?.image,
    attr.sport?.data?.attributes?.icon,
    attr.sport?.image,
    attr.sport?.icon,
    attr.category?.data?.attributes?.image,
    attr.category?.image,
  ];

  for (const c of candidates) {
    if (!c) continue;
    // Strapi media format: { data: { attributes: { url } } } ya { url }
    const url =
      typeof c === 'string'
        ? c
        : c.data?.attributes?.url || c.attributes?.url || c.url || null;
    if (url) return url.startsWith('http') || url.startsWith('//') ? url : `${IMG_BASE}${url}`;
  }
  return null;
}

// Client ko sirf wahi fields bhejte hain jo chahiye (payload chhota rehta hai)
function normalize(match, i) {
  const attr = match.attributes || match;
  const embeds = attr.embeds?.data || attr.embeds || [];

  return {
    id: match.id ?? i,
    title: attr.diary_description || attr.title || 'Partido de Fútbol',
    hour: attr.diary_hour ? attr.diary_hour.slice(0, 5) : '00:00',
    imgSrc: pickImage(attr),
    embeds: embeds.map((embed, idx) => {
      const e = embed.attributes || embed;
      const iframeValue = e.embed_iframe || '';
      const r = iframeValue.includes('?r=') ? iframeValue.split('?r=')[1] : iframeValue;
      return { name: e.embed_name || `Canal ${idx + 1}`, r };
    }),
  };
}

async function getAgenda() {
  'use cache';
  // Har 5 minute me refresh (cacheComponents ke saath route-level `revalidate` allowed nahi, yahan hota hai)
  cacheLife({ stale: 60, revalidate: 300, expire: 3600 });

  try {
    const res = await fetch(`${API_BASE}/diaries.json`);
    if (!res.ok) throw new Error('Error al cargar la agenda');
    const json = await res.json();
    return { ok: true, matches: (json.data || []).map(normalize) };
  } catch (err) {
    console.error('Fetch Error:', err);
    return { ok: false, matches: [] };
  }
}

export default async function Agenda() {
  const { ok, matches } = await getAgenda();

  if (!ok) {
    return (
      <div className="text-center py-12 text-red-500">
        No se pudo cargar la agenda en este momento.
      </div>
    );
  }

  return <AgendaList matches={matches} />;
}