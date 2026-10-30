import Agenda from '@/components/Agenda';
import ChannelsGrid from '@/components/ChannelsGrid';

export default function HomePage() {
  return (
    <div className="space-y-8">
      {/* Dynamic SEO Intro */}
      <section className="text-gray-300 space-y-3">
        <h1 className="text-3xl font-extrabold text-white">Partidos de Fútbol en Vivo</h1>
        <p className="text-slate-400 leading-relaxed">
          Consulta la agenda futbolística diaria con horarios, torneos y señales deportivas para consultar los principales partidos desde un solo lugar.
        </p>
      </section>

      {/* Dynamic Agenda from API */}
      <Agenda />

      {/* Channels Grid */}
      <ChannelsGrid />
    </div>
  );
}