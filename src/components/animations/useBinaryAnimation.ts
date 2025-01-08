import { useCallback, useEffect, useRef } from 'react';
import { BinaryParticle } from './types';
import { createBinaryParticles, updateBinaryParticles, drawBinaryScene } from './binaryUtils';

interface BinaryConfig {
  density?: number;
  color?: string;
}

const DEFAULT_CONFIG: Required<BinaryConfig> = {
  density: 20,
  color: '99, 102, 241'
};

export function useBinaryAnimation(config: BinaryConfig = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<BinaryParticle[]>([]);
  const animationFrameRef = useRef<number>();
  
  const settings = { ...DEFAULT_CONFIG, ...config };

  const animate = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.clearRect(0, 0, width, height);
    
    updateBinaryParticles(particlesRef.current);
    drawBinaryScene(ctx, particlesRef.current, settings.color);
    
    animationFrameRef.current = requestAnimationFrame(() => animate(ctx, width, height));
  }, [settings.color]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particlesRef.current = createBinaryParticles(
        canvas.width, 
        canvas.height, 
        settings.density
      );
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
  }, [animate, settings.density]);

  return canvasRef;
}