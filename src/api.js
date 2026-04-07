import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { verificaToken } from "./middlewares/auth.js";
import UserRoutes from "./routes/user.js";
import ProductRoutes from "./routes/product.js";
import CategoryRoutes from "./routes/category.js";
import CartRoutes from "./routes/cart.js";
import OrderRoutes from "./routes/order.js";
import IngredienteRoutes from "./routes/Ingrediente.js";
import PaymentRoutes from "./routes/payment.js";
import ReceitaRoutes from "./routes/receita.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();
const allowedOrigins = [
  "http://localhost:4000",
  "https://confeitaria-uc16-app.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.options("/", cors());
app.use(express.json());
app.use("/static", express.static(path.join(__dirname, "../static")));

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Confeitaria",
      version: "1.0.0",
      description: "Documentação da API da Confeitaria",
    },
    servers: [
      {
        url:
          process.env.NODE_ENV === "production"
            ? "https://confeitaria-uc16.onrender.com"
            : "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (_req, res) => {
  res.json({ status: "API da Confeitaria online" });
});

app.use("/users", UserRoutes);
app.use("/products", ProductRoutes);
app.use("/categories", CategoryRoutes);
app.use("/carts", CartRoutes);
app.use("/orders", OrderRoutes);
app.use("/ingredientes", IngredienteRoutes);
app.use("/receitas", ReceitaRoutes);
app.use("/payments", /*verificaToken,*/ PaymentRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);

  if (err.code === "P2002") {
    return res.status(409).json({ error: "Registro duplicado" });
  }

  if (err.code === "P2003") {
    return res.status(400).json({ error: "Violação de chave estrangeira" });
  }

  if (err.code === "P2025") {
    return res.status(404).json({ error: "Registro não encontrado" });
  }

  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({ error: "CORS bloqueado" });
  }

  return res.status(500).json({ error: "Erro interno do servidor" });
});

if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(` API rodando em http://localhost:${PORT}`);
    console.log(` Swagger em http://localhost:${PORT}/api-docs`);
  });
}
