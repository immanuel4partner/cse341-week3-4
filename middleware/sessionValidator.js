const { body, validationResult } = require("express-validator");

const validateSession = [
  body("sessionName")
    .notEmpty()
    .withMessage("Session name is required"),

  body("sessionCode")
    .notEmpty()
    .withMessage("Session code is required"),

  body("facilitator")
    .notEmpty()
    .withMessage("Facilitator is required"),

  body("duration")
    .isNumeric()
    .withMessage("Duration must be a number"),

  body("category")
    .notEmpty()
    .withMessage("Category is required"),

  body("schedule")
    .notEmpty()
    .withMessage("Schedule is required"),

  body("level")
    .notEmpty()
    .withMessage("Level is required"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    next();
  },
];

module.exports = validateSession;