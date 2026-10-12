import { useEffect, useRef } from "react";


const ElectricBackground = ({ className = "" }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w = 0;
    let h = 0;

    const resize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    
    const nodeCount = 40;
    interface Node { x: number; y: number; vx: number; vy: number }
    const nodes: Node[] = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
    }));

    
    interface Pulse { fromIdx: number; toIdx: number; t: number; speed: number }
    const pulses: Pulse[] = [];

    const spawnPulse = () => {
      const a = Math.floor(Math.random() * nodeCount);
      let b = Math.floor(Math.random() * nodeCount);
      if (b === a) b = (b + 1) % nodeCount;
      pulses.push({ fromIdx: a, toIdx: b, t: 0, speed: 0.008 + Math.random() * 0.012 });
    };

    
    for (let i = 0; i < 6; i++) spawnPulse();

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      });

      
      const maxDist = 180;
      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.12;
            ctx.strokeStyle = `rgba(30, 167, 255, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      
      nodes.forEach((n) => {
        ctx.fillStyle = "rgba(30, 167, 255, 0.25)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2, 0, Math.PI * 2);
        ctx.fill();
      });

      
      for (let k = pulses.length - 1; k >= 0; k--) {
        const p = pulses[k];
        p.t += p.speed;
        if (p.t >= 1) {
          pulses.splice(k, 1);
          spawnPulse();
          continue;
        }
        const from = nodes[p.fromIdx];
        const to = nodes[p.toIdx];
        const px = from.x + (to.x - from.x) * p.t;
        const py = from.y + (to.y - from.y) * p.t;

        
        const grad = ctx.createRadialGradient(px, py, 0, px, py, 12);
        grad.addColorStop(0, "rgba(30, 167, 255, 0.6)");
        grad.addColorStop(1, "rgba(30, 167, 255, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(px, py, 12, 0, Math.PI * 2);
        ctx.fill();

      
        ctx.fillStyle = "rgba(30, 167, 255, 0.9)";
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ opacity: 0.5 }}
    />
  );
};

export default ElectricBackground;
