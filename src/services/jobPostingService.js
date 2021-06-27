import axios from "axios"

export default class JobPostingService {

    apiUrl = "http://localhost:8080/api/postings/";

    getPostings(pageNo, pageSize) {
        return axios.get(this.apiUrl + `getallbyactive/${pageNo}/${pageSize}`);
    }
    
    // Bu Method Henüz Sistem Admini Tarafından Onaylanmamış İlanları Getirir.
    getPostingsNoActivated(pageNo, pageSize) {
        return axios.get(this.apiUrl + `getallnoactivated/${pageNo}/${pageSize}`);
    }

    getPostingsByUserId(userId, pageNo, pageSize) {
        return axios.get(this.apiUrl + `getbyemployerid/${userId}/${pageNo}/${pageSize}`);
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

    getPostingsByCompanyName(companyName, pageNo, pageSize) {
        return axios.get(this.apiUrl + `getbycompany/${companyName}/${pageNo}/${pageSize}`);
    }

    getPostingsByMaxAndMinPay(max, min, pageNo, pageSize) {
        return axios.get(this.apiUrl + `getbymaxandminpay/${max}/${min}/${pageNo}/${pageSize}`);
    }

    getPostingsByDeadline(date, pageNo, pageSize) {
        return axios.post(this.apiUrl + `getbydeadline/${date}/${pageNo}/${pageSize}`);
    }

    getPostingsByJobPositionId(id, pageNo, pageSize) {
        return axios.get(this.apiUrl + `getbyjobpositionid/${id}/${pageNo}/${pageSize}`);
    }
}