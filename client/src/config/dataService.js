import axios from "axios";

export function greetUser() {
    return axios.get(`${process.env.REACT_APP_SERVER_URL}data/greet`);
}
