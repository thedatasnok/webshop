import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavigationBar from '../navigation/NavigationBar';
import Footer from './Footer';
import Header from './Header';
import clsx from 'clsx';

interface PageLayoutProps {
  /**
   * The children element(s) to render inside the main element of the page layout.
   */
  children?: React.ReactNode;
  /**
   * The class names to apply to the main element, which is the parent element of the children.
   */
  className?: string;
}

/**
 * Shared page layout component, ensuring the existance of a header, footer and navigation bar for mobile.
 * It's meant to be opt-in as not every page will need/want this layout.
 */
const PageLayout: React.FC<PageLayoutProps> = ({ children, className }) => {
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
      <div className='flex min-h-screen flex-col overflow-y-auto px-2 pb-20 sm:px-4 sm:pb-8'>
        <Header />

        <main className={clsx('flex-1', className)}>{children}</main>

        <Footer />
      </div>

      <NavigationBar className='fixed bottom-0 sm:hidden' />
    </>
  );
};

export default PageLayout;
