import { Shape, Point, AnimationConfig } from './types';

function createRegularPolygon(sides: number, radius: number): Point[] {
  const points: Point[] = [];
  for (let i = 0; i < sides; i++) {
    const angle = (i * 2 * Math.PI) / sides - Math.PI / 2;
    points.push({
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius
    });
  }
  return points;
}

const SHAPES = ['triangle', 'square', 'pentagon', 'hexagon'] as const;
const SHAPE_SIZES = {
  triangle: 15,
  square: 12,
  pentagon: 13,
  hexagon: 14
};

export function createShapes(width: number, height: number, config: AnimationConfig): Shape[] {
  return Array.from({ length: config.shapeCount }, () => {
    const type = SHAPES[Math.floor(Math.random() * SHAPES.length)];
    const sides = type === 'triangle' ? 3 : 
                 type === 'square' ? 4 : 
                 type === 'pentagon' ? 5 : 6;
    
    return {
      points: createRegularPolygon(sides, SHAPE_SIZES[type]),
      x: Math.random() * width,
      y: Math.random() * height,
      rotation: Math.random() * Math.PI * 2,
      vx: (Math.random() - 0.5) * config.moveSpeed,
      vy: (Math.random() - 0.5) * config.moveSpeed,
      vr: (Math.random() - 0.5) * config.rotationSpeed,
      scale: 0.8 + Math.random() * 0.4,
      type
    };
  });
}

export function updateShapes(shapes: Shape[], width: number, height: number, config: AnimationConfig) {
  shapes.forEach(shape => {
    // Update position
    shape.x += shape.vx;
    shape.y += shape.vy;
    shape.rotation += shape.vr;

    // Calculate max radius from shape points
    const maxRadius = Math.max(...shape.points.map(point => 
      Math.max(Math.abs(point.x), Math.abs(point.y))
    )) * shape.scale;

    // Bounce off walls
    if (shape.x < maxRadius || shape.x > width - maxRadius) shape.vx *= -1;
    if (shape.y < maxRadius || shape.y > height - maxRadius) shape.vy *= -1;
  });
}

export function drawScene(ctx: CanvasRenderingContext2D, shapes: Shape[], config: AnimationConfig) {
  // Draw connections
  ctx.lineWidth = 0.5;
  shapes.forEach((s1, i) => {
    shapes.slice(i + 1).forEach(s2 => {
      const dx = s1.x - s2.x;
      const dy = s1.y - s2.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < config.connectionDistance) {
        const opacity = (1 - distance / config.connectionDistance) * 0.2;
        const gradient = ctx.createLinearGradient(s1.x, s1.y, s2.x, s2.y);
        gradient.addColorStop(0, `rgba(${config.primaryColor}, ${opacity})`);
        gradient.addColorStop(1, `rgba(${config.secondaryColor}, ${opacity})`);
        
        ctx.strokeStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(s1.x, s1.y);
        ctx.lineTo(s2.x, s2.y);
        ctx.stroke();
      }
    });
  });

  // Draw shapes
  shapes.forEach(shape => {
    ctx.save();
    ctx.translate(shape.x, shape.y);
    ctx.rotate(shape.rotation);
    ctx.scale(shape.scale, shape.scale);

    const isAIShape = ['triangle', 'hexagon'].includes(shape.type);
    const color = isAIShape ? config.primaryColor : config.secondaryColor;
    
    ctx.beginPath();
    shape.points.forEach((point, i) => {
      if (i === 0) ctx.moveTo(point.x, point.y);
      else ctx.lineTo(point.x, point.y);
    });
    ctx.closePath();
    
    // Fill with gradient
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 20);
    gradient.addColorStop(0, `rgba(${color}, 0.2)`);
    gradient.addColorStop(1, `rgba(${color}, 0.1)`);
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Stroke
    ctx.strokeStyle = `rgba(${color}, 0.6)`;
    ctx.lineWidth = 1;
    ctx.stroke();
    
    ctx.restore();
  });
}