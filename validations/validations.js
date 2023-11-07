import { body } from "express-validator";

class Validations {
  adminValidation = [
    body("name")
      .notEmpty()
      .withMessage("Ім'я є обов'язковим для заповнення")
      .isLength({
        min: 2,
        max: 25,
      })
      .withMessage("Ім'я повинно містити мінімум 2 символи, а максимально 25 символів"),

    body("password")
      .notEmpty()
      .withMessage("Пароль є обов'язковим для заповнення")
      .isLength({ min: 6 })
      .withMessage("Пароль повинен містити мінімум 6 символів")
      .matches(/[A-Z]/)
      .withMessage("Пароль повинен містити хоча б одну велику літеру"),
  ];

  dishValidation = [
    body("name")
      .notEmpty()
      .withMessage("Ім'я є обов'язковим для заповнення")
      .isLength({
        max: 50,
      })
      .withMessage("Ім'я повинно містити максимум 50 символів"),

    body("price")
      .notEmpty()
      .withMessage("Ціна є обов'язковою для заповнення")
      .isInt({ min: 5 })
      .withMessage("Ціна повинна бути числом і не менше 5"),
  ];

  categoryValidation = [
    body("name")
      .notEmpty()
      .withMessage("Назва категорії є обов'язковою для заповнення")
      .isLength({
        min: 2,
        max: 10,
      })
      .withMessage("Категорія повиненна містити мінімум 2 символи, а максимально 10 символів"),
  ];

  supplementsValidation = [
    body("name")
      .notEmpty()
      .withMessage("Назва категорії є обов'язковою для заповнення")
      .isLength({
        min: 2,
        max: 10,
      })
      .withMessage("Категорія повиненна містити мінімум 2 символи, а максимально 10 символів"),
    body("price")
      .notEmpty()
      .withMessage("Ціна є обов'язковою для заповнення")
      .isInt({ min: 5 })
      .withMessage("Ціна повинна бути числом і не менше 5"),
  ];
}

export default new Validations();
