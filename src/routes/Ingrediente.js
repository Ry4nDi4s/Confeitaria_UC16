import {Router} from 'express';

import {IngredienteController} from '../controllers/ingrediente.js'

const route = Router ();

route.post('/', IngredienteController.store); 
export default route;