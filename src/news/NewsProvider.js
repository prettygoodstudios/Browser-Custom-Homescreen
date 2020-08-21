
const NOT_IMPLEMENTED_ERROR = "IMPLEMENT!!!";

export default class NewsProvider {

    constructor(baseUrl, apiKey){
        this.baseUrl = baseUrl;
        this.apiKey = apiKey;
    }

    buildQueryString(params){
        let query = "";
        params.forEach(p => {
            if (query === "") {
                query += "?"
            }else{
                query += "&";
            }
            const {label, value} = p;
            query += `${label}=${value}`;
        });
        return query;
    }

    getFeed(feed, {date, sortBy, query, country, sources} = {}){
        throw new Error(NOT_IMPLEMENTED_ERROR);
    }

    getFeeds(){
        throw new Error(NOT_IMPLEMENTED_ERROR);
    }


}