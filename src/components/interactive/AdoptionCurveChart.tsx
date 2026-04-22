import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

interface Props {
  isPaused: boolean;
}

const data = [
  { stage: 'Descubrimiento', adoption: 5 },
  { stage: 'Piloto', adoption: 18 },
  { stage: 'Escalado', adoption: 45 },
  { stage: 'Industrialización', adoption: 70 },
  { stage: 'Optimización', adoption: 83 }
];

export const AdoptionCurveChart = (_props: Props) => {
  return (
    <div className="h-72 w-full overflow-hidden rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-xl backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
      <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Curva típica de adopción</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        De la primera idea a la automatización a escala en Finanzas.
      </p>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 40, right: 30, left: 0, bottom: 20 }}>
          <defs>
            <linearGradient id="colorAdoption" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2053a7" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#2053a7" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey="stage" tick={{ fontSize: 12, fill: '#475569' }} tickLine={false} axisLine={false} />
          <YAxis tick={{ fontSize: 12, fill: '#475569' }} tickLine={false} axisLine={false} unit="%" />
          <Tooltip
            cursor={{ stroke: '#2053a7', strokeWidth: 1, strokeDasharray: '3 3' }}
            contentStyle={{ borderRadius: 16, border: '1px solid #cbd5f5' }}
          />
          <Area type="monotone" dataKey="adoption" stroke="#2053a7" fillOpacity={1} fill="url(#colorAdoption)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
