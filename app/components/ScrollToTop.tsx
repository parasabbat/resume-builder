'use client';

import { useEffect, useState } from 'react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Don't render if not visible
  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="no-print"
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        padding: '10px 15px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        zIndex: 1000,
      }}
    >
      ↑ Top
    </button>
  );
}
