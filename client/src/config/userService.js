import axios from "axios";

export function CheckUser() {
    return axios.get(`/api/auth/login/success`, {
        withCredentials: true,
    });
}
