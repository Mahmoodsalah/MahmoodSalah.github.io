import { AnimationConfig, Neuron, Point } from './types';

export function createNeurons(width: number, height: number, count: number): Neuron[] {
  return Array.from({ length: count }, () => ({
    position: {
      x: Math.random() * width,
      y: Math.random() * height
    },
    connections: [],
    pulseOffset: Math.random(),
    size: Math.random() * 2 + 2
  }));
}

export function drawNeurons(
  ctx: CanvasRenderingContext2D,
  neurons: Neuron[],
  config: AnimationConfig
) {
  neurons.forEach(neuron => {
    const pulseIntensity = Math.sin(neuron.pulseOffset * Math.PI * 2) * 0.5 + 0.5;
    ctx.fillStyle = `rgba(${config.baseColor}, ${0.3 + pulseIntensity * 0.7})`;
    ctx.beginPath();
    ctx.arc(neuron.position.x, neuron.position.y, neuron.size, 0, Math.PI * 2);
    ctx.fill();
  });
}

export function drawConnections(
  ctx: CanvasRenderingContext2D,
  neurons: Neuron[],
  config: AnimationConfig
) {
  neurons.forEach((neuron, i) => {
    neurons.slice(i + 1).forEach(other => {
      const dx = neuron.position.x - other.position.x;
      const dy = neuron.position.y - other.position.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < config.connectionDistance) {
        const pulseAvg = (neuron.pulseOffset + other.pulseOffset) / 2;
        const pulseIntensity = Math.sin(pulseAvg * Math.PI * 2) * 0.5 + 0.5;
        const opacity = (1 - distance / config.connectionDistance) * 0.5 * pulseIntensity;
        
        ctx.strokeStyle = `rgba(${config.baseColor}, ${opacity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(neuron.position.x, neuron.position.y);
        ctx.lineTo(other.position.x, other.position.y);
        ctx.stroke();
      }
    });
  });
}