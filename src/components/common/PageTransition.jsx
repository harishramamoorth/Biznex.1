import { useLocation } from 'react-router-dom';
import './PageTransition.css';

/**
 * Wraps children in an animated container that re-mounts (and re-animates)
 * every time the route pathname changes, giving a smooth fade-up transition.
 */
export default function PageTransition({ children }) {
  
  const { pathname } = useLocation();

  return (
    <div key={pathname} className="page-transition-wrapper">
      {children}
    </div>
  );
}
