import prisma from "../prisma.js";

export const CategoryController = {
    async store(req, res, next) {

        const { name, slug } = req.body;
        try {
            const photoUrl = `/static/categories/photos/${slug}.png`;
            const category = await prisma.category.create({
                data: { name, slug, photoUrl }
            })
            res.status(201).json(category);
        } catch (error) {
            next(error);
        }
    },

    async index(req, res, next) {
        // const urlBase = 'http://localhost:3000';
        try {
            const categories = (await prisma.category.findMany());
            // categories.forEach(function (category) {
            //     if (category.photoUrl != null) {
            //         category.photoUrl = `${urlBase}${category.photoUrl}`
            //     }
            // });

            res.status(200).json(categories);
        }  catch (error) {
            next(error);
        }
    },

    async indexProducts(req, res, next) {}

}