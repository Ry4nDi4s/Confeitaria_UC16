import { Router } from 'express';
import { IngredienteController } from '../controllers/ingrediente.js'

const route = Router();

route.post('/', IngredienteController.store);
route.get('/', IngredienteController.index);


export default route;