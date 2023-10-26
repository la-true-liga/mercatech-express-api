import { Router } from 'express';

import { itemController } from '../controllers/item.controller';

const router: Router = Router();

router.post('/', itemController.createItem);
router.get('/', itemController.getItems);
router.get('/:id', itemController.getItemById);
router.put('/:id', itemController.updateItem);
router.delete('/:id', itemController.deleteItem);

export default router;
