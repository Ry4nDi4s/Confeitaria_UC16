import { Router } from 'express';
import { ReceitaControler } from '../controllers/receita.js';
import { verificaToken } from '../middlewares/aunt.js';

const route = Router();

route.post('/', verificaToken,ReceitaControler.store);
route.get('/', ReceitaControler.index);
route.get('/:id', ReceitaControler.show);
route.delete('/:id', verificaToken,ReceitaControler.delete);
route.put('/:id', verificaToken,ReceitaControler.put);

export default route;