import { Suspense } from 'react';
import { channelsData } from '../../../lib/channelsData';
import StreamPlayer from '../../components/StreamPlayer';
import Link from 'next/link';

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const list = Array.isArray(channelsData) ? channelsData : channelsData.channelsData || [];
  const channel = list.find((c) => c.id === resolvedParams.slug);
  return {
    title: channel ? `${channel.name} en vivo` : 'Ver Canal en Vivo',
  };
}

async function StreamContent({ params }) {
  const resolvedParams = await params;
  const list = Array.isArray(channelsData) ? channelsData : channelsData.channelsData || [];
  const channel = list.find((c) => c.id === resolvedParams.slug);

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

  return (
    <div className="max-w-5xl mx-auto space-y-6 py-6">
      {/* Top bar with only Back button (Heading removed) */}
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