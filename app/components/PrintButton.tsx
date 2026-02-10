'use client';

import { useState } from 'react';

export default function PrintButton() {
  const [isPrinting, setIsPrinting] = useState(false);

  const handlePrint = () => {
    setIsPrinting(true);
    window.print();
    setTimeout(() => {
      setIsPrinting(false);
    }, 1000);
  };

  return (
    <button 
      className="print-btn no-print" 
      onClick={handlePrint}
      disabled={isPrinting}
    >
      {isPrinting ? '🖨️ Printing...' : '🖨️ Print / Save PDF'}
    </button>
  );
}
