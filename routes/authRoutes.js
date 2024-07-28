import {Router} from 'express';
import passport from 'passport';
import { register, login, logout } from '../controllers/authController.js';
import isAuthenticated from '../middlewares/authMiddleware.js';
const router = Router();

router.post("/register", register);
router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  login
);

router.post("/logout",isAuthenticated, logout);

export default router;