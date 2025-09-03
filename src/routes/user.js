import { Router } from "express";
import { UserControler } from "../controllers/user";

const route = Router();

route.post('/', UserControler.store);

export default route;