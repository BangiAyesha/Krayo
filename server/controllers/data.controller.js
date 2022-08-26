const dataLib = require("../lib/data.lib");
const { ipAddress } = require("../controllers/auth.controller");

const greetUserInNative = async (req, res) => {
    let country = await dataLib.getCountryName(ipAddress);
    let language = await dataLib.getLanguage(country);
    let translatedText = await dataLib.translateText(language);
    if (translatedText) {
        res.send(translatedText);
    } else {
        res.send("No Translation Found!!");
    }
};

module.exports = greetUserInNative;
