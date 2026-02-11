import { Suspense } from 'react';
import EditorContent from './EditorContent';

export default function EditorPage() {
  return (
    <Suspense fallback={<div style={{ padding: '40px', textAlign: 'center', color: '#596375' }}>Loading editor...</div>}>
      <EditorContent />
    </Suspense>
  );
}
