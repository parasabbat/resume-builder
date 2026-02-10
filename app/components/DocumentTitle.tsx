'use client';

import { useEffect } from 'react';

interface DocumentTitleProps {
  name: string;
  title: string;
}

export default function DocumentTitle({ name, title }: DocumentTitleProps) {
  useEffect(() => {
    document.title = `${name} - ${title}`;
    return () => {
      document.title = 'Resume';
    };
  }, [name, title]);

  return null;
}
