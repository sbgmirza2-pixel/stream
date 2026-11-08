import Link from 'next/link';
import { channelsData } from '@/lib/channelsData';

const SITE_URL = 'https://futbollibre.onl';

// Lista de canales como ItemList: Google ko har canal ka URL clear milta hai
const itemListJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Canales deportivos en vivo',
  itemListElement: channelsData.map((channel, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: channel.name,
    url: `${SITE_URL}/en-vivo/${channel.id}`,
  })),
};

export default function ChannelsGrid() {
  return (
    <section className="my-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListJsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <h2 className="text-2xl font-bold text-[#167a36] mb-6">Canales deportivos en vivo</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {channelsData.map((channel) => (
          <div
            key={channel.id}
            className="bg-white rounded-md overflow-hidden shadow-sm border border-gray-200 flex flex-col justify-between hover:shadow-md transition"
          >
            <div className="relative h-40 bg-gray-50 border-b border-gray-200 flex items-center justify-center p-2">
              <img
                src={channel.image}
                alt={`Logo de ${channel.name}`}
                className="max-h-full max-w-full object-contain"
                loading="lazy"
              />
            </div>
            <div className="p-4 flex flex-col flex-grow justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{channel.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{channel.description}</p>
              </div>
              {/* Text "Ver Canal" same hai; aria-label se Google/screen reader ko unique anchor milta hai */}
              <Link
                href={`/en-vivo/${channel.id}`}
                aria-label={`Ver ${channel.name} en vivo`}
                className="block text-center bg-[#167a36] hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition"
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