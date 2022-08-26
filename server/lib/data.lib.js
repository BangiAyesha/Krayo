const axios = require("axios");
const { countryDetails, ipToCountryMap } = require("../csv.reader");

const getCountryName = async (ipAddress) => {
    // ipAddress["data"] = "5.44.37.25"; //Azerbaijan
    // ipAddress["data"] = "130.41.72.255"; //Kuwait
    ipAddress["data"] = "2.22.233.2"; //Israel
    return new Promise((resolve, reject) => {
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
        resolve(country);
    });
};

const getLanguage = async (countryName) => {
    let language;
    if (countryDetails && countryDetails.data) {
        countryDetails.data.map((countries) => {
            if (countryName == countries.name) {
                language = countries.languages[0].iso639_1;
            }
        });
    }
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

module.exports = {
    translateText,
    getLanguage,
    getCountryName,
};
