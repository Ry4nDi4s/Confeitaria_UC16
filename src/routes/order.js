import { Router } from 'express';
import { OrderController } from '../controllers/order.js';
import { verificaToken } from '../middlewares/auth.js';
import verificaRole from '../middlewares/roles.js';

const route = Router();

route.post('/', OrderController.store);
route.get('/', OrderController.index);
route.get('/:id', verificaToken, verificaRole, OrderController.show);
route.delete('/:id',verificaToken, verificaRole, OrderController.del);
route.put('/:id',verificaToken, verificaRole, OrderController.put)


export default route;