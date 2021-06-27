import axios from "axios";

export default class AuthService {
    apiUrl = "http://localhost:8080/api/auth/";

    login(user) {
        console.log(user);
        return axios.post(this.apiUrl + "login", user);
    }
}