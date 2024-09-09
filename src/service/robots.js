import axios from "./axios";

export const robotService = {
  getRobots() {
    return axios.get("/robots" );
  },
  execute(payload) {
    return axios.post("/execute" , payload );
  },
  executeList() {
    return axios.get("/execute" );
  },
  executeHistoryList(id) {
    return axios.get("/execute_history/" + id );
  },
  getProccesedData(execute_history_id) {
    return axios.get("/processed_data/" + execute_history_id)
  }


}