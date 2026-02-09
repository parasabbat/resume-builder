'use client';

import { useEffect } from 'react';

export default function KeyboardShortcuts() {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'p') {
        event.preventDefault();
        window.print();
      }
      
      // Arrow Up to scroll to top
      if (event.key === 'ArrowUp') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div 
      className="no-print"
      style={{
        position: 'fixed',
        bottom: '60px',
        right: '20px',
        padding: '10px',
        backgroundColor: '#f9f9f9',
        border: '1px solid #ddd',
        borderRadius: '5px',
        fontSize: '11px',
        color: '#666',
      }}
    >
      <div><strong>Keyboard Shortcuts:</strong></div>
      <div>Ctrl/Cmd + P: Print</div>
      <div>↑ Arrow: Scroll to top</div>
    </div>
  );
}
