import { useEffect, useState } from 'react';

export default function MouseGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 overflow-hidden"
    >
      <div
        className="absolute rounded-full w-[450px] h-[450px] -translate-x-1/2 -translate-y-1/2 blur-[100px] opacity-15 bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          transition: 'transform 0.15s ease-out'
        }}
      />
    </div>
  );
}
