import { useCallback, useEffect, useRef } from 'react';
import { Keyword, AnimationConfig } from './types';
import { createKeywords, updateKeywords, drawScene } from './keywordUtils';
import { AI_KEYWORDS, BUSINESS_KEYWORDS } from './keywords';

const DEFAULT_CONFIG: AnimationConfig = {
  keywords: [...AI_KEYWORDS, ...BUSINESS_KEYWORDS],
  connectionDistance: 200,
  moveSpeed: 0.3,
  fontSize: 16,
  primaryColor: '99, 102, 241', // Indigo for AI terms
  secondaryColor: '79, 70, 229', // Purple for business terms
  particleCount: 30,
  particleSpeed: 0.3,
  particleSize: 2,
  color: '99, 102, 241',
  pulseSpeed: 0.02
};

export function useKeywordAnimation(config: Partial<AnimationConfig> = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const keywordsRef = useRef<Keyword[]>([]);
  const animationFrameRef = useRef<number>();
  
  const settings = { ...DEFAULT_CONFIG, ...config };

  const animate = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.clearRect(0, 0, width, height);
    
    updateKeywords(keywordsRef.current, width, height, settings);
    drawScene(ctx, keywordsRef.current, settings);
    
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
      keywordsRef.current = createKeywords(canvas.width, canvas.height, settings);
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