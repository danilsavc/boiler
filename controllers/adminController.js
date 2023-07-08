import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ApiError from "../error/apiError.js";
import models from "../models/models.js";

const Admin = models.Admin;

const generateJwt = (id, name) => {
  return jwt.sign({ id, name }, process.env.SECRETKEY, {
    expiresIn: "24h",
  });
};

class AdminController {
  async registration(req, res, next) {
    try {
      const { name, password } = req.body;

      const candidate = await Admin.findOne({ where: { name } });

      if (candidate) {
        return next(ApiError.badRequest("Такий адміністратор вже існує"));
      }

      const hashPassword = await bcrypt.hash(password, 5);

      const admin = await Admin.create({ name, password: hashPassword });

      const token = generateJwt(admin.id, admin.name);

      return res.json({ token });
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async login(req, res, next) {
    try {
      const { name, password } = req.body;

      const admin = await Admin.findOne({ where: { name } });

      if (!admin) {
        return next(ApiError.internal("Неправильне ім'я або пароль"));
      }

      let comparePassword = bcrypt.compareSync(password, admin.password);

      if (!comparePassword) {
        return next(ApiError.internal("Неправильна пошта або пароль"));
      }

      const token = generateJwt(admin.id, admin.name);
      return res.json({ token });
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async check(req, res, next) {
    try {
      const token = generateJwt(req.admin.id, req.admin.name);

      return res.json({ token });
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }
}

export default new AdminController();
