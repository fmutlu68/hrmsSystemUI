import axios from "axios";

export default class UserOperationService {
    apiUrl = "http://localhost:8080/api/useroperations"

    updateUser(operation) {
        operation.operationTypeId = 2;
        return axios.post(this.apiUrl + "/add", operation);
    }

    lastUpdateIsActivated(userId) {
        return axios.get(this.apiUrl + `/isactivated/${userId}`);
    }

    getOperationWhichIsNoActivated() {
        return axios.get(this.apiUrl + "/getallnoactivated");
    }

    activateOperation(id) {
        return axios.get(this.apiUrl + `/activate/${id}`);
    }

    deactivateOperation(id) {
        return axios.get(this.apiUrl + `/deactivate/${id}`);
    }
}