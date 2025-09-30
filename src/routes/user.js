import { Router } from "express";
import { UserControler } from "../controllers/user.js";
import { verificaToken } from "../middlewares/aunt.js";

const route = Router();

route.post('/', UserControler.store);
route.get('/', UserControler.index);
route.get('/:id', UserControler.show);
route.delete('/:id', verificaToken,UserControler.delete);
route.put('/:id', verificaToken,UserControler.put);
route.post('/aunt', UserControler.aunt)

export default route;