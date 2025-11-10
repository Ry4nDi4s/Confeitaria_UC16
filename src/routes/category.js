import { Router } from "express";
import { CategoryController } from "../controllers/category.js";

const CategoryRoutes = Router();


CategoryRoutes.post("/", CategoryController.store);


CategoryRoutes.get("/", CategoryController.index);


CategoryRoutes.get("/by-slug/:slug/products", CategoryController.indexProducts);


export default CategoryRoutes;