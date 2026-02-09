'use client';

import { useEffect, useState } from 'react';

export default function ViewCounter() {
  const [viewCount, setViewCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('resumeViewCount');
    const count = stored ? parseInt(stored, 10) : 0;
    setViewCount(count + 1);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('resumeViewCount', viewCount.toString());
    }
  }, [viewCount, isLoading]);

  if (isLoading) return null;

  return (
    <div 
      className="no-print"
      style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        padding: '8px 12px',
        backgroundColor: '#f0f0f0',
        border: '1px solid #ddd',
        borderRadius: '5px',
        fontSize: '12px',
        color: '#666',
      }}
    >
      👁️ Views: {viewCount}
    </div>
  );
}
