import { Router } from 'express';
import { OrderController } from '../controllers/order.js';

const route = Router();

route.post('/', OrderController.store);
route.get('/:id', OrderController.show);
route.get('/', OrderController.index);


export default route;