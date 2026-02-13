
import { Suspense } from 'react';
import PreviewContent from './PreviewContent';

export default function PreviewPage() {
  return (
    <Suspense fallback={<div style={{ padding: '40px', textAlign: 'center', color: '#596375' }}>Loading preview...</div>}>
      <PreviewContent />
    </Suspense>
  );
}

