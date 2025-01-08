import { Point, AnimationConfig } from './types';

export function createParticles(width: number, height: number, config: AnimationConfig): Point[] {
  return Array.from({ length: config.particleCount }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * config.particleSpeed,
    vy: (Math.random() - 0.5) * config.particleSpeed,
    radius: Math.random() * config.particleSize + 2,
    pulseOffset: Math.random() * Math.PI * 2
  }));
}

export function updateParticles(particles: Point[], width: number, height: number, config: AnimationConfig) {
  particles.forEach(particle => {
    particle.x += particle.vx;
    particle.y += particle.vy;

    particle.pulseOffset += config.pulseSpeed;
    if (particle.pulseOffset > Math.PI * 2) {
      particle.pulseOffset = 0;
    }

    if (particle.x < 0 || particle.x > width) particle.vx *= -1;
    if (particle.y < 0 || particle.y > height) particle.vy *= -1;
  });
}

export function drawScene(ctx: CanvasRenderingContext2D, particles: Point[], config: AnimationConfig) {
  // Draw connections with thicker lines
  particles.forEach((p1, i) => {
    particles.slice(i + 1).forEach(p2 => {
      const dx = p1.x - p2.x;
      const dy = p1.y - p2.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < config.connectionDistance) {
        const opacity = (1 - distance / config.connectionDistance) * 0.5;
        ctx.strokeStyle = `rgba(${config.color}, ${opacity})`;
        ctx.lineWidth = config.lineWidth || 2; // Thicker lines
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    });
  });

  // Draw larger particles with glow effect
  particles.forEach(particle => {
    const pulseScale = (Math.sin(particle.pulseOffset) + 1.2) / 2.2;
    const radius = particle.radius * pulseScale;
    
    // Particle glow
    const gradient = ctx.createRadialGradient(
      particle.x, particle.y, 0,
      particle.x, particle.y, radius * 3
    );
    gradient.addColorStop(0, `rgba(${config.color}, 0.8)`);
    gradient.addColorStop(1, `rgba(${config.color}, 0)`);
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, radius * 3, 0, Math.PI * 2);
    ctx.fill();
    
    // Particle core
    ctx.fillStyle = `rgba(${config.color}, 1)`; // More opaque core
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, radius * 1.5, 0, Math.PI * 2);
    ctx.fill();
  });
}