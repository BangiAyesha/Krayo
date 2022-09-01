import axios from "axios";

export function greetUser() {
    let token = JSON.parse(localStorage?.getItem("_token"));

    return axios.get(`/api/data/greet`, {
        headers: { Authorization: `Bearer ${token}` },
    });
}
