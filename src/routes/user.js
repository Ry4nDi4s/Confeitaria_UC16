import { Router } from "express";
import { UserControler } from "../controllers/user.js";
import { verificaToken } from "../middlewares/auth.js";
import verificaRole from "../middlewares/roles.js";

const route = Router();

route.post('/', verificaRole('UserDelete'),UserControler.store);
route.get('/', UserControler.index);
route.get('/:id',UserControler.show);
route.delete('/:id', verificaToken, verificaRole('UserDelete'),UserControler.delete);
route.put('/:id', verificaToken, verificaRole('UserUpdate'),UserControler.put);
route.post('/aunt', UserControler.aunt)

export default route;