import { Router } from 'express';
import { ProductController } from '../controllers/product.js';
import { verificaToken } from '../middlewares/auth.js';
import verificaRole from '../middlewares/roles.js';

const route = Router();
route.post('/',verificaToken, verificaRole('PostProduct'), ProductController.store);
route.get('/', ProductController.index);
route.get('/:id', ProductController.show);
route.delete('/:id', verificaToken, verificaRole('ProductDelete'),ProductController.delete);
route.put('/:id', verificaToken, verificaRole('ProductUpdate'), ProductController.update);

export default route;