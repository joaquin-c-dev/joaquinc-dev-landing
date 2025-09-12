import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface BannerContextType {
  isBannerVisible: boolean;
  isBannerDismissed: boolean;
  dismissBanner: () => void;
  setBannerVisible: (visible: boolean) => void;
}

const BannerContext = createContext<BannerContextType | undefined>(undefined);

export const useBanner = () => {
  const context = useContext(BannerContext);
  if (context === undefined) {
    throw new Error('useBanner must be used within a BannerProvider');
  }
  return context;
};

interface BannerProviderProps {
  children: ReactNode;
}

export const BannerProvider = ({ children }: BannerProviderProps) => {
  const [isBannerDismissed, setIsBannerDismissed] = useState(false);
  const [isBannerVisible, setIsBannerVisible] = useState(true);

  useEffect(() => {
    // Check localStorage for dismissed state on mount
    const dismissed = localStorage.getItem('banner-dismissed') === 'true';
    setIsBannerDismissed(dismissed);
  }, []);

  const dismissBanner = () => {
    setIsBannerDismissed(true);
    localStorage.setItem('banner-dismissed', 'true');
  };

  const setBannerVisible = (visible: boolean) => {
    setIsBannerVisible(visible);
  };

  const contextValue = {
    isBannerVisible: isBannerVisible && !isBannerDismissed,
    isBannerDismissed,
    dismissBanner,
    setBannerVisible,
  };

  return (
    <BannerContext.Provider value={contextValue}>
      {children}
    </BannerContext.Provider>
  );
};