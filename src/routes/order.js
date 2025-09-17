import { Router } from 'express';
import { OrderController } from '../controllers/order.js';

const route = Router();

route.post('/', OrderController.store);
route.get('/', OrderController.index);
route.get('/:id', OrderController.show);


export default route;