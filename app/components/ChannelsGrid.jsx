import Link from 'next/link';
import { channelsData } from '@/lib/channelsData';

export default function ChannelsGrid() {
  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold text-white mb-6">Canales deportivos en vivo</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {channelsData.map((channel) => (
          <div key={channel.id} className="bg-slate-800 rounded-lg overflow-hidden shadow-lg border border-slate-700 flex flex-col justify-between">
            <div className="relative h-40 bg-slate-900 flex items-center justify-center p-2">
              <img
                src={channel.image}
                alt={channel.name}
                className="max-h-full max-w-full object-contain"
                loading="lazy"
              />
            </div>
            <div className="p-4 flex flex-col flex-grow justify-between">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">{channel.name}</h3>
                <p className="text-sm text-gray-400 mb-4">{channel.description}</p>
              </div>
              <Link
                href={`/en-vivo/${channel.id}`}
                className="block text-center bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded transition"
              >
                Ver Canal
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}