import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';

const SITE_URL = 'https://futbollibre.onl';
const SITE_NAME = 'Fútbol Libre';
const TITLE = 'Fútbol Libre: calendario de partidos, horarios y dónde ver';
const DESCRIPTION =
  'Calendario de fútbol de hoy con horarios de Liga MX, LaLiga, Champions League y Libertadores, y en qué canal oficial ver cada partido.';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
};

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: `%s | ${SITE_NAME}` },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    'calendario de fútbol',
    'partidos de hoy',
    'horarios de fútbol',
    'Liga MX',
    'LaLiga',
    'Champions League',
    'Copa Libertadores',
    'dónde ver fútbol',
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'es_MX',
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: '/logo.png', width: 512, height: 512, alt: SITE_NAME }],
  },
  twitter: {
    card: 'summary',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      inLanguage: 'es-MX',
      description: DESCRIPTION,
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
        width: 512,
        height: 512,
      },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="es-MX">
      <body className="min-h-screen flex flex-col justify-between bg-white text-gray-900 antialiased m-0 p-0">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
          }}
        />
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-white focus:p-2"
        >
          Saltar al contenido
        </a>
        <Header />
        <main
          id="contenido"
          className="flex-grow max-w-5xl w-full mx-auto px-4 md:px-8 py-6 bg-white"
        >
          {children}
        </main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}