import "dotenv/config";
import express from "express";
import cors from "cors";

import UserRoutes from './routes/user'

const app = express();
// cors seria uma liberação de quem pode chamar a variavel, por hora todo mundo pode chamar até que eu coloque alguma propriedade que possa chamar
app.use(cors())
app.use(express.json)

app.use("/users", UserRoutes)
import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import ProductRoutes from './routes/product';
import cartRoutes from './routes/cart';

const app = express();
app.use(cors())
app.use(express.json())

// Middleware de erro simples
app.use('/products', ProductRoutes);
app.use('/carts', cartRoutes);

app.use((err, _req, res, next) => {
    console.error(err);
    if (err.code === 'P2002'){
        return res.status(409).json({
            error: 'Registro duplicado (unique)'
        });
    }
    if (err.code === 'P2025'){
        return res.status(404).json({
            error: 'Registro não encontrado'
        });
    }
    res.status(500).json({ error: 'Erro interno' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`HTTP = > http://localhost:${PORT}`));
