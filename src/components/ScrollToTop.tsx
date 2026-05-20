'use client';

import { useEffect } from 'react';

export default function ScrollToTop() {
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  return null;
}
