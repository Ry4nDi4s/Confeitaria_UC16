import { Router } from 'express';
import { ProductController } from '../controllers/product.js';
import { verificaToken } from '../middlewares/auth.js';


const route = Router();

route.post('/', verificaToken, ProductController.store);
route.get('/', ProductController.index);
route.get('/:id', ProductController.show);
route.delete('/:id', verificaToken,ProductController.delete);
route.put('/:id', verificaToken,ProductController.update);


export default route ; 