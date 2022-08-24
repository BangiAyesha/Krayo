import axios from "axios";
import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const navigate = useNavigate();
    let token = JSON.parse(localStorage?.getItem("_token"));
    const displayName = token?.displayName;
    const [ip, setIp] = useState("");
    const [ipData, setIpData] = useState([]);
    const [text, setText] = useState("");
    const [country, setCountry] = useState("");
    const [countryDetails, setCountryDetails] = useState([]);

    const fetchCountryDetails = () => {
        axios.get(`https://restcountries.com/v2/all`).then((response) => {
            response.data.map((details) => {
                if (country == details.name) {
                    setCountryDetails(details.languages[0].iso639_1);
                }
            });
        });
    };

    const translateText = () => {
        let data = {
            q: "Welcome",
            source: "en",
            target: countryDetails,
        };
        axios
            .post(`https://libretranslate.de/translate`, data)
            .then((response) => {
                setText(response.data.translatedText);
            });
    };

    const fetchdata = async () => {
        const response = await fetch("/assets/iprange-country.CSV");
        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");

        let csvText = "";
        let value, done;
        while (!done) {
            ({ value, done } = await reader.read());
            if (done) {
                break;
            }

            const csv = decoder.decode(value);
            csvText = csvText.concat(csv);
        }

        const results = await Papa.parse(csvText, { header: true });
        const rows = results.data;
        setIpData(rows);
    };

    const ippp = () => {
        let countryName = "";
        // let ip = "5.104.67.255";
        const result = ip?.replace(".", "");
        ipData &&
            ipData.map((data) => {
                let ip1 = data?.startIP?.replace(".", "");

                let ip2 = data?.endIP?.replace(".", "");

                if (result) {
                    if (result >= ip1 && result <= ip2) {
                        countryName = data.country;
                    }
                }
            });
        if (countryName) {
            setCountry(countryName);
        }
    };

    const getData = async () => {
        const res = await axios.get("http://api.ipify.org/");
        setIp(res.data);
    };

    useEffect(() => {
        getData();
        fetchdata();
    }, []);

    useEffect(() => {
        ippp();
    }, [ip, ipData]);

    useEffect(() => {
        if (!token) {
            navigate("/");
        }
    }, [token]);

    useEffect(() => {
        if (country) {
            fetchCountryDetails();
        }
        if (countryDetails.length != 0) {
            translateText();
        }
    }, [country, countryDetails]);

    const handleLogout = () => {
        localStorage.removeItem("_token");
        window.open(`${process.env.REACT_APP_SERVER_URL}auth/logout`, "_self");
    };

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">
                        Greetings {displayName ? `${displayName}` : ""}
                    </Navbar.Brand>
                    <Nav>
                        <Nav.Link onClick={() => handleLogout()}>
                            Logout
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <br />
            <Container>{text}</Container>
        </div>
    );
}
