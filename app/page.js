import { Suspense } from 'react';
import Agenda from './components/Agenda';
import ChannelsGrid from './components/ChannelsGrid';
import {
  IntroSection,
  MatchesSection,
  LeaguesSection,
  GuideSection,
  FaqSection,
} from './components/SeoContent';

const SITE_URL = 'https://futbollibre.onl';

// Canonical solo para el home (el layout ya no lo define para no heredarlo a todas las páginas)
export const metadata = {
  alternates: {
    canonical: '/',
    languages: { 'es-MX': '/', 'x-default': '/' },
  },
};

const pageJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: 'Fútbol Libre: calendario de partidos, horarios y dónde ver',
      description:
        'Calendario de fútbol de hoy con horarios de Liga MX, LaLiga, Champions League y Libertadores, y en qué canal oficial ver cada partido.',
      inLanguage: 'es-MX',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: [
        { '@type': 'Thing', name: 'Liga MX' },
        { '@type': 'Thing', name: 'LaLiga' },
        { '@type': 'Thing', name: 'UEFA Champions League' },
        { '@type': 'Thing', name: 'Copa Libertadores' },
      ],
      primaryImageOfPage: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
      breadcrumb: { '@id': `${SITE_URL}/#breadcrumb` },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}/#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL },
      ],
    },
  ],
};

export default function HomePage() {
  return (
    <div className="space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pageJsonLd).replace(/</g, '\\u003c'),
        }}
      />
      {/* H1 + ¿Qué es Futbol Libre? (sirf ek H1 poore page par) */}
      <IntroSection />

      {/* Agenda desde la API */}
      <Suspense
        fallback={
          <div className="text-center py-12 text-gray-500">Cargando agenda deportiva...</div>
        }
      >
        <Agenda />
      </Suspense>

      {/* Partidos de hoy + marcadores en vivo */}
      <MatchesSection />

      {/* Canales */}
      <ChannelsGrid />

      {/* Torneos, canales y ligas en español */}
      <LeaguesSection />

      {/* Cómo encontrar un partido, dispositivos, seguridad, legal */}
      <GuideSection />

      {/* Preguntas frecuentes (FAQPage JSON-LD yahin component me add karenge) */}
      <FaqSection />
    </div>
  );
}