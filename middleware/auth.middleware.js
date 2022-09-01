const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
        res.send({ error: true, message: "Token required" });
    } else {
        jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
            if (err) {
                res.send({ error: true, message: "Token is invalid" });
            } else {
                next();
            }
        });
    }
}

module.exports = authenticateToken;
