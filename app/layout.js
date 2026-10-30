import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Futbol Stream HD - Partidos de Fútbol y Canales Online',
  description: 'Consulta los partidos de fútbol en vivo y canales deportivos en HD desde un solo lugar.',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col justify-between bg-slate-950 text-slate-100 antialiased">
        <Header />
        <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-6">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}