import { Router } from "express";
import { CategoryController } from "../controllers/category.js";

const CategoryRoutes = Router();


CategoryRoutes.post("/", CategoryController.store);


CategoryRoutes.get("/", CategoryController.index);

 CategoryRoutes.get("/:id/products", CategoryController.indexProducts);


export default CategoryRoutes;