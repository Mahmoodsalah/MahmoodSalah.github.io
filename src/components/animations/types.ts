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
}