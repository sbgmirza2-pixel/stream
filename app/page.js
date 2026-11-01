import Agenda from './components/Agenda';
import ChannelsGrid from './components/ChannelsGrid';
import {
  IntroSection,
  MatchesSection,
  LeaguesSection,
  GuideSection,
  FaqSection,
} from './components/SeoContent';

export default function HomePage() {
  return (
    <div className="space-y-8">
      {/* H1 + ¿Qué es Futbol Libre? */}
      <IntroSection />

      {/* Agenda desde la API */}
      <Agenda />

      {/* Partidos de hoy + marcadores en vivo */}
      <MatchesSection />

      {/* Canales */}
      <ChannelsGrid />

      {/* Torneos, canales y ligas en español */}
      <LeaguesSection />

      {/* Cómo encontrar un partido, dispositivos, seguridad, legal */}
      <GuideSection />

      {/* Preguntas frecuentes */}
      <FaqSection />
    </div>
  );
}