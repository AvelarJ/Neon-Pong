import { useState, useRef, useEffect } from 'react';

export function useGameLoop() {
  const [ball, setBall] = useState({
    x: 250,
    y: 350,
    vx: (Math.random() > 0.5 ? 1 : -1) * 4,
    vy: (Math.random() > 0.5 ? 1 : -1) * 3,
    radius: 20,
    hitDetected: false
  });

  const [score, setScore] = useState({
    player: 0,
    opponent: 0
  });

  // Game constants - adjusting to a standard viewport scale
  const limits = {
    width: 1000,
    height: 1600,
    offY: 100
  };

  useEffect(() => {
    let frameId: number;
    const loop = () => {
      setBall((prev) => {
        let x = prev.x;
        let y = prev.y;
        let vx = prev.vx;
        let vy = prev.vy;

        // Movement logic
        let nextX = x + vx;
        let nextY = y + vy;

        // Barrier/Goal check
        // If ball hits top goal post (opponent zone)
        if (nextY < 0) {
          setScore(s => ({ ...s, opponent: s.opponent + 1 }));
          vy *= -1;
          nextY = y; // Reposition to avoid stuck loop
        }
        // If ball hits bottom goal post (player zone)
        else if (nextY > 1600) {
          setScore(s => ({ ...s, player: s.player + 1 }));
          vy *= -1;
          nextY = y;
        }

        // Wall bounce logic
        if (nextX <= prev.radius || nextX >= 980) {
          vx *= -1;
        }

        return {
          x: nextX,
          y: nextY,
          vx,
          vy,
          radius: prev.radius,
          hitDetected: true
        };
      });
      frameId = requestAnimationFrame(loop);
    };

    const start = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(start);
  }, []);

  const restart = () => {
    setBall({
      x: 500,
      y: 800,
      vx: (Math.random() > 0.5 ? 1 : -1) * 4,
      vy: (Math.random() > 0.5 ? 1 : -1) * 3,
      radius: 20,
      hitDetected: false
    });
    setScore({ player: 0, opponent: 0 });
  };

  return { ball, score, restart };
}
