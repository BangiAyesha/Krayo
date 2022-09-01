const fs = require("fs");
const Papa = require("papaparse");
const axios = require("axios");

const ipToCountryMapv4 = {};
const ipToCountryMapv6 = {};
const countryDetails = {};

const csvFilePath4 = "./assets/iprange-country.CSV";
const csvFilePath6 = "./assets/IPV6-range.CSV";

const readFiles = async (csvFilePath) => {
    const csvFile = fs.readFileSync(csvFilePath);
    const csvData = csvFile.toString();
    return new Promise((resolve) => {
        Papa.parse(csvData, {
            header: true,
            transformHeader: (header) => header.trim(),
            complete: (results) => {
                resolve(results.data);
            },
        });
    });
};

const readCSV = async () => {
    ipToCountryMapv4["data"] = await readFiles(csvFilePath4);
    ipToCountryMapv6["data"] = await readFiles(csvFilePath6);
};

const getCountry = async () => {
    await axios.get("https://restcountries.com/v2/all").then((response) => {
        countryDetails["data"] = response.data;
    });
};

module.exports = {
    ipToCountryMapv4,
    ipToCountryMapv6,
    countryDetails,
    getCountry,
    readCSV,
};
