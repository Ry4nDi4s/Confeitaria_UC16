import { Router } from 'express';
import { IngredienteController } from '../controllers/ingrediente.js'

const route = Router();

route.post('/', IngredienteController.store);
route.get('/:id', IngredienteController.show);
route.get('/', IngredienteController.index);
route.delete('/:id',IngredienteController.del);
route.put('/:id',IngredienteController.put)



export default route;