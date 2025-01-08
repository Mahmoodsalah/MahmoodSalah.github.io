import { Keyword, AnimationConfig } from './types';
import { AI_KEYWORDS } from './keywords';

export function createKeywords(width: number, height: number, config: AnimationConfig): Keyword[] {
  const keywords = config.keywords || [];
  const fontSize = config.fontSize || 16;
  const moveSpeed = config.moveSpeed || 0.3;
  const primaryColor = config.primaryColor || '99, 102, 241';
  const secondaryColor = config.secondaryColor || '79, 70, 229';

  return keywords.map(text => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * moveSpeed,
    vy: (Math.random() - 0.5) * moveSpeed,
    text,
    size: fontSize,
    color: AI_KEYWORDS.includes(text) ? primaryColor : secondaryColor
  }));
}

export function updateKeywords(keywords: Keyword[], width: number, height: number, config: AnimationConfig) {
  keywords.forEach(keyword => {
    keyword.x += keyword.vx;
    keyword.y += keyword.vy;

    // Bounce off walls with padding for text
    const padding = keyword.text.length * (keyword.size / 2);
    if (keyword.x < padding || keyword.x > width - padding) keyword.vx *= -1;
    if (keyword.y < keyword.size || keyword.y > height - keyword.size) keyword.vy *= -1;
  });
}

export function drawScene(ctx: CanvasRenderingContext2D, keywords: Keyword[], config: AnimationConfig) {
  const connectionDistance = config.connectionDistance || 200;

  // Draw connections
  ctx.lineWidth = 0.5;
  keywords.forEach((k1, i) => {
    keywords.slice(i + 1).forEach(k2 => {
      const dx = k1.x - k2.x;
      const dy = k1.y - k2.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < connectionDistance) {
        const opacity = (1 - distance / connectionDistance) * 0.2;
        ctx.strokeStyle = `rgba(${k1.color}, ${opacity})`;
        ctx.beginPath();
        ctx.moveTo(k1.x, k1.y);
        ctx.lineTo(k2.x, k2.y);
        ctx.stroke();
      }
    });
  });

  // Draw keywords
  keywords.forEach(keyword => {
    ctx.font = `${keyword.size}px 'Gemunu Libre', sans-serif`;
    ctx.fillStyle = `rgba(${keyword.color}, 0.8)`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(keyword.text, keyword.x, keyword.y);
  });
}