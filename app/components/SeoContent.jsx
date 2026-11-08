// Contenido SEO del cliente. Cada bloque se exporta por separado
// para poder colocarlo en distintas partes de la página (ver page.js).
import Link from 'next/link';

const h2 = 'text-2xl font-bold text-[#167a36] mt-2 mb-3';
const p = 'text-gray-700 text-sm md:text-base leading-relaxed';
const ul = 'list-disc pl-6 space-y-1 text-gray-700 text-sm md:text-base';
const link = 'text-[#167a36] font-semibold underline hover:text-green-700';

/* 1) Arriba de todo: H1 + ¿Qué es Futbol Libre? */
export function IntroSection() {
  return (
    <section className="space-y-3" aria-labelledby="intro-titulo">
      <h1 id="intro-titulo" className="text-3xl font-bold text-[#167a36]">
        Futbol Libre
      </h1>
      <p className={p}>
        Quien sigue el fútbol casi siempre busca la manera más fácil de encontrar información en
        internet. El nombre Futbol Libre se asocia con páginas de fútbol donde se pueden revisar
        datos de los partidos, calendarios de eventos deportivos y, en algunas, enlaces para ver
        los juegos en vivo.
      </p>

      <h2 className={h2}>¿Qué es Futbol Libre?</h2>
      <p className={p}>
        <Link href="/" className={link}>
          Libre Futbol
        </Link>{' '}
        es como se le llama a las páginas web con información sobre fútbol.
        Dependiendo de la página, ahí hay calendarios, noticias deportivas, marcadores en vivo,
        novedades de los torneos o datos sobre las transmisiones de partidos en vivo.
      </p>
      <p className={p}>
        Para enterarse de qué partidos vienen y cómo van los torneos, los aficionados pueden
        entrar a sitios deportivos. Y si quieren ver un juego, primero tienen que comprobar que
        haya un canal autorizado en el lugar donde viven.
      </p>
    </section>
  );
}

/* 2) Debajo de la Agenda: partidos de hoy + marcadores en vivo */
export function MatchesSection() {
  return (
    <section className="space-y-3">
      <h2 className={h2}>Partidos de fútbol de hoy y próximos encuentros</h2>
      <p className={p}>
        Antes de que arranque un torneo, mucha gente busca el calendario de partidos. Ahí, en un
        solo lugar, se ve qué equipos participan, qué día juegan y a qué hora empieza cada
        encuentro.
      </p>
      <p className={p}>Un calendario de partidos de fútbol incluye:</p>
      <ul className={ul}>
        <li>Los partidos de hoy</li>
        <li>Los próximos partidos</li>
        <li>Nombres de los equipos e información del torneo</li>
        <li>Fechas y horas de inicio de cada partido</li>
        <li>Resultados finales de los partidos ya jugados</li>
      </ul>
      <p className={p}>
        La hora de inicio no es igual en todos los países, así que confirma cuál es en el tuyo
        antes de ver el partido.
      </p>
      <p className={p}>
        Con los marcadores en vivo puedes seguir un partido sin verlo completo, de principio a
        fin. Son muy útiles si andas corto de tiempo o tu internet va lento.
      </p>

      <h2 className={h2}>Marcadores en vivo y resultados de fútbol</h2>
      <p className={p}>
        Los marcadores en vivo te mantienen al tanto de los partidos sin tener que ver todo el
        juego. Vienen bien cuando estás ocupado o tu conexión es lenta.
      </p>
      <p className={p}>Según el sitio deportivo, el marcador puede mostrar:</p>
      <ul className={ul}>
        <li>Marcador en vivo</li>
        <li>Goles y otros momentos del partido</li>
        <li>Estado del partido</li>
        <li>Marcador al medio tiempo</li>
        <li>Marcador final</li>
      </ul>
    </section>
  );
}

