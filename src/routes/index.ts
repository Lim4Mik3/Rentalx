import { Router } from 'express'

import { authenticateRoutes } from './authenticate.routes';
import { CategoriesRoutes } from './categories.routes';
import { specificationsRoutes } from './specifications.routes';
import { usersRoutes } from './users.routes';

const router = Router();

router.use('/categories', CategoriesRoutes)
router.use('/specifications', specificationsRoutes)
router.use('/users', usersRoutes)
router.use(authenticateRoutes)

export { router }