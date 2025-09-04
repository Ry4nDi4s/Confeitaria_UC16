import { Router } from "express";
import { UserControler } from "../controllers/user.js";

const route = Router();

route.post('/', UserControler.store);

export default route;