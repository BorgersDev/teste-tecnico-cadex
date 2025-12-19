import { useEffect, useState, type FormEvent } from 'react';
import { assetService, type Asset, type AssetType } from './services/api';
import { Modal } from './components/Modal';
import { ToastContainer } from './components/Toast';
import { Header } from './components/Header';
import { AssetCard } from './components/AssetCard';
import { useToast } from './hooks/useToast';
import './App.css';

function App() {
  // Dados
  const [assets, setAssets] = useState<Asset[]>([]);
  const [filterType, setFilterType] = useState<AssetType | ''>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  // UI
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Asset, 'id'>>({
    name: '',
    type: 'POLE',
    latitude: 0,
    longitude: 0
  });

  const { toasts, showToast, removeToast } = useToast();

  const loadAssets = async () => {
    try {
      setError(null);
      const data = await assetService.getAll({ name: searchTerm, type: filterType });
      setAssets(data);
    } catch (err: any) {
      console.error("Erro ao carregar assets", err);
      if (err.code === "ERR_NETWORK") {
        setError("Não foi possível conectar ao Backend. Verifique se ele está rodando na porta 3001.");
      } else {
        setError("Erro ao carregar dados.");
      }
      setAssets([]);
    }
  };

  useEffect(() => {
    loadAssets();
  }, [filterType, searchTerm]);

  // Modal
  const openNewAssetModal = () => {
    setEditingId(null);
    setFormData({ name: '', type: 'POLE', latitude: 0, longitude: 0 });
    setIsModalOpen(true);
  };

  const openEditAssetModal = (asset: Asset) => {
    setEditingId(asset.id!);
    setFormData({
      name: asset.name,
      type: asset.type,
      latitude: asset.latitude,
      longitude: asset.longitude
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  // Ações
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await assetService.update(editingId, formData);
        showToast('Asset atualizado com sucesso!');
      } else {
        await assetService.create(formData);
        showToast('Asset criado com sucesso!');
      }
      closeModal();
      loadAssets();
    } catch (error) {
      showToast('Erro ao salvar asset.', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir?')) {
      try {
        await assetService.delete(id);
        showToast('Asset excluído com sucesso!');
        loadAssets();
      } catch (error) {
        showToast('Erro ao excluir asset.', 'error');
      }
    }
  };

  return (
    <div className="min-h-screen bg-cadex-bg font-sans">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      <Header onNewAsset={openNewAssetModal} />

      <main className="max-w-6xl mx-auto px-6 pb-12">
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-r shadow-sm mb-8" role="alert">
            <p className="font-bold">Erro de Conexão</p>
            <p>{error}</p>
          </div>
        )}

        {/* Filtros */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 w-full relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
            <input 
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cadex-primary focus:border-transparent outline-none transition-all text-gray-700 placeholder-gray-400"
              type="text" 
              placeholder="Buscar assets por nome..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="w-full md:w-64 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cadex-primary focus:border-transparent outline-none transition-all text-gray-700 cursor-pointer"
            value={filterType} 
            onChange={(e) => setFilterType(e.target.value as AssetType | '')}
          >
            <option value="">Todos os Tipos</option>
            <option value="POLE">Poste (POLE)</option>
            <option value="CTO">Caixa (CTO)</option>
            <option value="EQUIPMENT">Equipamento</option>
          </select>
        </div>

        {/* Grid dos assets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assets.map(asset => (
            <AssetCard 
              key={asset.id} 
              asset={asset} 
              onEdit={openEditAssetModal} 
              onDelete={handleDelete} 
            />
          ))}
        </div>
          
        {assets.length === 0 && !error && (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
            <div className="text-6xl mb-4 opacity-20">📡</div>
            <h3 className="text-xl font-bold text-gray-400">Nenhum asset encontrado</h3>
            <p className="text-gray-400 mt-2">Tente ajustar os filtros ou crie um novo asset.</p>
          </div>
        )}
      </main>

      {/* Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        title={editingId ? 'Editar Asset' : 'Novo Asset'}
      >
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-cadex-text mb-2">Nome do Asset</label>
            <input
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cadex-primary focus:border-transparent outline-none transition-all"
              type="text"
              placeholder="Ex: Poste Central 01"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              required
              minLength={3}
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-cadex-text mb-2">Tipo de Equipamento</label>
            <div className="grid grid-cols-3 gap-3">
              {['POLE', 'CTO', 'EQUIPMENT'].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFormData({...formData, type: type as AssetType})}
                  className={`
                    py-3 px-2 rounded-xl text-sm font-bold border-2 transition-all
                    ${formData.type === type 
                      ? 'border-cadex-primary bg-cadex-primary/10 text-cadex-text' 
                      : 'border-gray-100 bg-white text-gray-400 hover:border-gray-200'}
                  `}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="md:col-span-1">
            <label className="block text-sm font-bold text-cadex-text mb-2">Latitude</label>
            <input
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cadex-primary focus:border-transparent outline-none transition-all"
              type="number"
              placeholder="-23.550520"
              value={formData.latitude}
              onChange={e => setFormData({...formData, latitude: parseFloat(e.target.value)})}
              step="any"
              required
            />
          </div>

          <div className="md:col-span-1">
            <label className="block text-sm font-bold text-cadex-text mb-2">Longitude</label>
            <input
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cadex-primary focus:border-transparent outline-none transition-all"
              type="number"
              placeholder="-46.633308"
              value={formData.longitude}
              onChange={e => setFormData({...formData, longitude: parseFloat(e.target.value)})}
              step="any"
              required
            />
          </div>

          <div className="md:col-span-2 flex gap-4 mt-6 pt-6 border-t border-gray-100">
            <button 
              type="button" 
              onClick={closeModal}
              className="flex-1 py-3 px-6 rounded-xl border border-gray-200 text-gray-600 font-bold hover:bg-gray-50 transition-all"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="flex-1 py-3 px-6 rounded-xl bg-cadex-primary text-cadex-secondary font-bold hover:bg-[#00b395] shadow-lg hover:shadow-cadex-primary/30 transition-all transform hover:-translate-y-0.5"
            >
              {editingId ? 'Salvar Alterações' : 'Criar Asset'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default App;