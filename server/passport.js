const passport = require("passport");
const googleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
    new googleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/api/auth/google/callback",
            scope: ["profile", "email"],
        },
        // (accessToken, refreshToken, profile, callback) => {
        //     callback(null, profile);
        // }
        function (accessToken, refreshToken, profile, done) {
            var userData = {
                email: profile.emails[0].value,
                name: profile.displayName,
                token: accessToken,
            };
            done(null, userData);
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});
