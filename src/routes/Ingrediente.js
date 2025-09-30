import { Router } from 'express';
import { IngredienteController } from '../controllers/ingrediente.js'
import { verificaToken } from '../middlewares/aunt.js';

const route = Router();

route.post('/', verificaToken,IngredienteController.store);
route.get('/', IngredienteController.index);
route.get('/:id', IngredienteController.show);
route.delete('/:id', verificaToken,IngredienteController.del);
route.put('/:id', verificaToken,IngredienteController.put)

export default route;