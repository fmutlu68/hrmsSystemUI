import axios from "axios";

class FavoriteJobPostingService {
    apiUrl = "http://localhost:8080/api/favoritejobpostings/";

    addFavorites(posting) {
        return axios.post(this.apiUrl + "add", posting);
    }

}
export default FavoriteJobPostingService;