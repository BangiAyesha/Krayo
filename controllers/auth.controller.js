const jwt = require("jsonwebtoken");

const loginSuccess = (req, res) => {
    if (req.user) {
        const token = jwt.sign(req.user, process.env.JWT_SECRET, {
            expiresIn: 1060000,
        });
        res.json({ error: false, message: "Login Success", user: token });
    } else {
        res.status(400).json({ error: true, message: "Login fail" });
    }
};

const loginFail = (req, res) => {
    res.status(400).json({ error: true, message: "Login failed" });
};

const logout = (req, res) => {
    req.logOut();
    res.clearCookie("connect.sid", {
        path: process.env.CLIENT_URL,
    });
    req.session = null;
    res.redirect(process.env.CLIENT_URL);
};

module.exports = {
    loginSuccess,
    loginFail,
    logout,
};
