import { useCallback, useEffect, useRef } from 'react';
import { CircuitNode, DataPacket, CircuitConfig } from './types';
import { createCircuit, updateCircuit, drawCircuit } from './circuitUtils';

const DEFAULT_CONFIG: Required<CircuitConfig> = {
  nodeCount: 24,
  dataPacketCount: 12,
  packetSpeed: 0.01,
  primaryColor: '99, 102, 241', // Indigo for processors
  secondaryColor: '147, 51, 234', // Purple for memory
  tertiaryColor: '79, 70, 229' // Violet for I/O
};

export function useCircuitAnimation(config: CircuitConfig = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<CircuitNode[]>([]);
  const packetsRef = useRef<DataPacket[]>([]);
  const animationFrameRef = useRef<number>();
  
  const settings = { ...DEFAULT_CONFIG, ...config };

  const animate = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.clearRect(0, 0, width, height);
    
    updateCircuit(nodesRef.current, packetsRef.current, settings);
    drawCircuit(ctx, nodesRef.current, packetsRef.current, settings);
    
    animationFrameRef.current = requestAnimationFrame(() => animate(ctx, width, height));
  }, [settings]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const circuit = createCircuit(canvas.width, canvas.height, settings);
      nodesRef.current = circuit.nodes;
      packetsRef.current = circuit.packets;
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    animate(ctx, canvas.width, canvas.height);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animate, settings]);

  return canvasRef;
}