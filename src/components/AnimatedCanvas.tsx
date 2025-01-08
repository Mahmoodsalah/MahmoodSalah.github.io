import React from 'react';
import { useNeuralAnimation } from './animations/useNeuralAnimation';

export function AnimatedCanvas() {
  const canvasRef = useNeuralAnimation({
    neuronCount: 50,
    connectionDistance: 200,
    pulseSpeed: 0.02
  });

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ 
        background: 'linear-gradient(to right, rgb(239, 246, 255), rgb(238, 242, 255))'
      }}
    />
  );
}