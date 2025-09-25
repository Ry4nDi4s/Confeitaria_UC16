import { Router } from 'express';
import { ReceitaControler } from '../controllers/receita.js';

const route = Router();

route.post('/', ReceitaControler.store);
route.get('/', ReceitaControler.index);
route.get('/:id', ReceitaControler.show);
route.delete('/:id', ReceitaControler.delete);
route.put('/:id', ReceitaControler.put);

export default route;