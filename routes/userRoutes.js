const userController = require("../controller/userController");
const { Router } = require("express");
const { loginLimiter } = require("../middleware/rateLimit");
const userRouter = Router();

userRouter.post("/login", loginLimiter, userController.loginUser);
userRouter.post("/login_session", userController.login_session);
userRouter.post("/register", userController.registerUser);
userRouter.post("/logout_session", userController.logout_session);
userRouter.post("/password_reset_request", userController.passwordResetRequest);
userRouter.post("/password_reset", userController.passwordReset);

module.exports = userRouter;
