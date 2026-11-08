import { Suspense } from 'react';
import Link from 'next/link';

// Esta página solo muestra un iframe según ?r=... (URLs infinitas, sin contenido propio):
// no debe indexarse. Los enlaces se siguen sin pasar autoridad a streams externos.
export const metadata = {
  title: 'Transmisión en vivo',
  description: 'Reproductor de eventos deportivos en vivo.',
  robots: { index: false, follow: false },
};

function getDecodedStreamUrl(searchParams) {
  try {
    const rParam = searchParams?.r;
    if (!rParam) return '';

    // Base64 decode to get the original streaming link
    const decodedUrl = Buffer.from(String(rParam).replace(/ /g, '+'), 'base64').toString('utf-8');
    if (decodedUrl.startsWith('http')) {
      return decodedUrl;
    }
    return `https://tvf90.com/${decodedUrl}`;
  } catch (e) {
    return '';
  }
}

async function StreamViewer({ searchParams }) {
  const resolvedParams = await searchParams;
  const streamUrl = getDecodedStreamUrl(resolvedParams);

  return (
    <div className="max-w-5xl mx-auto space-y-6 py-6 px-4">
      <h1 className="sr-only">Transmisión en vivo</h1>

      <div className="flex items-center justify-between">
        <Link href="/" className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1.5 rounded transition font-medium">
          ← Volver al inicio
        </Link>
      </div>

      {streamUrl ? (
        <div className="w-full aspect-video bg-black rounded-lg overflow-hidden shadow-md">
          <iframe
            src={streamUrl}
            title="Transmisión en vivo"
            className="w-full h-full border-0"
            allowFullScreen
            allow="encrypted-media; autoplay"
            referrerPolicy="no-referrer"
          />
        </div>
      ) : (
        <div className="text-center py-12 text-gray-600">
          <p>Transmisión no disponible.</p>
        </div>
      )}
    </div>
  );
}

export default function EventosPage({ searchParams }) {
  return (
    <Suspense fallback={<div className="text-center py-16 text-gray-500">Cargando reproductor...</div>}>
      <StreamViewer searchParams={searchParams} />
    </Suspense>
  );
}