const fs = require("fs");
const Papa = require("papaparse");
const axios = require("axios");

const ipToCountryMap = {};
const countryDetails = {};

const csvFilePath = "./assets/iprange-country.CSV";

const readCSV = async () => {
    const csvFile = fs.readFileSync(csvFilePath);
    const csvData = csvFile.toString();
    return new Promise((resolve) => {
        Papa.parse(csvData, {
            header: true,
            transformHeader: (header) => header.trim(),
            complete: (results) => {
                ipToCountryMap["data"] = results.data;

                resolve(results.data);
            },
        });
    });
};

const getCountry = async () => {
    await axios.get("https://restcountries.com/v2/all").then((response) => {
        countryDetails["data"] = response.data;
    });
};

module.exports = { ipToCountryMap, countryDetails, getCountry, readCSV };
