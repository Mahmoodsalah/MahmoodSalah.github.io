import { useCallback, useEffect, useRef } from 'react';
import { Neuron, NeuralConfig } from './types';
import { createNeuralLayers, updateNeuralNetwork, drawNeuralNetwork } from './neuralUtils';

const DEFAULT_CONFIG: NeuralConfig = {
  layerCount: 4,
  neuronsPerLayer: 5,
  pulseSpeed: 0.02,
  color: '75, 85, 99' // Gray
};

export function useNeuralAnimation(config: Partial<NeuralConfig> = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const neuronsRef = useRef<Neuron[]>([]);
  const animationFrameRef = useRef<number>();
  
  const settings = { ...DEFAULT_CONFIG, ...config };

  const animate = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.clearRect(0, 0, width, height);
    
    updateNeuralNetwork(neuronsRef.current, settings);
    drawNeuralNetwork(ctx, neuronsRef.current, settings);
    
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
      neuronsRef.current = createNeuralLayers(canvas.width, canvas.height, settings);
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