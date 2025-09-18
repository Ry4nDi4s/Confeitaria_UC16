import { Router } from 'express';
import { ProductController } from '../controllers/product.js'

const route = Router();

route.post('/', ProductController.store);
route.get('/', ProductController.index);
route.get('/:id', ProductController.show);
route.delete('/:id', ProductController.delete);
route.put('/:id', ProductController.update);


export default route ; 