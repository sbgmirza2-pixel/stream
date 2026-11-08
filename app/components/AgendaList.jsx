'use client';

import { useState, useEffect } from 'react';

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

function MatchIcon({ src, title }) {
  const [failed, setFailed] = useState(false);

  if (src && !failed) {
    return (
      <img
        src={src}
        alt=""
        width={24}
        height={24}
        loading="lazy"
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
        className="w-6 h-6 rounded-full object-cover flex-shrink-0"
      />
    );
  }
  return (
    <span aria-hidden="true" className="w-6 h-6 flex items-center justify-center flex-shrink-0 text-base">
      {fallbackEmoji(title)}
    </span>
  );
}

export default function AgendaList({ matches }) {
  const [expandedMatchId, setExpandedMatchId] = useState(null);

  const toggleDropdown = (id) => {
    setExpandedMatchId((current) => (current === id ? null : id));
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

  return (
    <section
      aria-labelledby="agenda-titulo"
      className="bg-white border border-gray-200 rounded-md shadow-sm my-6 overflow-hidden max-w-5xl mx-auto"
    >
      {/* Green Header (ab H2: H1 > H2 > H3 hierarchy sahi) */}
      <h2 id="agenda-titulo" className="bg-[#167a36] text-white px-4 py-3 font-bold text-center text-lg">
        Agenda{today ? ` - ${today}` : ''}
      </h2>

      <div className="divide-y divide-gray-200">
        {matches.length === 0 ? (
          <p className="text-gray-500 text-center py-6">No hay partidos programados para hoy.</p>
        ) : (
          matches.map((match) => {
            const { id, title, hour, imgSrc, embeds } = match;
            const isExpanded = expandedMatchId === id;

            return (
              <div key={id} className="hover:bg-gray-50 transition">
                {/* Match Row */}
                <div
                  onClick={() => toggleDropdown(id)}
                  className="p-4 flex items-center justify-between cursor-pointer select-none"
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <span className="text-sm font-bold text-gray-700 w-12 flex-shrink-0">{hour}</span>

                    <MatchIcon src={imgSrc} title={title} />

                    <h3 className="text-sm md:text-base font-medium text-gray-900 truncate">{title}</h3>
                  </div>

                  {/* Dropdown Button (ab real <button>: keyboard + screen reader support) */}
                  <div className="text-gray-500 text-xs font-semibold flex-shrink-0 ml-4">
                    {embeds.length > 0 && (
                      <button
                        type="button"
                        aria-expanded={isExpanded}
                        aria-controls={`canales-${id}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleDropdown(id);
                        }}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded border border-gray-300 transition inline-flex items-center space-x-1"
                      >
                        <span aria-hidden="true">{isExpanded ? '▲' : '▼'}</span>
                        <span>Canales ({embeds.length})</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Dropdown Content (Channels) */}
                {isExpanded && embeds.length > 0 && (
                  <div
                    id={`canales-${id}`}
                    className="bg-gray-50 px-16 py-3 border-t border-gray-200 flex flex-wrap gap-2"
                  >
                    {embeds.map((embed, idx) => (
                      <a
                        key={idx}
                        href={`/embed/eventos.html?r=${encodeURIComponent(embed.r)}`}
                        rel="nofollow"
                        className="text-xs bg-[#167a36] hover:bg-green-700 text-white font-medium px-3 py-1.5 rounded transition shadow-sm inline-flex items-center space-x-1"
                      >
                        <span>▶ {embed.name}</span>
                      </a>
                    ))}
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