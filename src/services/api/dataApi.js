import Api from "./Api";

const resourceList = "/data/";

export default {
    getCityList() {
        return Api.get(`${resourceList}cityList.json`).catch(error => console.warn(error));
    },
    getCarsList() {
        return Api.get(`${resourceList}carList.json`).catch(error => console.warn(error));
    },
};
