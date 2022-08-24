import axios from "axios";

export function CheckUser() {
    return axios.get(`${process.env.REACT_APP_SERVER_URL}auth/login/success`, {
        withCredentials: true,
    });
}
