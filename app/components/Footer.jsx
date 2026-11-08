import Link from 'next/link';
import Image from 'next/image';

const channelLinks = [
  { name: 'DSports', href: '/en-vivo/directv-sports' },
  { name: 'ESPN 1', href: '/en-vivo/espn-1' },
  { name: 'ESPN 2', href: '/en-vivo/espn-2' },
  { name: 'ESPN 3', href: '/en-vivo/espn-3' },
  { name: 'Fox Sports', href: '/en-vivo/fox-sports-1' },
  { name: 'Fox Sports 2', href: '/en-vivo/fox-sports-2' },
];

// Footer ke titles <p> hain (pehle <h3>): footer headings page ke H1>H2>H3 outline ko kharab karte the
const footerTitle = 'text-sm font-bold text-gray-900 uppercase tracking-wide mb-3';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Marca */}
        <div className="space-y-3">
          <Link href="/" className="inline-flex items-center space-x-2">
            <Image
              src="/logo.png"
              alt="Fútbol Libre"
              width={32}
              height={32}
              className="h-8 w-8 object-contain"
            />
            <span className="text-xl font-bold text-[#167a36]">Fútbol Libre</span>
          </Link>
          <p className="text-sm text-gray-600 leading-relaxed">
            Fútbol Libre provides today's football schedule, kickoff times, competitions and sports channels to follow live matches from different countries.
          </p>
        </div>

        {/* Canales */}
        <nav aria-label="Canales">
          <p className={footerTitle}>Canales</p>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {channelLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-gray-600 hover:text-[#167a36] transition">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Redes */}
        <div>
          <p className={footerTitle}>Síguenos</p>
          <div className="flex space-x-3">
            {/* TODO: href="#" ko asli Telegram/Facebook URL se badlein (rel="noopener noreferrer" target="_blank" ke saath) */}
            <a
              href="#"
              className="px-4 py-2 rounded border border-gray-300 text-sm font-medium text-gray-700 hover:bg-[#167a36] hover:text-white hover:border-[#167a36] transition"
            >
              Telegram
            </a>
            <a
              href="#"
              className="px-4 py-2 rounded border border-gray-300 text-sm font-medium text-gray-700 hover:bg-[#167a36] hover:text-white hover:border-[#167a36] transition"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>

      {/* Barra inferior */}
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-gray-500 text-center md:text-left">
          <p>© 2026 Fútbol Libre. Todos los derechos reservados.</p>
          <p>Los horarios pueden variar según tu país y zona horaria.</p>
        </div>
      </div>
    </footer>
  );
}