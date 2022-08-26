import axios from "axios";
import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { greetUser } from "../config/dataService";

export default function Dashboard() {
    const navigate = useNavigate();
    let token = JSON.parse(localStorage?.getItem("_token"));
    const displayName = token?.displayName;
    const [text, setText] = useState("");

    useEffect(() => {
        if (!token) {
            navigate("/");
        }
    }, [token]);

    useEffect(() => {
        greetUser().then((response) => {
            setText(response.data);
        });
    }, []);

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
