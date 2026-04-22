import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface FlowNode {
  id: string;
  label: string;
  x: number;
  y: number;
  type: 'trigger' | 'action' | 'condition' | 'output';
}

const nodes: FlowNode[] = [
  { id: '1', label: 'Email Recibido', x: 100, y: 150, type: 'trigger' },
  { id: '2', label: 'Validar Datos', x: 300, y: 150, type: 'action' },
  { id: '3', label: '> 5000€?', x: 500, y: 150, type: 'condition' },
  { id: '4', label: 'Aprobación Manager', x: 700, y: 100, type: 'action' },
  { id: '5', label: 'Proceso Automático', x: 700, y: 200, type: 'action' },
  { id: '6', label: 'Actualizar SAP', x: 900, y: 150, type: 'output' },
];

const connections = [
  { from: '1', to: '2' },
  { from: '2', to: '3' },
  { from: '3', to: '4' },
  { from: '3', to: '5' },
  { from: '4', to: '6' },
  { from: '5', to: '6' },
];

export const AnimatedFlowVisualization = () => {
  const [activeConnection, setActiveConnection] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveConnection((prev) => (prev + 1) % connections.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'trigger': return 'from-brand-400 to-brand-600';
      case 'action': return 'from-emerald-400 to-emerald-600';
      case 'condition': return 'from-amber-400 to-orange-600';
      case 'output': return 'from-purple-400 to-purple-600';
      default: return 'from-slate-400 to-slate-600';
    }
  };

  return (
    <div className="relative h-80 w-full overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8 shadow-2xl dark:border-slate-700 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <svg className="absolute inset-0 h-full w-full">
        {/* Grid Pattern */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-slate-200 dark:text-slate-700" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Connections */}
        {connections.map((conn, index) => {
          const fromNode = nodes.find(n => n.id === conn.from);
          const toNode = nodes.find(n => n.id === conn.to);
          if (!fromNode || !toNode) return null;

          return (
            <g key={index}>
              <motion.path
                d={`M ${fromNode.x} ${fromNode.y} L ${toNode.x} ${toNode.y}`}
                stroke={index === activeConnection ? '#356cc4' : '#e2e8f0'}
                strokeWidth={index === activeConnection ? 3 : 2}
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: index * 0.2 }}
                className="dark:stroke-slate-600"
              />
              {index === activeConnection && (
                <motion.circle
                  cx={fromNode.x}
                  cy={fromNode.y}
                  r="4"
                  fill="#356cc4"
                  animate={{
                    cx: [fromNode.x, toNode.x],
                    cy: [fromNode.y, toNode.y],
                  }}
                  transition={{ duration: 1, ease: 'easeInOut' }}
                />
              )}
            </g>
          );
        })}

        {/* Nodes */}
        {nodes.map((node) => (
          <motion.g
            key={node.id}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: parseFloat(node.id) * 0.1, type: 'spring' }}
          >
            <foreignObject x={node.x - 60} y={node.y - 25} width="120" height="50">
              <div className={`flex h-full items-center justify-center rounded-2xl bg-gradient-to-r ${getNodeColor(node.type)} p-2 text-xs font-semibold text-white shadow-lg`}>
                {node.label}
              </div>
            </foreignObject>
          </motion.g>
        ))}
      </svg>
    </div>
  );
};