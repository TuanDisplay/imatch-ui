import { useEffect, useState } from 'react';

export function useHasScrolledBeyond(threshold: number) {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > threshold;
      setHasScrolled((prev) => {
        // Chỉ update state nếu giá trị thay đổi để tránh rerender thừa
        if (prev !== scrolled) return scrolled;
        return prev;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return hasScrolled;
}
