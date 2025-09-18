import { Router } from "express";
import { UserControler } from "../controllers/user.js";

const route = Router();

route.post('/', UserControler.store);
route.get('/', UserControler.index);
route.get('/:id', UserControler.show);
route.delete('/:id', UserControler.delete);
route.put('/:id', UserControler.put);

export default route;