import axios from 'axios';

export type AssetType = 'POLE' | 'CTO' | 'EQUIPMENT';

export interface Asset {
  id?: string;
  name: string;
  type: AssetType;
  latitude: number;
  longitude: number;
}

const api = axios.create({
  baseURL: 'http://localhost:3001', 
});

export const assetService = {
  // Função única que aceita filtros opcionais
  // (Refatorei porque funcionou melhor para o uso com filtros e pesquisa por nome)
  getAll: async (filters?: { name?: string; type?: AssetType | '' }) => {
    const params = new URLSearchParams();
    
    if (filters?.name) params.append('name', filters.name);
    if (filters?.type) params.append('type', filters.type);

    const response = await api.get<Asset[]>(`/assets?${params.toString()}`);
    return response.data;
  },

  create: async (asset: Omit<Asset, 'id'>) => {
    const response = await api.post<Asset>('/assets', asset);
    return response.data;
  },

  update: async (id: string, asset: Omit<Asset, 'id'>) => {
    const response = await api.put<Asset>(`/assets/${id}`, asset);
    return response.data;
  },

  delete: async (id: string) => {
    await api.delete(`/assets/${id}`);
  }
};