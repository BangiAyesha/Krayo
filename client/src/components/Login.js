import React, { useEffect } from "react";
import { CheckUser } from "../config/userService";
import { useNavigate } from "react-router-dom";
import { Button, Container } from "react-bootstrap";

export default function Login() {
    const navigate = useNavigate();
    let token = localStorage?.getItem("_token");

    useEffect(() => {
        if (token) {
            navigate("/dashboard");
        }
    }, [token]);
    const handleLogin = () => {
        window.open(
            `${process.env.REACT_APP_SERVER_URL}auth/google/callback`,
            "_self"
        );
        localStorage.setItem("checklogin", "true");
    };
    const getUser = async () => {
        try {
            CheckUser().then((response) => {
                if (
                    response.data.user &&
                    localStorage.getItem("_token") == undefined
                ) {
                    localStorage.setItem(
                        "_token",
                        JSON.stringify(response.data.user)
                    );
                    navigate("/dashboard");
                }
            });
        } catch (err) {
            console.log(err);
        }
        localStorage.removeItem("checklogin");
    };
    useEffect(() => {
        if (localStorage.getItem("checklogin")) {
            getUser();
        }
    }, []);

    return (
        <div>
            <Container className="text-center">
                <Button variant="dark" onClick={handleLogin}>
                    Login With Google
                </Button>
            </Container>
        </div>
    );
}
