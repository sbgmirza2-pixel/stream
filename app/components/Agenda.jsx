'use client';

import { useState, useEffect, useRef } from 'react';

const API_BASE = 'https://api.wqxag.com';
// Images ka domain. Agar api.wqxag.com/uploads/... 404 de, to yahan original site ka domain likhein
// (original site par flag par right-click -> "Copy image address" se domain dekhein)
const IMG_BASE = 'https://img.wqxag.com';

// Sport / keyword ke hisaab se fallback emoji
function fallbackEmoji(text = '') {
  const t = text.toLowerCase();
  if (/tenis|tennis|atp|wta|padel/.test(t)) return '🎾';
  if (/f1|formula|gp |moto|nascar/.test(t)) return '🏎️';
  if (/nba|basket|baloncesto/.test(t)) return '🏀';
  if (/nfl|rugby|americano/.test(t)) return '🏈';
  if (/nhl|hockey/.test(t)) return '🏒';
  if (/mlb|beisbol|béisbol|baseball/.test(t)) return '⚾';
  if (/ufc|boxeo|box |mma/.test(t)) return '🥊';
  if (/ciclismo|tour|vuelta|giro/.test(t)) return '🚴';
  return '⚽';
}

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

function MatchIcon({ src, title }) {
  const [failed, setFailed] = useState(false);

  if (src && !failed) {
    return (
      <img
        src={src}
        alt=""
        loading="lazy"
        referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
        className="w-6 h-6 rounded-full object-cover flex-shrink-0"
      />
    );
  }
  return (
    <span className="w-6 h-6 flex items-center justify-center flex-shrink-0 text-base">
      {fallbackEmoji(title)}
    </span>
  );
}

export default function Agenda() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedMatchId, setExpandedMatchId] = useState(null);

  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    async function fetchAgenda() {
      try {
        const res = await fetch(`${API_BASE}/diaries.json`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Error al cargar la agenda');
        const json = await res.json();
        // Debug: pehla item console me dekhein taake image field ka naam pata chale
        
        setMatches(json.data || []);
      } catch (err) {
        console.error('Fetch Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchAgenda();
  }, []);

  const toggleDropdown = (id) => {
    setExpandedMatchId(expandedMatchId === id ? null : id);
  };

  // Date client par useEffect me set hoti hai (prerender error se bachne ke liye)
  const [today, setToday] = useState('');
  useEffect(() => {
    setToday(
      new Date().toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    );
  }, []);

  if (loading) {
    return <div className="text-center py-12 text-gray-500">Cargando agenda deportiva...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">No se pudo cargar la agenda en este momento.</div>;
  }

  return (
    <section className="bg-white border border-gray-200 rounded-md shadow-sm my-6 overflow-hidden max-w-5xl mx-auto">
      {/* Green Header */}
      <div className="bg-[#167a36] text-white px-4 py-3 font-bold text-center text-lg">
        Agenda{today ? ` - ${today}` : ''}
      </div>

      <div className="divide-y divide-gray-200">
        {matches.length === 0 ? (
          <p className="text-gray-500 text-center py-6">No hay partidos programados para hoy.</p>
        ) : (
          matches.map((match, i) => {
            const attr = match.attributes || match;
            const embeds = attr.embeds?.data || attr.embeds || [];
            const id = match.id ?? i;
            const isExpanded = expandedMatchId === id;
            const title = attr.diary_description || attr.title || 'Partido de Fútbol';
            const imgSrc = pickImage(attr);

            return (
              <div key={id} className="hover:bg-gray-50 transition">
                {/* Match Row */}
                <div
                  onClick={() => toggleDropdown(id)}
                  className="p-4 flex items-center justify-between cursor-pointer select-none"
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <span className="text-sm font-bold text-gray-700 w-12 flex-shrink-0">
                      {attr.diary_hour ? attr.diary_hour.slice(0, 5) : '00:00'}
                    </span>

                    <MatchIcon src={imgSrc} title={title} />

                    <h3 className="text-sm md:text-base font-medium text-gray-900 truncate">
                      {title}
                    </h3>
                  </div>

                  {/* Dropdown Button */}
                  <div className="text-gray-500 text-xs font-semibold flex-shrink-0 ml-4">
                    {embeds.length > 0 && (
                      <span className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded border border-gray-300 transition inline-flex items-center space-x-1">
                        <span>{isExpanded ? '▲' : '▼'}</span>
                        <span>Canales ({embeds.length})</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Dropdown Content (Channels) */}
                {isExpanded && embeds.length > 0 && (
                  <div className="bg-gray-50 px-16 py-3 border-t border-gray-200 flex flex-wrap gap-2">
                    {embeds.map((embed, idx) => {
                      const embedAttrs = embed.attributes || embed;
                      const iframeValue = embedAttrs.embed_iframe || '';

                      let rValue = iframeValue;
                      if (iframeValue.includes('?r=')) {
                        rValue = iframeValue.split('?r=')[1];
                      }

                      return (
                        <a
                          key={idx}
                             href={`/embed/eventos.html?r=${encodeURIComponent(rValue)}`}
                          className="text-xs bg-[#167a36] hover:bg-green-700 text-white font-medium px-3 py-1.5 rounded transition shadow-sm inline-flex items-center space-x-1"
                        >
                          <span>▶ {embedAttrs.embed_name || `Canal ${idx + 1}`}</span>
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}