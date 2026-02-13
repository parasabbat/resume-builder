import { Suspense } from 'react';
import ShareContent from './ShareContent';

export default function SharePage() {
  return (
    <Suspense fallback={<div style={{ padding: '40px', textAlign: 'center', color: '#596375' }}>Loading shared resume...</div>}>
      <ShareContent />
    </Suspense>
  );
}
