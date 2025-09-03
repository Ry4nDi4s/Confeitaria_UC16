import {Router} from 'express';

import {OrderController} from '../controllers/order'

const route = Router ();

route.post('/', OrderController.store);