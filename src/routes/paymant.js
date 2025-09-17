import { Router } from 'express';
import { PaymentControler } from '../controllers/paymant.js'

const route = Router();

route.post('/', PaymentControler.store);
route.get('/:id', PaymentControler.show);//new
route.get('/', PaymentControler.index);
export default route;

