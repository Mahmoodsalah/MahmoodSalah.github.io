import { Neuron, NeuralConfig } from './types';

export function createNeuralLayers(width: number, height: number, config: NeuralConfig): Neuron[] {
  const neurons: Neuron[] = [];
  const layerSpacing = width / (config.layerCount + 1);
  
  // Create neurons in organized layers
  for (let layer = 0; layer < config.layerCount; layer++) {
    const x = layerSpacing * (layer + 1);
    
    for (let i = 0; i < config.neuronsPerLayer; i++) {
      const spacing = height / (config.neuronsPerLayer + 1);
      const y = spacing * (i + 1);
      
      neurons.push({
        x,
        y,
        layer,
        connections: [],
        pulseOffset: Math.random() * Math.PI * 2
      });
    }
  }

  // Create connections between adjacent layers only
  neurons.forEach((neuron, i) => {
    const nextLayer = neurons.filter(n => n.layer === neuron.layer + 1);
    nextLayer.forEach(target => {
      neuron.connections.push(neurons.indexOf(target));
    });
  });

  return neurons;
}

export function updateNeuralNetwork(neurons: Neuron[], config: NeuralConfig) {
  neurons.forEach(neuron => {
    neuron.pulseOffset = (neuron.pulseOffset + config.pulseSpeed) % (Math.PI * 2);
  });
}

export function drawNeuralNetwork(ctx: CanvasRenderingContext2D, neurons: Neuron[], config: NeuralConfig) {
  // Draw connections
  ctx.strokeStyle = `rgba(${config.color}, 0.2)`;
  ctx.lineWidth = 1;
  
  neurons.forEach(neuron => {
    neuron.connections.forEach(targetIdx => {
      const target = neurons[targetIdx];
      ctx.beginPath();
      ctx.moveTo(neuron.x, neuron.y);
      ctx.lineTo(target.x, target.y);
      ctx.stroke();
    });
  });

  // Draw neurons
  neurons.forEach(neuron => {
    const pulseScale = (Math.sin(neuron.pulseOffset) + 1) / 2;
    const size = 3 + pulseScale * 2;
    
    ctx.fillStyle = `rgba(${config.color}, 0.8)`;
    ctx.beginPath();
    ctx.arc(neuron.x, neuron.y, size, 0, Math.PI * 2);
    ctx.fill();
  });
}