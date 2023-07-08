import sequelize from "../db.js";

import { DataTypes } from "sequelize";

const Admin = sequelize.define("admin", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
});

const Reviews = sequelize.define("reviews", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, unique: true },
  number: { type: DataTypes.STRING, unique: true },
  description: { type: DataTypes.STRING },
  rating_service: { type: DataTypes.INTEGER },
  rating_food: { type: DataTypes.INTEGER },
});

const Dish = sequelize.define("dish", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  price: { type: DataTypes.INTEGER },
  description: { type: DataTypes.STRING },
  imgUrl: { type: DataTypes.STRING },
});

const Supplements = sequelize.define("supplements", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  price: { type: DataTypes.INTEGER },
});

const Category = sequelize.define("category", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
});

Dish.hasMany(Supplements, { as: "supplements" });
Supplements.belongsTo(Dish);

Category.hasMany(Dish);
Dish.belongsTo(Category);

export default {
  Admin,
  Reviews,
  Dish,
  Supplements,
  Category,
};