/* 3) Debajo del grid de canales: torneos, canales y ligas */
export function LeaguesSection() {
  const ligas = [
    ['Liga MX', '🇲🇽', 'México'],
    ['Liga MX Femenil', '🇲🇽', 'México'],
    ['LaLiga', '🇪🇸', 'España'],
    ['Liga Profesional', '🇦🇷', 'Argentina'],
    ['Liga BetPlay', '🇨🇴', 'Colombia'],
    ['Primera División de Chile', '🇨🇱', 'Chile'],
    ['Liga 1', '🇵🇪', 'Perú'],
    ['LigaPro Serie A', '🇪🇨', 'Ecuador'],
    ['Primera División de Uruguay', '🇺🇾', 'Uruguay'],
    ['Primera División de Paraguay', '🇵🇾', 'Paraguay'],
    ['División Profesional', '🇧🇴', 'Bolivia'],
    ['Liga FUTVE', '🇻🇪', 'Venezuela'],
  ];

  return (
    <section className="space-y-3">
      <h2 className={h2}>Ligas y torneos de fútbol populares</h2>
      <p className={p}>
        Los torneos de fútbol se juegan todo el año. La gente sigue distintas ligas por su
        calendario, por cómo les va a los equipos y por los resultados de los partidos.
      </p>
      <p className={p}>Entre los torneos más populares están:</p>
      <ul className={ul}>
        <li><strong>Premier League:</strong> la liga de fútbol de Inglaterra.</li>
        <li><strong>LaLiga:</strong> la máxima liga profesional de España.</li>
        <li><strong>UEFA Champions League:</strong> el torneo europeo de clubes.</li>
        <li><strong>Copa Libertadores:</strong> el torneo sudamericano de clubes.</li>
        <li><strong>Liga MX:</strong> la liga profesional de México.</li>
      </ul>

      <h2 className={h2}>Canales deportivos</h2>
      <p className={p}>
        Si eres aficionado al fútbol, seguro quieres saber en qué canal pasan tus partidos
        favoritos y otros eventos deportivos. Estos son algunos de los canales deportivos de la
        televisión mexicana:
      </p>
      <ul className={`${ul} grid grid-cols-2 sm:grid-cols-4 gap-x-6 list-inside`}>
        <li>ESPN 1</li>
        <li>ESPN 2</li>
        <li>ESPN 3</li>
        <li>FOX Sports 1</li>
        <li>FOX Sports 2</li>
        <li>FOX Sports 3</li>
        <li>FOX Sports Premium</li>
        <li>TUDN</li>
      </ul>

      <h2 className={h2}>Ligas de fútbol en español en vivo</h2>
      <p className={p}>
        Los partidos de fútbol en español se pueden ver desde cualquier país de habla hispana:
        México, Argentina, España, Colombia, Chile, Perú, Ecuador y otros de Latinoamérica.
        Estas son algunas de las ligas principales que puedes seguir en línea:
      </p>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-gray-700 text-sm md:text-base">
        {ligas.map(([nombre, bandera, pais]) => (
          <li key={nombre}>
            {nombre} <span aria-hidden="true">{bandera}</span> {pais}
          </li>
        ))}
      </ul>
    </section>
  );
}

