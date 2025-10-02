import { Router } from 'express';
import { PaymentControler } from '../controllers/paymant.js'
import { verificaToken } from '../middlewares/aunt.js';

const route = Router();

route.post('/',verificaToken, PaymentControler.store);
route.get('/',verificaToken, PaymentControler.index);
route.get('/:id',verificaToken, PaymentControler.show);
route.delete('/:id',verificaToken, PaymentControler.delete);
route.put('/:id',verificaToken, PaymentControler.put);
route.put('/:id', verificaToken,PaymentControler.put);

export default route;

