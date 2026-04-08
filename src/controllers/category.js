import prisma from "../prisma.js";

export const CategoryController = {
  async store(req, res, next) {
    try {
      const { name, slug } = req.body;
      const category = await prisma.category.create({
        data: { 
          name, 
          slug, 
          photoUrl:
          `/static/categories/photos/${slug}.png` },
      });
      res.status(201).json(category);
    } catch (error) {
      next(error);
    }
  },

  async index(req, res, next) {
    try {
      const categories = await prisma.category.findMany();
      return res.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  },

  async indexProducts(req, res, next) {
    try {
      const { slug } = req.params;

      const category = await prisma.category.findUnique({
        where: { slug },
      });

      if (category == null || !category) {
        res.status(404).json({ error: "Categoria inexistente" });
        return;
      }

      const products = await prisma.product.findMany({
        where: {
          categoryId: category.id,
        },
      });
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await prisma.category.delete({
        where: { id: parseInt(id) },
      });
      res.status(204).send();
    } catch (error) {
      next(error);
    }
},
};