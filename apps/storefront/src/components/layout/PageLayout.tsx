import NavigationBar from '../navigation/NavigationBar';
import Footer from './Footer';
import Header from './Header';

interface PageLayoutProps {
  children?: React.ReactNode;
}

/**
 * Shared page layout component, ensuring the existance of a header, footer and navigation bar for mobile.
 * It's meant to be opt-in as not every page will need it.
 */
const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <>
      <div className='overflow-auto px-2 sm:px-4'>
        <Header />

        {children}

        <Footer />
      </div>

      <NavigationBar className='fixed bottom-0 sm:hidden' />
    </>
  );
};

export default PageLayout;
