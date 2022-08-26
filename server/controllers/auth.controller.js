const ipAddress = {};

const loginSuccess = (req, res) => {
    ipAddress["data"] =
        req.headers["x-forwarded-for"] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
    if (req.user) {
        res.json({ error: false, message: "Login Success", user: req.user });
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
    ipAddress,
};