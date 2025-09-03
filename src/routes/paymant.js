import { Router } from 'express';
import {PaymentControler} from '../controllers/paymant'

const route = Router();

route.post('/', PaymentControler.store);