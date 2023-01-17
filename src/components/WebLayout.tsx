import React from 'react';

type WebLayoutProps = {
  children: React.ReactNode;
};

const WebLayout: React.FC<WebLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen dark:bg-slate-900 bg-slate-50">
      <header className="text-2xl font-bold h-12 dark:text-slate-200 text-slate-900 flex justify-center items-center">
        Norigin Media (web)
      </header>
      <main className="grow">{children}</main>
      <footer className="text-center h-12 dark:text-slate-200 text-slate-900">
        Footer
      </footer>
    </div>
  );
};

export default WebLayout;
