import Api from "./Api";

const resource = "/request/";

export default {
    find(payload) {
        return Api.post(`${resource}/search.json` , payload).catch(error => console.warn(error));
    },
};
