'use client';

import { useState } from 'react';

interface CopyToClipboardProps {
  text: string;
  label: string;
}

export default function CopyToClipboard({ text, label }: CopyToClipboardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="no-print"
      style={{
        marginLeft: '8px',
        padding: '4px 8px',
        fontSize: '11px',
        cursor: 'pointer',
        border: '1px solid #ccc',
        borderRadius: '3px',
        backgroundColor: copied ? '#4CAF50' : '#f9f9f9',
        color: copied ? 'white' : '#333',
        transition: 'all 0.2s',
      }}
    >
      {copied ? '✓ Copied!' : `Copy ${label}`}
    </button>
  );
}
