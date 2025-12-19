
import { randomUUID } from "crypto";
import { Asset, AssetType } from "../models/asset";
import { AssetMocks } from "../mocks/assets";

let assets: Asset[] = AssetMocks;

export class AssetService {
  search(name?: string, type?: AssetType): Asset[] {
    let result = assets;

    if (type) {
      result = result.filter(asset => asset.type === type);
    }

    if (name) {
      const lowerName = name.toLowerCase();
      result = result.filter(asset => asset.name.toLowerCase().includes(lowerName));
    }

    return result;
  }

  getById(id: string): Asset {
    const asset = assets.find(asset => asset.id === id);
    if (!asset) {
      throw new Error("Asset not found");
    }
    return asset;
  }

  create(name: string, type: AssetType, latitude: number, longitude: number): Asset {
    const newAsset: Asset = {
      id: randomUUID(),
      name,
      type,
      latitude,
      longitude,
    };
    assets.push(newAsset);
    return newAsset;
  }

  update(id: string, name: string, type: AssetType, latitude: number, longitude: number): Asset {
    const assetIndex = assets.findIndex(asset => asset.id === id);
    
    if (assetIndex === -1) {
      throw new Error("Asset not found");
    }

    const updatedAsset: Asset = {
      id,
      name,
      type,
      latitude,
      longitude,
    };

    assets[assetIndex] = updatedAsset;
    return updatedAsset;
  }

  delete(id: string): void {
    const initialLength = assets.length;
    assets = assets.filter(asset => asset.id !== id);

    if (assets.length === initialLength) {
      throw new Error("Asset not found");
    }
  }
}