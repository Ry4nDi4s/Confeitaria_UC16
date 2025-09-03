import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors())
app.use(express.json)

import UserRoutes from './routes/user'
import ProductRoutes from './routes/product';
import CartRoutes from './routes/cart';
import OrderRoutes  from '.routes/order';
import IngredienteRoutes from './routes/ingrediente';

// Middleware de erro simples
app.use("/users", UserRoutes)
app.use('/products', ProductRoutes);
app.use('/carts', CartRoutes); 
app.use ('/orders',OrderRoutes)
app.use ('/ingrediente',IngredienteRoutes)

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