/* 4) Guía: cómo encontrar, dispositivos, seguridad, legal */
export function GuideSection() {
  const dispositivos = [
    ['Celular Android', 'Revisa calendarios, marcadores y noticias de fútbol desde el navegador'],
    ['iPhone', 'Entérate de las noticias y entra a sitios deportivos'],
    ['PC o Windows', 'Consulta calendarios, resultados y artículos en una pantalla más grande'],
    ['Laptop', 'Sigue las noticias de fútbol mientras trabajas'],
    ['Tableta', 'Revisa la información de los partidos en un dispositivo móvil de pantalla más grande'],
    ['Smart TV', 'Usa un navegador compatible o una aplicación deportiva oficial'],
  ];

  return (
    <section className="space-y-3">
      <h2 className={h2}>Cómo encontrar un partido de fútbol en línea</h2>
      <p className={p}>
        Si ya sabes qué partido quieres ver y a qué hora juega, encontrarlo en internet es mucho
        más fácil. Solo sigue estos pasos:
      </p>
      <ol className="list-decimal pl-6 space-y-1 text-gray-700 text-sm md:text-base">
        <li>Entra a una página de noticias o resultados de fútbol.</li>
        <li>Ve a la sección de calendario o partidos.</li>
        <li>Busca a tu equipo o torneo favorito.</li>
        <li>Fíjate en la fecha del partido y en la hora de inicio en tu zona horaria.</li>
        <li>Abre la página web o la aplicación del canal que lo transmite.</li>
      </ol>
      <p className={p}>
        Poder ver el partido depende de dónde estés y de qué torneo sea. Hay juegos que solo se
        ven pagando, y otros que se transmiten gratis por canales oficiales.
      </p>

      <h2 className={h2}>Compatibilidad de Futbol Libre con distintos dispositivos</h2>
      <p className={p}>
        Los aficionados ven partidos y revisan resultados desde varios dispositivos. Que una
        página funcione bien depende de cómo está diseñada y de lo que ofrece.
      </p>
      <div className="overflow-x-auto border border-gray-200 rounded-md">
        <table className="w-full text-left text-sm md:text-base">
          <caption className="sr-only">Compatibilidad por tipo de dispositivo</caption>
          <thead className="bg-[#167a36] text-white">
            <tr>
              <th scope="col" className="px-4 py-2 font-semibold">Dispositivo</th>
              <th scope="col" className="px-4 py-2 font-semibold">Cómo usarlo</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {dispositivos.map(([disp, uso]) => (
              <tr key={disp} className="hover:bg-gray-50">
                <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">{disp}</th>
                <td className="px-4 py-2 text-gray-700">{uso}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className={p}>
        Una misma página no se comporta igual en todos los dispositivos. Para ver videos influyen
        varios factores, como la velocidad del internet y si la transmisión está disponible.
      </p>

      <h2 className={h2}>¿Es seguro usar Futbol Libre?</h2>
      <p className={p}>
        La seguridad cambia de una página a otra y depende de lo que contenga. Antes de entrar a
        una página de fútbol, ten en cuenta estos consejos:
      </p>
      <ul className={ul}>
        <li>Revisa el dominio antes de entrar.</li>
        <li>No descargues aplicaciones ni extensiones que no conozcas.</li>
        <li>Nunca des tu contraseña ni tu dinero a una página que no sea confiable.</li>
        <li>No aceptes notificaciones de páginas en las que no confíes.</li>
        <li>Mantén actualizados tu navegador y el software de tus dispositivos.</li>
        <li>Para ver partidos en vivo, elige canales de transmisión oficiales.</li>
      </ul>

      <h2 className={h2}>Formas legales de ver fútbol en línea</h2>
      <p className={p}>
        Lo más confiable es ver el fútbol por un canal oficial, porque ahí te dan información
        correcta sobre el precio de la suscripción, los dispositivos compatibles y los partidos
        disponibles.
      </p>
      <p className={p}>
        Dónde ver cada partido aparece en el sitio web oficial de la liga o la competencia, y
        también en los sitios de tu país. Además, hay plataformas en línea que ofrecen gratis
        resúmenes, entrevistas y análisis después de cada partido.
      </p>

      <p className={p}>
        Entra a{' '}
        <Link href="/" className={link}>
          Fútbol Libre
        </Link>{' '}
        y consulta los partidos de fútbol de hoy, los horarios, las competiciones y los canales
        deportivos en vivo. Sigue los juegos de Argentina, México, Chile y más, y míralos en
        línea gratis.
      </p>
    </section>
  );
}

/* 5) Preguntas frecuentes (se abren al hacer clic) + schema FAQPage */
export function FaqSection() {
  const faqs = [
    [
      '¿Es gratis usar Futbol Libre?',
      'Depende de la página y de su servicio. Algunas son gratis, pero otras piden suscripción.',
    ],
    [
      '¿Puedo ver partidos de fútbol en vivo en Futbol Libre?',
      'Sí, se puede ver fútbol en vivo en Futbol Libre, aunque depende de la página y de si el partido está disponible. Algunos partidos sí se pueden ver en tu región.',
    ],
    [
      '¿Puedo ver Futbol Libre en el celular?',
      'Sí, puedes entrar a sitios de información deportiva desde un celular Android o un iPhone, siempre que uses un navegador compatible. Depende de la página y de tu dispositivo.',
    ],
    [
      '¿Puedo usar Futbol Libre desde una computadora?',
      'Sí, también funciona en la computadora. Abre la página y revisa los partidos de fútbol, los marcadores y las transmisiones disponibles. Ver videos depende de la página y de tu navegador.',
    ],
    [
      '¿Cómo saber el marcador de un partido de fútbol sin ver videos?',
      'Hay páginas de deportes que publican marcadores en vivo y resultados sin obligarte a ver videos.',
    ],
    [
      '¿Puedo ver fútbol en línea de forma segura?',
      'Lo más seguro es verlo por un canal autorizado o por un servicio de transmisión en línea que esté disponible en tu zona.',
    ],
    [
      '¿Puedo cambiar el idioma en Futbol Libre?',
      'Depende de la página. Algunas están disponibles en español u otros idiomas, y otras tienen su contenido en un solo idioma.',
    ],
    [
      '¿Futbol Libre ofrece recordatorios de partidos?',
      'Algunas páginas de fútbol ofrecen notificaciones o recordatorios, pero esta función no está disponible en todas las páginas de Futbol Libre.',
    ],
  ];

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: 'es-MX',
    mainEntity: faqs.map(([q, a]) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  return (
    <section className="space-y-3">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <h2 className={h2}>Preguntas frecuentes</h2>
      <div className="border border-gray-200 rounded-md divide-y divide-gray-200 overflow-hidden">
        {faqs.map(([q, a]) => (
          <details key={q} className="group bg-white hover:bg-gray-50">
            <summary className="cursor-pointer select-none list-none px-4 py-3 font-semibold text-gray-900 flex items-center justify-between">
              <span>{q}</span>
              <span aria-hidden="true" className="text-[#167a36] ml-4 group-open:rotate-180 transition">▼</span>
            </summary>
            <p className="px-4 pb-4 text-gray-700 text-sm md:text-base leading-relaxed">{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}