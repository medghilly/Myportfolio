import { useRef, useState, useEffect, useMemo } from 'react';

/**
 * Custom hook to add a magnetic effect to an element.
 * @param strength - How much the element moves (default: 0.3)
 */
export const useMagnetic = (strength = 0.3) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      
      const { clientX, clientY } = e;
      const { left, top, width, height } = ref.current.getBoundingClientRect();
      
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      
      const x = (clientX - centerX) * strength;
      const y = (clientY - centerY) * strength;
      
      setPosition({ x, y });
    };

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 });
    };

    const el = ref.current;
    if (el) {
      el.addEventListener('mousemove', handleMouseMove);
      el.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (el) {
        el.removeEventListener('mousemove', handleMouseMove);
        el.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [strength]);

  const style = useMemo(() => ({
    transform: `translate(${position.x}px, ${position.y}px)`,
    transition: position.x === 0 ? 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)' : 'none'
  }), [position]);

  return { ref, style };
};
