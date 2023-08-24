import express from 'express';
import { BuildingController } from './building.controller';

const router = express.Router();

router.get('/', BuildingController.insertIntoDB);

export const buildingRoutes = router;
