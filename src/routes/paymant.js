import { Router } from 'express';
import { PaymentControler } from '../controllers/paymant.js'

const route = Router();

route.post('/', PaymentControler.store);
route.get('/', PaymentControler.index);
route.get('/:id', PaymentControler.show);
route.delete('/:id', PaymentControler.delete);
route.put('/:id', PaymentControler.put);
route.put('/:id',PaymentControler.put);

export default route;

