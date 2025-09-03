import "dotenv/config";
import express from "express";
import cors from "cors";

import UserRoutes from './routes/user'

const app = express();
// cors seria uma liberação de quem pode chamar a variavel, por hora todo mundo pode chamar até que eu coloque alguma propriedade que possa chamar
app.use(cors())
app.use(express.json)

app.use("/users", UserRoutes)