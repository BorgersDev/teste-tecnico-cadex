import { Request, Response } from "express";
import { AssetService } from "../services/assetService";
import { AssetType } from "../models/asset";

const assetService = new AssetService();

export class AssetController {
  
  private validateAssetData(name: any, type: any, latitude: any, longitude: any): string | null {
    if (!name || typeof name !== 'string' || name.length < 3) {
      return 'O nome é obrigatório e deve ser maior que 3 caracteres';
    }

    const validTypes: AssetType[] = ['POLE', 'CTO', 'EQUIPMENT'];
    if (!type || !validTypes.includes(type)) {
      return 'Tipo de Asset inválido. Deve ser POLE, CTO ou EQUIPMENT';
    }

    if (typeof latitude !== 'number' || latitude < -90 || latitude > 90) {
      return 'Latitude deve ser um número entre -90 e 90';
    }

    if (typeof longitude !== 'number' || longitude < -180 || longitude > 180) {
      return 'Longitude deve ser um número entre -180 e 180';
    }

    return null;
  }

  getAll(req: Request, res: Response) {
    const { name, type } = req.query;
    
    if (type && !['POLE', 'CTO', 'EQUIPMENT'].includes(type as string)) {
       return res.status(400).json({ error: 'Tipo inválido no filtro' });
    }

    const assets = assetService.search(name as string, type as AssetType);
    return res.status(200).json(assets);
  }

  getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const asset = assetService.getById(id);
      return res.status(200).json(asset);
    } catch (error) {
      return res.status(404).json({ error: 'Asset não encontrado' });
    }
  }

  create(req: Request, res: Response) {
    const { name, type, latitude, longitude } = req.body;
    const error = this.validateAssetData(name, type, latitude, longitude);
    if (error) return res.status(400).json({ error });

    const newAsset = assetService.create(name, type, latitude, longitude);
    return res.status(201).json(newAsset);
  }

  update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, type, latitude, longitude } = req.body;
      const error = this.validateAssetData(name, type, latitude, longitude);
      if (error) return res.status(400).json({ error });

      const updatedAsset = assetService.update(id, name, type, latitude, longitude);
      return res.status(200).json(updatedAsset);
    } catch (error) {
      return res.status(404).json({ error: 'Asset não encontrado para atualização' });
    }
  }

  delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      assetService.delete(id);
      return res.status(204).send();
    } catch (error) {
      return res.status(404).json({ error: 'Asset não encontrado para exclusão' });
    }
  }
}