import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';

export const metadata = {
  title: 'Futbol Libre: mira fútbol en vivo, Liga MX y canales deportivos en línea',
  description:
    'Mira fútbol en vivo en Fútbol Libre con partidos de la Liga MX, LaLiga, Champions League y Copa Libertadores. Consulta los calendarios y ve deportes en línea en HD, gratis.',
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