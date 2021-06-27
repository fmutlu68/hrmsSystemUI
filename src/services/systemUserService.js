import axios from "axios";

class SystemUserService {
    apiUrl = "http://localhost:8080/api/systemusers/";

    updateUser(user) {
        return axios.post(this.apiUrl + "update", user);
    }
}
export default SystemUserService;