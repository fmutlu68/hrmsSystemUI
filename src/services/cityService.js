import axios from "axios";

export default class CityService {
    apiUrl = "http://localhost:8080/api/cities/";

    getCities() {
        return axios.get(this.apiUrl + "getall");
    }
}