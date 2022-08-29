import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { greetUser } from "../config/dataService";
import jwt_decode from "jwt-decode";

export default function Dashboard() {
    const navigate = useNavigate();
    const [text, setText] = useState("");

    let token = JSON.parse(localStorage?.getItem("_token"));
    let displayName;
    if (token) {
        const decode = jwt_decode(token);
        displayName = decode.name;
    }

    useEffect(() => {
        if (!token) {
            navigate("/");
        }
    }, [token]);

    useEffect(() => {
        if (token) {
            greetUser().then((response) => {
                setText(response.data);
            });
        }
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
