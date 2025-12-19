export type AssetType = 'POLE' | 'CTO' | 'EQUIPMENT';

export interface Asset {
  id: string;
  name: string;
  type: AssetType;
  latitude: number;
  longitude: number;
}