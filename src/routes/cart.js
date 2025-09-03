import { Router } from 'express';
import { CartController } from '../controllers/cart'

const route = Router();

route.post(`/`, CartController.store);

export default route;