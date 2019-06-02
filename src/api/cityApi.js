import Api from "./Api";

const resourceList = "/data/cityList.json";

export default {
    getList() {
        return Api.get(`${resourceList}`);
    },
};
