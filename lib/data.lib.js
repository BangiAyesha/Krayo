const axios = require("axios");
const {
    countryDetails,
    ipToCountryMapv4,
    ipToCountryMapv6,
} = require("../csv.reader");
const ipaddr = require("ipaddr.js");

const getCountryName = async (ipAddress) => {
    // ipAddress = "5.44.37.25"; //Azerbaijan
    // ipAddress = "130.41.72.255"; //Kuwait
    // ipAddress = "18.61.0.0";
    // ipAddress = "::ffff:5af:3000";
    // ipAddress = "::ffff:1f28:67fe";
    let country;

    let checkIP = ipaddr.parse(ipAddress);
    if (checkIP.octets) {
        return new Promise((resolve, reject) => {
            let abc = ipaddr.parse(ipAddress);
            let result = abc?.octets
                .map((d) => ("000" + d).substr(-3))
                .join("");
            ipToCountryMapv4?.data?.slice(0, 208648).map((data) => {
                let ipv1 = ipaddr.parse(data.startIP);
                let ip1 = ipv1?.octets
                    .map((d) => ("000" + d).substr(-3))
                    .join("");

                let ipv2 = ipaddr.parse(data.endIP);
                let ip2 = ipv2?.octets
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
    } else if (checkIP.parts) {
        return new Promise((resolve, reject) => {
            let abc = ipaddr.parse(ipAddress);
            let result = abc?.parts
                .map((d) => ("00000" + d).substr(-5))
                .join("");
            ipToCountryMapv6?.data?.slice(0, 469354).map((data) => {
                let ipv1 = ipaddr.parse(data.startIP);
                let ip1 = ipv1?.parts
                    .map((d) => ("00000" + d).substr(-5))
                    .join("");

                let ipv2 = ipaddr.parse(data.endIP);
                let ip2 = ipv2?.parts
                    .map((d) => ("00000" + d).substr(-5))
                    .join("");

                if (result) {
                    if (result >= ip1 && result <= ip2) {
                        country = data.country;
                    }
                }
            });
            resolve(country);
        });
    }
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
