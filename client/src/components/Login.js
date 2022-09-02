import React, { useEffect } from "react";
import { CheckUser } from "../config/userService";
import { useNavigate } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import "../css/login.css";

export default function Login() {
    const navigate = useNavigate();
    let token = localStorage?.getItem("_token");

    useEffect(() => {
        if (token) {
            navigate("/dashboard");
        }
    }, [token]);
    const handleLogin = () => {
        window.open(`/api/auth/google/callback`, "_self");
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
        <div className="text-center text-light background-img">
            <Container>
                <br />
                <br />
                <h2 className="text-light">Welcome to Krayo..!!</h2>
                <hr />

                <div className="text">
                    <Button
                        size="lg"
                        variant="inherit"
                        style={{
                            color: "white",
                            borderColor: "white",
                            borderRadius: "20px",
                        }}
                        onClick={handleLogin}
                    >
                        Login With Google
                    </Button>
                </div>
            </Container>
        </div>
    );
}
