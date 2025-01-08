import { CircuitNode, DataPacket, CircuitConfig } from './types';

function createGrid(width: number, height: number, count: number) {
  const grid: CircuitNode[] = [];
  const cols = Math.ceil(Math.sqrt(count));
  const rows = Math.ceil(count / cols);
  const cellWidth = width / (cols + 1);
  const cellHeight = height / (rows + 1);

  for (let i = 0; i < count; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const type = i === 0 ? 'processor' : 
                i % 3 === 1 ? 'memory' : 'io';

    grid.push({
      x: (col + 1) * cellWidth + (Math.random() - 0.5) * cellWidth * 0.5,
      y: (row + 1) * cellHeight + (Math.random() - 0.5) * cellHeight * 0.5,
      type,
      pulseOffset: Math.random() * Math.PI * 2,
      connections: []
    });
  }

  // Create connections (avoiding crossing lines where possible)
  grid.forEach((node, i) => {
    const possibleConnections = grid
      .map((target, j) => ({ target: j, distance: Math.hypot(target.x - node.x, target.y - node.y) }))
      .filter(({ target }) => target !== i)
      .sort((a, b) => a.distance - b.distance);

    // Connect to 2-4 nearest nodes
    const connectionCount = 2 + Math.floor(Math.random() * 3);
    possibleConnections
      .slice(0, connectionCount)
      .forEach(({ target }) => {
        if (!node.connections.includes(target)) {
          node.connections.push(target);
          grid[target].connections.push(i);
        }
      });
  });

  return grid;
}

function createDataPackets(nodes: CircuitNode[], count: number): DataPacket[] {
  return Array.from({ length: count }, () => {
    const startIdx = Math.floor(Math.random() * nodes.length);
    const endIdx = nodes[startIdx].connections[
      Math.floor(Math.random() * nodes[startIdx].connections.length)
    ];

    return {
      startNode: startIdx,
      endNode: endIdx,
      progress: Math.random(),
      path: []
    };
  });
}

export function createCircuit(width: number, height: number, config: Required<CircuitConfig>) {
  const nodes = createGrid(width, height, config.nodeCount);
  const packets = createDataPackets(nodes, config.dataPacketCount);
  return { nodes, packets };
}

export function updateCircuit(
  nodes: CircuitNode[],
  packets: DataPacket[],
  config: Required<CircuitConfig>
) {
  // Update node pulses
  nodes.forEach(node => {
    node.pulseOffset = (node.pulseOffset + 0.02) % (Math.PI * 2);
  });

  // Update data packets
  packets.forEach(packet => {
    packet.progress += config.packetSpeed;
    if (packet.progress >= 1) {
      // Reset packet with new path
      const startIdx = packet.endNode;
      const node = nodes[startIdx];
      packet.startNode = startIdx;
      packet.endNode = node.connections[
        Math.floor(Math.random() * node.connections.length)
      ];
      packet.progress = 0;
    }
  });
}

export function drawCircuit(
  ctx: CanvasRenderingContext2D,
  nodes: CircuitNode[],
  packets: DataPacket[],
  config: Required<CircuitConfig>
) {
  // Draw connections
  ctx.lineWidth = 1;
  nodes.forEach((node, i) => {
    node.connections.forEach(targetIdx => {
      if (targetIdx > i) { // Avoid drawing connections twice
        const target = nodes[targetIdx];
        const gradient = ctx.createLinearGradient(node.x, node.y, target.x, target.y);
        gradient.addColorStop(0, `rgba(${config.primaryColor}, 0.2)`);
        gradient.addColorStop(0.5, `rgba(${config.secondaryColor}, 0.3)`);
        gradient.addColorStop(1, `rgba(${config.primaryColor}, 0.2)`);

        ctx.strokeStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(target.x, target.y);
        ctx.stroke();
      }
    });
  });

  // Draw nodes
  nodes.forEach(node => {
    const pulseScale = (Math.sin(node.pulseOffset) + 1.2) / 2.2;
    const baseSize = node.type === 'processor' ? 12 : 
                    node.type === 'memory' ? 10 : 8;
    const size = baseSize * pulseScale;

    // Node glow
    const gradient = ctx.createRadialGradient(
      node.x, node.y, 0,
      node.x, node.y, size * 2
    );
    const color = node.type === 'processor' ? config.primaryColor :
                 node.type === 'memory' ? config.secondaryColor :
                 config.tertiaryColor;
    
    gradient.addColorStop(0, `rgba(${color}, 0.3)`);
    gradient.addColorStop(1, `rgba(${color}, 0)`);
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(node.x, node.y, size * 2, 0, Math.PI * 2);
    ctx.fill();

    // Node core
    ctx.fillStyle = `rgba(${color}, 0.8)`;
    ctx.beginPath();
    ctx.arc(node.x, node.y, size, 0, Math.PI * 2);
    ctx.fill();
  });

  // Draw data packets
  packets.forEach(packet => {
    const start = nodes[packet.startNode];
    const end = nodes[packet.endNode];
    const x = start.x + (end.x - start.x) * packet.progress;
    const y = start.y + (end.y - start.y) * packet.progress;

    // Packet glow
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, 6);
    gradient.addColorStop(0, `rgba(${config.secondaryColor}, 0.8)`);
    gradient.addColorStop(1, `rgba(${config.secondaryColor}, 0)`);
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, 6, 0, Math.PI * 2);
    ctx.fill();

    // Packet core
    ctx.fillStyle = `rgba(${config.secondaryColor}, 1)`;
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fill();
  });
}