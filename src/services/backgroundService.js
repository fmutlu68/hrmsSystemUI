import axios from "axios";

class BackgroundService {
    apiUrl = "http://localhost:8080/api/backgrounds/";

    getBackgroundByUserId(id) {
        return axios.get(this.apiUrl + `getbyuser/${id}`);
    }

    async getBackgroundById(id) {
        return await axios.get(this.apiUrl + `getbyid/${id}`);
    }

    updateBackground(background) {
        return axios.post(this.apiUrl + "update", background);
    }

    addImageToCv(file, id) {
        const formData = new FormData();
        formData.append("file", file)
        return axios.post(this.apiUrl + `addimagetocv/${id}`, formData, {headers: {'content-type' : "multipart/form-data"}});
    }
}
export default BackgroundService;