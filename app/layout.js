import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';

export const metadata = {
  title: 'Futbol Libre - Partidos de Fútbol en Vivo y Canales Online',
  description:
    'Todo sobre Futbol Libre: calendario de partidos, marcadores en vivo, compatibilidad con dispositivos, problemas con las transmisiones y formas seguras de seguir el fútbol en línea.',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col justify-between bg-white text-gray-900 antialiased m-0 p-0">
        <Header />
        <main className="flex-grow max-w-5xl w-full mx-auto px-4 md:px-8 py-6 bg-white">
          {children}
        </main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}