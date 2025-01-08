import { useCallback, useEffect, useRef } from 'react';
import { Shape, AnimationConfig } from './types';
import { createShapes, updateShapes, drawScene } from './geometricUtils';

const DEFAULT_CONFIG: AnimationConfig = {
  shapeCount: 30,
  connectionDistance: 150,
  rotationSpeed: 0.001,
  moveSpeed: 0.3,
  primaryColor: '99, 102, 241', // Indigo
  secondaryColor: '79, 70, 229' // Purple
};

export function useGeometricAnimation(config: Partial<AnimationConfig> = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shapesRef = useRef<Shape[]>([]);
  const animationFrameRef = useRef<number>();
  
  const settings = { ...DEFAULT_CONFIG, ...config };

  const animate = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.clearRect(0, 0, width, height);
    
    updateShapes(shapesRef.current, width, height, settings);
    drawScene(ctx, shapesRef.current, settings);
    
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
      shapesRef.current = createShapes(canvas.width, canvas.height, settings);
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