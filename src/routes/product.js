import { Router } from 'express';
import { ProductController } from '../controllers/product.js'

const route = Router();

route.post(`/`, ProductController.store); 
route.get('/')

export default route;