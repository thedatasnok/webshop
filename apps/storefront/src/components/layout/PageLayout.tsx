import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavigationBar from '../navigation/NavigationBar';
import Footer from './Footer';
import Header from './Header';

interface PageLayoutProps {
  excludeHeader?: boolean;
  children?: React.ReactNode;
}

/**
 * Shared page layout component, ensuring the existance of a header, footer and navigation bar for mobile.
 * It's meant to be opt-in as not every page will need it.
 */
const PageLayout: React.FC<PageLayoutProps> = ({ excludeHeader, children }) => {
  const location = useLocation();

  /**
   * Scrolls to the top of the page on render.
   * Avoids the issue of the scroll position being remembered when navigating between pages.
   */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <div className='overflow-auto px-2 pb-16 sm:px-4'>
        {!excludeHeader && <Header />}

        {children}

        <Footer />
      </div>

      <NavigationBar className='fixed bottom-0 sm:hidden' />
    </>
  );
};

export default PageLayout;
