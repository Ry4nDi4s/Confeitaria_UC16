import { Router } from 'express';
import { ProductController } from '../controllers/product.js'

const route = Router();

route.post('/', ProductController.store);
route.get('/', ProductController.index);
route.get('/:id', ProductController.show);
route.delete('/:id', ProductController.del);
route.put('/:id', ProductController.put);

export default route ; 