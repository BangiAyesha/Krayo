const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const cors = require("cors");
const cookieSession = require("cookie-session");
const authRoutes = require("./routes/auth.routes");
require("./passport");
const passport = require("passport");

const PORT = process.env.PORT || 5000;

app.use(
    cookieSession({
        name: "session",
        keys: ["Greet"],
        maxAge: 24 * 60 * 60 * 100,
    })
);

app.use(
    cors({
        origin: "http://localhost:3000",
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);

app.listen(PORT, (error) => {
    if (error) console.log(error);
    console.log(`Server running on ${PORT}`);
});
