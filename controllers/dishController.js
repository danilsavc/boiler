import ApiError from "../error/apiError.js";
import models from "../models/models.js";
import { v4 } from "uuid";
import path from "path";
import { fileURLToPath } from "url";

const Dish = models.Dish;
const DishSupplement = models.DishSupplement;
const Category = models.Category;
const Supplements = models.Supplements;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class DishController {
  async create(req, res, next) {
    try {
      let { name, price, description, supplementIds, categoryId } = req.body;
      let { imgUrl } = req.files;
      let filename = v4() + ".jpg";
      imgUrl.mv(path.resolve(__dirname, "..", "static", filename));
      supplementIds = supplementIds.split(",");
      supplementIds = supplementIds.map((str) => {
        return parseInt(str, 10);
      });

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
        imgUrl: filename,
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
      console.error("Помилка під час обробки запиту:", error);
      next(ApiError.badRequest(error));
    }
  }

  async getAll(req, res, next) {
    try {
      const dish = await Dish.findAll();
      const supplement = await DishSupplement.findAll();

      if (!dish) {
        return next(ApiError.badRequest("Наразі страв немає"));
      }

      if (!supplement) {
        return next(ApiError.badRequest("Наразі добавок немає"));
      }

      return res.json({ dish, supplement });
    } catch (error) {
      next(ApiError.badRequest(error));
    }
  }
}

export default new DishController();
