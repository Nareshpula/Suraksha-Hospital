import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import StickyButtons from '../components/common/StickyButtons';
import LoadingOverlay from '../components/language/LoadingOverlay';
import { useTranslation } from '../components/language/LanguageContext';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { isLoading } = useTranslation();

  return (
    <>
      <LoadingOverlay isVisible={isLoading} />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <StickyButtons />
      </div>
    </>
  );
};

export default MainLayout;