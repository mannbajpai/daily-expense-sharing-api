import passport from "passport";


export const login = (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            return res.status(500).json({ message: "An Error occurred" })
        }
        if (!user) {
            return res.status(401).json({ message: info.message });
        }
        req.logIn(user, (err) => {
            if (err) {
                res.status(500).json({ message: "An error occurred" });
            }
            return res.json({ message: "Login successful", user });
        });
    })
        (req, res, next);
}

export const logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ message: "An error occurred", error: err });
        }
        res.json({ message: "Logout successful" });
    });
};

export const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ message: "Unauthorized" });
};

