import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BuildingValidations } from '../building/building.validations';
import { RoomController } from './room.controller';
import { RoomValidation } from './room.valiations';

const router = express.Router();

router.post(
  '/',
  validateRequest(BuildingValidations.create),
  //  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  RoomController.insertIntoDB
);
router.patch(
  '/:id',
  validateRequest(RoomValidation.update),
  //auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  RoomController.updateOneInDB
);

router.delete(
  '/:id',
  //auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  RoomController.deleteByIdFromDB
);

export const roomRoutes = router;
