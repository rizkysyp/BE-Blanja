const express = require(`express`);
const router = express.Router();
const { UserController } = require(`../controllers/users`);
const { protect } = require("../middlewares/auth");
const upload = require("../middlewares/upload");

//auth
router.post("/register/", UserController.register);

router.post("/verification", UserController.verificationOtp);
router.post("/login", UserController.login);
router.post("/forgot-password", UserController.forgotPassword);
router.post("/reset-password/:token", UserController.resetPassword);

//profile
router.get(`/profile`, protect, UserController.profile);
router.put("/profile", protect, upload.single("photo"), UserController.update);

module.exports = router;
