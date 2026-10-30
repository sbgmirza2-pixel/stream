'use client';

import { useState, useEffect } from 'react';

export default function Agenda() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAgenda() {
      try {
        const res = await fetch('https://api.wqxag.com/diaries.json', { cache: 'no-store' });
        if (!res.ok) throw new Error('Error al cargar la agenda');
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error('Fetch Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchAgenda();
  }, []);

  if (loading) {
    return <div className="text-center py-8 text-gray-400">Cargando agenda deportiva...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">No se pudo cargar la agenda en este momento.</div>;
  }

  return (
    <section className="bg-slate-800 p-6 rounded-lg shadow-lg my-6">
      <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-700 pb-2">
        Agenda deportiva de hoy
      </h2>

      {/* Render raw/parsed API content */}
      <div className="space-y-3 text-gray-200">
        {Array.isArray(data) ? (
          data.map((item, index) => (
            <div key={index} className="p-3 bg-slate-700 rounded-md flex justify-between items-center hover:bg-slate-600 transition">
              <div>
                <span className="text-green-400 font-semibold mr-3">{item.time || 'EN VIVO'}</span>
                <span className="font-medium">{item.title || item.name || 'Partido en Directo'}</span>
              </div>
              {item.channel && (
                <span className="text-xs bg-slate-900 px-2 py-1 rounded text-gray-300">
                  {item.channel}
                </span>
              )}
            </div>
          ))
        ) : (
          <pre className="text-xs bg-slate-900 p-4 rounded overflow-x-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
      </div>
    </section>
  );
}