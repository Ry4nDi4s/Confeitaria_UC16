import { Router } from 'express';
import { IngredienteController } from '../controllers/ingrediente.js'
import { verificaToken } from '../middlewares/auth.js';
import verificaRole from '../middlewares/roles.js';

const route = Router();

route.post('/', verificaToken, verificaRole('IngredientePost'), IngredienteController.store);
route.get('/', IngredienteController.index);
route.get('/:id', IngredienteController.show);
route.delete('/:id', verificaToken, verificaRole('IngredienteDelete'), IngredienteController.del);
route.put('/:id', verificaToken, verificaRole('IngredienteUpdate'), IngredienteController.put)

export default route;