import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  
  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        setTimeout(() => {
          // If we're linking to a specific service card from another page,
          // scroll to the top of the page so we don't skip the beautiful hero banner.
          // The service card itself is already highlighted/isolated for 5 seconds.
          if (element.classList.contains('service-card')) {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            return;
          }
          
          // For normal anchors, scroll to them with an offset for the navbar
          const yCoordinate = element.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({ top: yCoordinate - 100, behavior: 'smooth' });
        }, 100);
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [pathname, hash]);
  
  return null;
}