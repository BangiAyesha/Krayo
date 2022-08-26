const axios = require("axios");
const { ipAddress } = require("../routes/auth.routes");
const { countryDetails, ipToCountryMap, getCountry } = require("../csv.reader");

const getCountryName = async () => {
    // ipAddress["data"] = "5.44.37.25"; //Azerbaijan
    ipAddress["data"] = "130.41.72.255"; //Kuwait
    let country;
    const result = ipAddress?.data
        ?.split(".")
        .map((d) => ("000" + d).substr(-3))
        .join("");

    ipToCountryMap?.data?.map((data) => {
        let ip1 = data?.startIP
            ?.split(".")
            .map((d) => ("000" + d).substr(-3))
            .join("");

        let ip2 = data?.endIP
            ?.split(".")
            .map((d) => ("000" + d).substr(-3))
            .join("");

        if (result) {
            if (result >= ip1 && result <= ip2) {
                country = data.country;
            }
        }
    });
    return country;
};

const getLanguage = async (countryName) => {
    await getCountry();
    let language;
    countryDetails?.data?.map((countries) => {
        if (countryName == countries.name) {
            language = countries.languages[0].iso639_1;
        }
    });
    return language;
};

const translateText = async (lang) => {
    let translatedText;
    let data = {
        q: "Welcome",
        source: "en",
        target: lang,
    };
    await axios
        .post(`https://libretranslate.de/translate`, data)
        .then((response) => {
            translatedText = response.data.translatedText;
        })
        .catch((error) => {
            console.log(error.message);
        });
    return translatedText;
};

const greetUserInNative = async (req, res) => {
    let country = await getCountryName();
    let language = await getLanguage(country);
    let translatedText = await translateText(language);
    res.send(translatedText);
};

module.exports = greetUserInNative;
