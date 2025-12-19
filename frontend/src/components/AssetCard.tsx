import React from 'react';
import { type Asset } from '../services/api';

interface AssetCardProps {
  asset: Asset;
  onEdit: (asset: Asset) => void;
  onDelete: (id: string) => void;
}

export const AssetCard: React.FC<AssetCardProps> = ({ asset, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
      <div className="flex justify-between items-start mb-4">
        <div className={`
          w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold text-white shadow-md
          ${asset.type === 'POLE' ? 'bg-blue-500' : asset.type === 'CTO' ? 'bg-cadex-primary' : 'bg-cadex-secondary'}
        `}>
          {asset.type[0]}
        </div>
        <span className={`
          text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider
          ${asset.type === 'POLE' ? 'bg-blue-50 text-blue-600' : asset.type === 'CTO' ? 'bg-teal-50 text-teal-600' : 'bg-gray-100 text-gray-600'}
        `}>
          {asset.type}
        </span>
      </div>
      
      <h3 className="text-lg font-bold text-cadex-text mb-2 group-hover:text-cadex-primary transition-colors truncate" title={asset.name}>
        {asset.name}
      </h3>
      
      <div className="text-sm text-gray-500 mb-6 space-y-1">
        <p className="flex items-center gap-2">
          <span className="w-4 text-center">📍</span> {asset.latitude.toFixed(6)}
        </p>
        <p className="flex items-center gap-2">
          <span className="w-4 text-center">🌐</span> {asset.longitude.toFixed(6)}
        </p>
      </div>

      <div className="flex gap-3 pt-4 border-t border-gray-50">
        <button 
          onClick={() => onEdit(asset)}
          className="flex-1 py-2 px-4 rounded-lg border border-gray-200 text-gray-600 font-medium hover:bg-cadex-secondary hover:text-white hover:border-cadex-secondary transition-all text-sm"
        >
          Editar
        </button>
        <button 
          onClick={() => onDelete(asset.id!)}
          className="py-2 px-4 rounded-lg border border-red-100 text-red-500 font-medium hover:bg-red-500 hover:text-white transition-all text-sm"
        >
          Excluir
        </button>
      </div>
    </div>
  );
};