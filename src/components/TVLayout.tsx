import React from 'react';

type TVLayoutProps = {
  children: React.ReactNode;
};

const TVLayout: React.FC<TVLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen bg-slate-50 dark:bg-slate-900 aspect-video w-full">
      <header className="p-4 h-12 dark:text-slate-200 flex items-center gap-4">
        <span className="text-2xl font-bold">Norigin Media (TV)</span>
        <span>Use your keyboard to simulate a TV remote</span>
      </header>
      <main className="grow">{children}</main>
    </div>
  );
};

export default TVLayout;
