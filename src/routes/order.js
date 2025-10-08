import { Router } from 'express';
import { OrderController } from '../controllers/order.js';
import { verificaToken } from '../middlewares/auth.js';
import verificaRole from '../middlewares/roles.js';

const route = Router();

route.post('/', OrderController.store);
route.get('/', OrderController.index);
route.get('/:id', verificaToken, OrderController.show);
route.delete('/:id',verificaToken, verificaRole('OrderDelete'), OrderController.del);
route.put('/:id',verificaToken, verificaRole('OrderUpdate'), OrderController.put)

export default route;