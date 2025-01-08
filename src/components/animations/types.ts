export interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulseOffset: number;
}

export interface AnimationConfig {
  particleCount: number;
  connectionDistance: number;
  particleSpeed: number;
  particleSize: number;
  color: string;
  pulseSpeed: number;
  lineWidth?: number;
  keywords?: string[];
  fontSize?: number;
  primaryColor?: string;
  secondaryColor?: string;
  shapeCount?: number;
  rotationSpeed?: number;
  moveSpeed?: number;
}

export interface BinaryParticle {
  x: number;
  y: number;
  value: string;
  opacity: number;
  fadeSpeed: number;
}

export interface CircuitNode {
  x: number;
  y: number;
  type: 'processor' | 'memory' | 'io';
  pulseOffset: number;
  connections: number[];
}

export interface DataPacket {
  startNode: number;
  endNode: number;
  progress: number;
  path: number[];
}

export interface CircuitConfig {
  nodeCount?: number;
  dataPacketCount?: number;
  packetSpeed?: number;
  primaryColor?: string;
  secondaryColor?: string;
  tertiaryColor?: string;
}

export interface Keyword {
  x: number;
  y: number;
  vx: number;
  vy: number;
  text: string;
  size: number;
  color: string;
}

export interface Shape {
  points: Point[];
  x: number;
  y: number;
  rotation: number;
  vx: number;
  vy: number;
  vr: number;
  scale: number;
  type: 'triangle' | 'square' | 'pentagon' | 'hexagon';
}

export interface NeuralConfig {
  layerCount?: number;
  neuronsPerLayer?: number;
  pulseSpeed?: number;
  color?: string;
}

export interface Neuron {
  x: number;
  y: number;
  layer: number;
  connections: number[];
  pulseOffset: number;
}