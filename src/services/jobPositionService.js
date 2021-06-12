import axios from "axios";

export default class JobPositionService {
    apiUrl = "http://localhost:8080/api/jobpositions/";

    getPositions() {
        return axios.get(this.apiUrl + "getall");
    }
}