'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  if (pathname?.startsWith('/share')) return null;

  const isHome = pathname === '/';
  const isEditor = pathname?.startsWith('/editor');
  const isPreview = pathname?.startsWith('/preview');

  return (
    <nav className="no-print" style={{
      display: 'flex',
      gap: '4px',
      padding: '10px 20px',
      borderBottom: '1px solid #e5e8ee',
      background: '#fafbfc',
      fontSize: '14px',
      alignItems: 'center',
    }}>
      <Link href="/" style={{
        padding: '6px 14px',
        borderRadius: '6px',
        textDecoration: 'none',
        color: isHome ? '#1a56db' : '#596375',
        background: isHome ? '#e8f0fe' : 'transparent',
        fontWeight: isHome ? 600 : 400,
        transition: 'all 0.15s',
      }}>
        My Resumes
      </Link>

      {(isEditor || isPreview) && (
        <>
          <span style={{ color: '#d1d5db', fontSize: '13px' }}>/</span>
          <span style={{
            padding: '6px 14px',
            borderRadius: '6px',
            color: '#1a56db',
            background: '#e8f0fe',
            fontWeight: 600,
            fontSize: '14px',
          }}>
            {isEditor ? 'Editor' : 'Preview'}
          </span>
        </>
      )}

      <span style={{
        marginLeft: 'auto',
        fontSize: '12px',
        color: '#16a34a',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
      }}>
        {'\u{1F512} Data stored locally'}
      </span>
    </nav>
  );
}