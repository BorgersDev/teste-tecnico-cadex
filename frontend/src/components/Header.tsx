import React from 'react';

interface HeaderProps {
  onNewAsset: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNewAsset }) => {
  return (
    <header className="bg-cadex-secondary text-white py-8 shadow-lg mb-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="text-cadex-primary">Cadex</span> Asset Manager
          </h1>
          <p className="text-gray-400 text-sm mt-1">Gestão inteligente de infraestrutura</p>
        </div>
        <button 
          onClick={onNewAsset}
          className="bg-cadex-primary hover:bg-[#00b395] text-cadex-secondary font-bold py-3 px-6 rounded-full shadow-lg flex items-center gap-2 transition-all hover:scale-105 hover:shadow-cadex-primary/30"
        >
          <span className="text-2xl leading-none pb-1">+</span> Novo Asset
        </button>
      </div>
    </header>
  );
};