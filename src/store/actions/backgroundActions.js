import BackgroundService from "../../services/backgroundService";

export const GET_BACKGROUND_BY_ID = "GET_BACKGROUND_BY_ID";
const backgroundService = new BackgroundService();
export const getBackgroundById = (id) =>  async (dispatch) => {
    try {
        const {data} = await backgroundService.getBackgroundById(id);
        console.log(data);
        dispatch({
            type: GET_BACKGROUND_BY_ID,
            payload: data.data,
        });
    }catch (e) {
        console.log(e);
    }
 }