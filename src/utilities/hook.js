import { useEffect, useState } from 'react';

export const useWindowResizeMobile = inerWidth => {
  const widthMobile = inerWidth || 1070;
  const [isMobile, setIsMobile] = useState(window.innerWidth < widthMobile);

  useEffect(() => {
    const windowResizeListener = window.addEventListener('resize', () => {
      setIsMobile(window.innerWidth < widthMobile);
    });

    return () => window.removeEventListener('resize', windowResizeListener);
  }, [widthMobile]);

  return [isMobile];
};
