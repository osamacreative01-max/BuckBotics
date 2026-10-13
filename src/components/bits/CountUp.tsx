'use client';
/* Adapted from React Bits - https://reactbits.dev/text-animations/count-up (MIT License).
   The original animates with `motion/react` springs; this version uses a plain
   IntersectionObserver + requestAnimationFrame ease-out so the site keeps a single,
   dependency-light animation runtime (GSAP elsewhere). Same public API. */

import { useCallback, useEffect, useRef } from 'react';

interface CountUpProps {
  to: number;
  from?: number;
  direction?: 'up' | 'down';
  delay?: number;
  duration?: number;
  className?: string;
  startWhen?: boolean;
  separator?: string;
  onStart?: () => void;
  onEnd?: () => void;
}

const easeOutExpo = (t: number): number => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

export default function CountUp({
  to,
  from = 0,
  direction = 'up',
  delay = 0,
  duration = 2,
  className = '',
  startWhen = true,
  separator = '',
  onStart,
  onEnd
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const startedRef = useRef(false);

  const getDecimalPlaces = (num: number): number => {
    const str = num.toString();
    if (str.includes('.')) {
      const decimals = str.split('.')[1];
      if (parseInt(decimals) !== 0) {
        return decimals.length;
      }
    }
    return 0;
  };

  const maxDecimals = Math.max(getDecimalPlaces(from), getDecimalPlaces(to));

  const formatValue = useCallback(
    (latest: number) => {
      const hasDecimals = maxDecimals > 0;

      const options: Intl.NumberFormatOptions = {
        useGrouping: !!separator,
        minimumFractionDigits: hasDecimals ? maxDecimals : 0,
        maximumFractionDigits: hasDecimals ? maxDecimals : 0
      };

      const formattedNumber = Intl.NumberFormat('en-US', options).format(latest);

      return separator ? formattedNumber.replace(/,/g, separator) : formattedNumber;
    },
    [maxDecimals, separator]
  );

  const startValue = direction === 'down' ? to : from;
  const endValue = direction === 'down' ? from : to;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    if (reduced || !startWhen) return; // keep the final value rendered in the HTML

    let raf = 0;
    let timeout = 0;
    let endTimeout = 0;

    const run = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      onStart?.();
      el.textContent = formatValue(startValue);

      timeout = window.setTimeout(() => {
        const startTime = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - startTime) / (duration * 1000));
          const value = startValue + (endValue - startValue) * easeOutExpo(t);
          el.textContent = formatValue(value);
          if (t < 1) raf = requestAnimationFrame(tick);
          else el.textContent = formatValue(endValue);
        };
        raf = requestAnimationFrame(tick);
      }, delay * 1000);

      endTimeout = window.setTimeout(() => onEnd?.(), delay * 1000 + duration * 1000);
    };

    // Server HTML already shows the final value (good for no-JS / SEO).
    // Reset to the start value only while the element is still off-screen.
    const rect = el.getBoundingClientRect();
    const visibleAtMount = rect.top < window.innerHeight && rect.bottom > 0;
    if (!visibleAtMount) el.textContent = formatValue(startValue);

    const observer = new IntersectionObserver(
      entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          run();
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
      window.clearTimeout(timeout);
      window.clearTimeout(endTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [to, from, direction, delay, duration, startWhen, formatValue]);

  return (
    <span className={className} ref={ref}>
      {formatValue(endValue)}
    </span>
  );
}
