import { Router } from 'express';
import { OrderController } from '../controllers/order.js';
import { verificaToken } from '../middlewares/aunt.js';

const route = Router();

route.post('/', OrderController.store);
route.get('/', OrderController.index);
route.get('/:id', verificaToken,OrderController.show);
route.delete('/:id',verificaToken,OrderController.del);
route.put('/:id',verificaToken,OrderController.put)


export default route;