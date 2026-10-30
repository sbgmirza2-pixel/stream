import { channelsData } from '@/lib/channelsData';
import StreamPlayer from '@/components/StreamPlayer';
import Link from 'next/link';

export async function generateMetadata({ params }) {
  const channel = channelsData.find((c) => c.id === params.slug);
  return {
    title: channel ? `${channel.name} en vivo` : 'Ver Canal en Vivo',
  };
}

export default function StreamPage({ params }) {
  const channel = channelsData.find((c) => c.id === params.slug);

  if (!channel) {
    return (
      <div className="max-w-4xl mx-auto py-12 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Canal no encontrado</h1>
        <Link href="/" className="text-green-400 underline">
          Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">{channel.name} - Transmisión en Vivo</h1>
        <Link href="/" className="text-sm bg-slate-800 hover:bg-slate-700 text-gray-200 px-3 py-1.5 rounded transition">
          ← Volver
        </Link>
      </div>

      <StreamPlayer src={channel.streamUrl} />

      <div className="bg-slate-800 p-4 rounded-lg text-gray-300">
        <p className="text-sm">{channel.description}</p>
      </div>
    </div>
  );
}