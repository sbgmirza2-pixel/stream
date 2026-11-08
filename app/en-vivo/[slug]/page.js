import { Suspense } from 'react';
import Link from 'next/link';
import { channelsData } from '../../../lib/channelsData';
import StreamPlayer from '../../components/StreamPlayer';

const SITE_URL = 'https://futbollibre.onl';
const SITE_NAME = 'Fútbol Libre';

// Ruta real del proyecto: app/en-vivo/[slug]/page.js
const CHANNEL_PATH = '/en-vivo';

function getList() {
  return Array.isArray(channelsData) ? channelsData : channelsData.channelsData || [];
}

function getChannel(slug) {
  return getList().find((c) => c.id === slug);
}

function truncate(text, max = 155) {
  if (!text) return '';
  const clean = String(text).replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  return clean.slice(0, max).replace(/\s+\S*$/, '') + '…';
}

export function generateStaticParams() {
  return getList().map((c) => ({ slug: c.id }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const channel = getChannel(slug);

  if (!channel) {
    return {
      title: 'Canal no encontrado',
      robots: { index: false, follow: false },
    };
  }

  const path = `${CHANNEL_PATH}/${channel.id}`;
  const title = `Ver ${channel.name} en vivo`;
  const description =
    truncate(channel.description) ||
    `Mira ${channel.name} en vivo online. Consulta la programación y los partidos que transmite.`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      locale: 'es_MX',
      url: path,
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [{ url: '/logo.png', width: 512, height: 512, alt: channel.name }],
    },
    twitter: {
      card: 'summary',
      title: `${title} | ${SITE_NAME}`,
      description,
      images: ['/logo.png'],
    },
  };
}

async function StreamContent({ params }) {
  const { slug } = await params;
  const channel = getChannel(slug);

  if (!channel) {
    return (
      <div className="max-w-4xl mx-auto py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Canal no encontrado</h1>
        <Link href="/" className="text-[#167a36] underline font-semibold">
          Volver al inicio
        </Link>
      </div>
    );
  }

  const url = `${SITE_URL}${CHANNEL_PATH}/${channel.id}`;
  const description = truncate(channel.description);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: `Ver ${channel.name} en vivo`,
        ...(description ? { description } : {}),
        inLanguage: 'es-MX',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        breadcrumb: { '@id': `${url}#breadcrumb` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: channel.name, item: url },
        ],
      },
    ],
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 py-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />

      {/* H1 oculto visualmente (el diseño no lo muestra) pero visible para Google y lectores de pantalla.
          Si quieres mostrarlo, quita la clase "sr-only". */}
      <h1 className="sr-only">{channel.name} en vivo</h1>

      <div className="flex items-center justify-between">
        <Link href="/" className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1.5 rounded transition font-medium">
          ← Volver al inicio
        </Link>
      </div>

      <StreamPlayer src={channel.streamUrl} />

      <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg text-gray-700">
        <p className="text-sm">{channel.description}</p>
      </div>
    </div>
  );
}

export default function StreamPage({ params }) {
  return (
    <Suspense fallback={<div className="text-center py-16 text-gray-500">Cargando transmisión...</div>}>
      <StreamContent params={params} />
    </Suspense>
  );
}