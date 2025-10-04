'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { cn } from './utils';

type Viewport = 'desktop' | 'tablet' | 'mobile';

interface ViewportContextType {
  viewport: Viewport;
  setViewport: (viewport: Viewport) => void;
}

const ViewportContext = createContext<ViewportContextType | undefined>(undefined);

const viewportConfig = {
    desktop: { width: '100%', height: '100%' },
    tablet: { width: '768px', height: '1024px' },
    mobile: { width: '375px', height: '667px' },
}

export const ViewportProvider = ({ children }: { children: ReactNode }) => {
  const [viewport, setViewport] = useState<Viewport>('desktop');
  
  const viewportStyle = {
      width: viewportConfig[viewport].width,
      height: viewportConfig[viewport].height,
      margin: viewport === 'desktop' ? '0' : '2rem auto',
      boxShadow: viewport === 'desktop' ? 'none' : '0 0 20px rgba(0,0,0,0.1)',
      transition: 'width 0.3s ease-in-out, height 0.3s ease-in-out',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
  };

  return (
    <ViewportContext.Provider value={{ viewport, setViewport }}>
      <div style={viewportStyle}>
        {children}
      </div>
    </ViewportContext.Provider>
  );
};

export const useViewport = (): ViewportContextType => {
  const context = useContext(ViewportContext);
  if (context === undefined) {
    throw new Error('useViewport must be used within a ViewportProvider');
  }
  return context;
};
