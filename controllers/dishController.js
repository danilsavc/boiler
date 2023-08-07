import ApiError from "../error/apiError.js";
import models from "../models/models.js";

const Dish = models.Dish;
const DishSupplement = models.DishSupplement;
const Category = models.Category;
const Supplements = models.Supplements;

class DishController {
  async create(req, res, next) {
    try {
      let { name, price, description, imgUrl, supplementIds, categoryId } = req.body;

      const category = await Category.findOne({ where: { id: categoryId } });

      if (!category) {
        return next(ApiError.badRequest("Обрана категорія не існує"));
      }

      const supplements = await Supplements.findAll();
      const supplementIdsList = supplements.map((supplement) => supplement.id);

      // Перевірка наявності обраних добавок
      const invalidSupplementIds = supplementIds.filter(
        (supplementId) => !supplementIdsList.includes(supplementId)
      );
      if (invalidSupplementIds.length > 0) {
        return next(ApiError.badRequest("Обраних добавок не існує"));
      }

      const dish = await Dish.create({
        name,
        price,
        description,
        imgUrl,
        categoryId,
      });

      // Додавання кожного supplementId до таблиці DishSupplement
      if (supplementIds && supplementIds.length > 0) {
        for (const supplementId of supplementIds) {
          await DishSupplement.create({ dishId: dish.id, supplementId });
        }
      }

      return res.json(dish);
    } catch (error) {
      next(ApiError.badRequest(error));
    }
  }

  async getAll(req, res, next) {
    try {
      const dish = await Dish.findAll();

      if (!dish) {
        return next(ApiError.badRequest("Наразі страв немає"));
      }

      return res.json(dish);
    } catch (error) {
      next(ApiError.badRequest(error));
    }
  }
}

export default new DishController();
