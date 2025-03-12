const express = require("express");

const router = express.Router();

const { home, register, login } = require("../controller/auth-controller");

const signupSchema = require("../validation/auth-validate");

const validate = require("../middlewares/validate-middleware")

// router.route('/').get((req, res) => {
//     res.status(200).send("Welcome to Bishnudev Razz Channel page...");
// })

// router.route('/register').get((req, res) => {
//     res.status(200).send("Welcome to Bishnudev Razz Channel page in register route");
// })

router.route('/').get(home);

router.route('/register').post(validate(signupSchema),register);

router.route('/login').post(login);

module.exports = router;    