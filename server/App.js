const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const { getCountry, readCSV } = require("./csv.reader");
require("./passport");
const index = require("./routes/index.routes");
const passport = require("passport");

const app = express();
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

app.use("/api", index);

app.listen(PORT, async (error) => {
    if (error) console.log(error);
    console.log(`Server running on ${PORT}`);
    await getCountry();
    readCSV();
});
