import {Router} from 'express';
import passport from 'passport';
import { register, login, logout } from '../controllers/authController.js';

const router = Router();

router.post("/register", register);
router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  login
);

router.post("/logout", logout);

export default router;