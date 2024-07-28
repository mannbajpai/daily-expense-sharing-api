import passport from "passport";
import {Strategy} from "passport-local"
import User from "../models/User.js";


passport.use(
    new Strategy({
        usernameField:"email",
        passwordField:"password",
    },
    async (email,password, done) => {
        try {
            const user = await User.findOne({email});
            if (!user) {
                return done(null,false, {message:"Invalid Email"});
            }
            const isMatch = await user.isValidPassword(password);
            if (!isMatch) {
                return done(null, false, { message: "Incorrect password." });
              }
              return done(null, user);
        } catch (error) {
            return done(error);
        }
    })
);

passport.serializeUser((user,done) => {
    done(null,user.id);
})

passport.deserializeUser(async (id,done)=>{
    try {
        const user = await User.findById(id);
        done(null,user);
    } catch (error) {
        done(error,false);
    }
});