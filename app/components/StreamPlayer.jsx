export default function StreamPlayer({ src }) {
  if (!src) return <div className="text-white p-4">Stream no disponible</div>;

  return (
    <div className="w-full aspect-video bg-black rounded-lg overflow-hidden shadow-2xl relative">
      <iframe
        id="embedIframe"
        src={src}
        className="w-full h-full border-0"
        allowFullScreen={true}
        scrolling="no"
        allow="encrypted-media"
        title="Live Stream"
      />
    </div>
  );
}