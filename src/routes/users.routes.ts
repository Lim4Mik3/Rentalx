import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '../config/upload'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

import { CreateUserController } from '../modules/accounts/UseCases/createUser/CreateUserController'
import { UpdateUserAvatarController } from '../modules/accounts/UseCases/updateUserAvatar/UpdateUserAvatarController';

const createUserController = new CreateUserController()
const updateUserAvatarController = new UpdateUserAvatarController()

const avatarUpload = multer(uploadConfig.upload('./tmp/avatar'))

const usersRoutes = Router();

usersRoutes.post('/', createUserController.handle)

usersRoutes.patch('/avatar', 
  ensureAuthenticated, 
  avatarUpload.single('avatar'), 
  updateUserAvatarController.handle
)


export { usersRoutes };