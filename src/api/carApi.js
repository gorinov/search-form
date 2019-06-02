import Api from "./Api";

const resourceList = "/data/carList.json";

export default {
    getList() {
        return Api.get(`${resourceList}`);
    },
};
