import { Router } from 'express';
import { ReceitaControler } from '../controllers/receita.js';
import { verificaToken } from '../middlewares/auth.js';
import verificaRole from '../middlewares/roles.js';

const route = Router();

route.post('/', verificaToken,  verificaRole('ReceitaPost'), ReceitaControler.store);
route.get('/', ReceitaControler.index);
route.get('/:id', ReceitaControler.show);
route.delete('/:id', verificaToken, verificaRole('ReceitaDelete'),ReceitaControler.delete);
route.put('/:id', verificaToken, verificaRole('ReceitaUpdate'),ReceitaControler.put);

export default route;