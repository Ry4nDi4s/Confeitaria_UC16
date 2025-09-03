import {Router} from 'express';

import {IngredienteController} from '../controllers/ingrediente'

const route = Router ();

route.post('/', IngredienteController.store);