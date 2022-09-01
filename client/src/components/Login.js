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
        <div
            className="text-center text-light"
            style={{
                backgroundImage: `url("/login.jpg")`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                minHeight: "100vh",
            }}
        >
            <Container>
                <br />
                <br />
                <h2 className="text-light">Welcome to Krayo..!!</h2>
                <hr />
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
            </Container>
        </div>
    );
}
