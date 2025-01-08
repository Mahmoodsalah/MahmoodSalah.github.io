import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function useGsapAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLSpanElement>(null);
  const subtitle2Ref = useRef<HTMLSpanElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Create dots grid
      if (dotsRef.current) {
        const dots = Array.from({ length: 100 }, (_, i) => {
          const dot = document.createElement('div');
          dot.className = 'absolute w-1 h-1 bg-indigo-200 rounded-full';
          dot.style.left = `${Math.random() * 100}%`;
          dot.style.top = `${Math.random() * 100}%`;
          return dot;
        });
        dots.forEach(dot => dotsRef.current?.appendChild(dot));

        // Animate dots
        gsap.to(dots, {
          scale: 1.5,
          opacity: 0.5,
          duration: 2,
          stagger: {
            amount: 1,
            grid: [10, 10],
            from: 0,
          },
          repeat: -1,
          yoyo: true,
        });
      }

      // Main content animation timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
      })
        .from(subtitleRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.8,
        }, '-=0.5')
        .from(subtitle2Ref.current, {
          y: 30,
          opacity: 0,
          duration: 0.8,
        }, '-=0.5')
        .from(descriptionRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.8,
        }, '-=0.3')
        .from(socialsRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.8,
        }, '-=0.5');

      // Hover effects for dots
      if (containerRef.current) {
        containerRef.current.addEventListener('mousemove', (e) => {
          const { clientX, clientY } = e;
          const { left, top, width, height } = containerRef.current!.getBoundingClientRect();
          const x = (clientX - left) / width;
          const y = (clientY - top) / height;

          gsap.to(dotsRef.current?.children || [], {
            x: (i) => (Math.random() - 0.5) * 20 * (1 - Math.abs(x - 0.5)),
            y: (i) => (Math.random() - 0.5) * 20 * (1 - Math.abs(y - 0.5)),
            duration: 0.5,
            ease: 'power2.out',
          });
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return {
    containerRef,
    titleRef,
    subtitleRef,
    subtitle2Ref,
    descriptionRef,
    socialsRef,
    dotsRef,
  };
}