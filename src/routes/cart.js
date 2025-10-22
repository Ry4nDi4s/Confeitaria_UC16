import { Router } from 'express';
import { CartController } from '../controllers/cart.js';
import { verificaToken } from '../middlewares/auth.js';

const route = Router();

route.post('/', CartController.store);
route.get('/', CartController.index);
route.get('/:id', CartController.index);
route.delete('/:id', verificaToken, CartController.del);
route.put('/:id', CartController.update);

export default route;