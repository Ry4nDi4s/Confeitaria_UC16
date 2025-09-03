import 'dotenv/config'; 
import express from 'express';
import cors from 'cors';


import ingredienteRote from 'Routes/ingrediente';
import orderRote from 'Routes/order';
const app = express();
app.use(cors());
app.use(express.json);

app.use('/ingrediente', ingredienteRoutes)
app.use('/ingrediente')
app.use('/ingrediente', orderRoutes)
app.use('/order')
