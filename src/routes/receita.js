import { Router } from 'express';
import { ReceitaControler } from '../controllers/receita.js';

const route = Router();

route.post('/', ReceitaControler.store);
route.get('/:id', ReceitaControler.show);
route.get('/', ReceitaControler.index);

export default route;