import { Router } from 'express';
import { PaymentControler } from '../controllers/paymant.js'

const route = Router();

route.post('/', PaymentControler.store);

export default route;