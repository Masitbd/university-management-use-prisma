import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { SemesterRegistrationController } from './semesterRegistratiion.controller';
import { SemesterRegistrationValidation } from './semesterRegistratiion.validations';

const router = express.Router();

router.post('/', SemesterRegistrationController.insertIntoDB);

router.patch(
  '/:id',
  validateRequest(SemesterRegistrationValidation.update),
  //auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  SemesterRegistrationController.updateOneInDB
);

export const SemesterRegistrationRoutes = router;
