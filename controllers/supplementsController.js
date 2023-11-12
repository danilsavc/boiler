import models from "../models/models.js";
import ApiError from "../error/apiError.js";

const Supplements = models.Supplements || "";
const Dish = models.Dish || "";
const DishSupplement = models.DishSupplement || "";

class SupplementsController {
  async create(req, res, next) {
    try {
      let { name, price } = req.body;
      name = name.toLowerCase();
      const candidate = await Supplements.findOne({ where: { name } });

      if (candidate) {
        if (candidate) {
          return next(ApiError.badRequest("Така добавка вже існує"));
        }
      }

      await Supplements.create({ name, price });
      return res.json({ message: "Добавку успішно додано" });
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async getAll(req, res) {
    const categories = await Supplements.findAll();
    return res.json(categories);
  }
}

export default new SupplementsController();
