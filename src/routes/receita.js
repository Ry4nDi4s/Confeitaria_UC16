import { Router } from 'express';
import {ReceitaControler} from '../controllers/receita.js';

const route = Router();

route.post('/', ReceitaControler.store);

export default route;