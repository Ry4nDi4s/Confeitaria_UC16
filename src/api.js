import "dotenv/config";
import express from "express";
import cors from "cors";
import { verificaToken } from "./middlewares/auth.js";
import UserRoutes from './routes/user.js';
import ProductRoutes from './routes/product.js';
import CartRoutes from './routes/cart.js';
import OrderRoutes from './routes/order.js';
import IngredienteRoutes from './routes/Ingrediente.js';
import PaymentRoutes from "./routes/paymant.js";
import ReceitaRoutes from "./routes/receita.js";
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';


const app = express();
app.use(cors());
app.use(express.json());

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'API Exemplo',
        version: '1.0.0',
        description: 'Documentação da API REST com Swagger',
      },
      servers: [
        {
          url: 'http://localhost:3000',
        },
      ],
    },
    apis: ['./src/routes/*.js'], // caminho dos arquivos com os comentários Swagger
  };
  
  const swaggerSpec = swaggerJSDoc(options);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/users", UserRoutes);
app.use('/products', ProductRoutes);
app.use('/carts', CartRoutes); 
app.use('/orders', OrderRoutes);
app.use('/ingredientes', IngredienteRoutes);
app.use('/payments', verificaToken,PaymentRoutes);
app.use('/receitas', ReceitaRoutes);

// Middleware de erro simples
app.use((err, _req, res, _next) => {
    console.error(err);
    if (err.code === 'P2002'){
        return res.status(409).json({
            error: 'Registro duplicado (unique)'
        });
    }
    if (err.code === 'P2003'){
        return res.status(404).json({
            error: 'A chave estrangeira não pode ser excluida'
        });
    }
    if (err.code === 'P2025'){
        return res.status(404).json({
            error: 'Registro não encontrado'
        });
    }
    res.status(500).json({ error: 'Erro interno' });
});

app.use(cors({
    origin: ['https://confeitaria-uc16-app.vercel.app/', 'http://localhost:4000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));  

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`HTTP = > http://localhost:${PORT}`));