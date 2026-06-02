const { body, validationResult } = require("express-validator");

// VALIDATION RULES FOR PARTICIPANT
const validateParticipant = [
  body("firstName")
    .notEmpty()
    .withMessage("First name is required"),

  body("lastName")
    .notEmpty()
    .withMessage("Last name is required"),

  body("age")
    .isNumeric()
    .withMessage("Age must be a number"),

  body("email")
    .isEmail()
    .withMessage("Valid email is required"),

  body("session")
    .notEmpty()
    .withMessage("Session is required"),

  body("level")
    .notEmpty()
    .withMessage("Level is required"),

  body("gender")
    .notEmpty()
    .withMessage("Gender is required"),

  // HANDLE VALIDATION ERRORS
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    next();
  },
];

module.exports = validateParticipant;