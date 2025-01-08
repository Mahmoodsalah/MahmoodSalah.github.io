import { BinaryParticle } from './types';

export function createBinaryParticles(width: number, height: number, density: number): BinaryParticle[] {
  const particles: BinaryParticle[] = [];
  const cols = Math.floor(width / density);
  const rows = Math.floor(height / density);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (Math.random() > 0.85) { // Only show some particles for a sparse effect
        particles.push({
          x: i * density,
          y: j * density,
          value: Math.random() > 0.5 ? '1' : '0',
          opacity: Math.random(),
          fadeSpeed: 0.002 + Math.random() * 0.008
        });
      }
    }
  }

  return particles;
}

export function updateBinaryParticles(particles: BinaryParticle[]) {
  particles.forEach(particle => {
    particle.opacity += particle.fadeSpeed;
    
    if (particle.opacity >= 1 || particle.opacity <= 0) {
      particle.fadeSpeed *= -1;
      
      // Occasionally change the value when fully faded
      if (particle.opacity <= 0) {
        particle.value = Math.random() > 0.5 ? '1' : '0';
      }
    }
  });
}

export function drawBinaryScene(
  ctx: CanvasRenderingContext2D, 
  particles: BinaryParticle[],
  color: string = '99, 102, 241' // Default indigo color
) {
  ctx.font = '12px "Gemunu Libre"';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  particles.forEach(particle => {
    ctx.fillStyle = `rgba(${color}, ${particle.opacity})`;
    ctx.fillText(particle.value, particle.x, particle.y);
  });
}