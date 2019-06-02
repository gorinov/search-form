import CityApi from "./cityApi";
import CarApi from "./carApi";

const apiList = {
    city: CityApi,
    car: CarApi
};

export const ApiFactory = {
    get: name => apiList[name]
};
