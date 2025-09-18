import { Router } from 'express';
import { CartController } from '../controllers/cart.js'

const route = Router();

route.post('/', CartController.store);
route.get('/', CartController.index);
route.get('/:id', CartController.index);
route.delete('/', CartController.del);

export default route;