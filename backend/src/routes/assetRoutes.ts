import { Router } from 'express';
import { AssetController } from '../controllers/assetController';

const router = Router();
const assetController = new AssetController();

// Rota única de busca
router.get('/assets', assetController.getAll.bind(assetController));

router.get('/assets/:id', assetController.getById.bind(assetController));
router.post('/assets', assetController.create.bind(assetController));
router.put('/assets/:id', assetController.update.bind(assetController));
router.delete('/assets/:id', assetController.delete.bind(assetController));

export { router };