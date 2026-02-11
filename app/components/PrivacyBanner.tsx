'use client';

import { useState, useEffect } from 'react';

export default function PrivacyBanner() {
  const [isDismissed, setIsDismissed] = useState(true);

  useEffect(() => {
    const dismissed = localStorage.getItem('privacy_banner_dismissed');
    if (!dismissed) setIsDismissed(false);
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem('privacy_banner_dismissed', 'true');
  };

  if (isDismissed) return null;

  return (
    <div
      className="no-print"
      style={{
        background: '#f0fdf4',
        borderBottom: '1px solid #bbf7d0',
        padding: '10px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '13px',
        color: '#166534',
      }}
    >
      <span>
        {'\u{1F512} '}<strong>100% Private</strong>{' \u2014 Your data never leaves your browser. No server, no database, no tracking.'}
      </span>
      <button
        onClick={handleDismiss}
        style={{ background: 'none', border: 'none', color: '#166534', cursor: 'pointer', fontSize: '18px', padding: '0 0 0 12px' }}
        aria-label="Dismiss privacy banner"
      >
        {'\u2715'}
      </button>
    </div>
  );
}