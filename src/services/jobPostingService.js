import axios from "axios"

export default class JobPostingService {

    apiUrl = "http://localhost:8080/api/postings/";

    getPostings() {
        return axios.get(this.apiUrl + "getallbyactive");
    }
    
    // Bu Method Henüz Sistem Admini Tarafından Onaylanmamış İlanları Getirir.
    getPostingsNoActivated() {
        return axios.get(this.apiUrl + "getallnoactivated");
    }

    getPostingsByUserId(userId) {
        return axios.get(this.apiUrl + "getbyemployerid/" + userId);
    }

    addPosting(posting) {
        return axios.post(this.apiUrl + "add", posting );
    }

    deletePosting(posting) {
        return axios.post(this.apiUrl + "delete", posting );
    }

    activatePosting(id) {
        return axios.get(this.apiUrl + "activatejobposting/" + id);
    }
}