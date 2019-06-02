import DataApi from "./dataApi";
import RequestApi from "./requestApi";

const apiList = {
    data: DataApi,
    request: RequestApi
};

export const ApiFactory = {
    get: name => apiList[name]
};
