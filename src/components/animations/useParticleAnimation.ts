import { useCallback, useEffect, useRef } from 'react';
import { Point, AnimationConfig } from './types';
import { createParticles, updateParticles, drawScene } from './particleUtils';

const DEFAULT_CONFIG: AnimationConfig = {
  particleCount: 50,
  connectionDistance: 150,
  particleSpeed: 0.5,
  particleSize: 2,
  color: '99, 102, 241',
  pulseSpeed: 0.03
};

export function useParticleAnimation(config: Partial<AnimationConfig> = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Point[]>([]);
  const animationFrameRef = useRef<number>();
  
  const settings = { ...DEFAULT_CONFIG, ...config };

  const animate = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.clearRect(0, 0, width, height);
    
    updateParticles(particlesRef.current, width, height, settings);
    drawScene(ctx, particlesRef.current, settings);
    
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
      particlesRef.current = createParticles(canvas.width, canvas.height, settings);
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
  }, [animate]);

  return canvasRef;
}