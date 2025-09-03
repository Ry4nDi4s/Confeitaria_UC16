import { Router } from 'express';
import {ReceitaControler} from '../controllers/receita';

const route = Router();

route.post('/', ReceitaControler.store);