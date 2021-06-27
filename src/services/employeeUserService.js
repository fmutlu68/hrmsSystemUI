import axios from "axios"

export default class EmployeeUserService {
    apiUrl = "http://localhost:8080/api/employees/";

    addUser(user) {
        return axios.post(this.apiUrl + "add", user);
    }
}