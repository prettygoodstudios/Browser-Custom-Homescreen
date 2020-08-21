
const NOT_IMPLEMENTED_ERROR = "IMPLEMENT!!!";

class NewsProvider {

    constructor(baseUrl, apiKey){
        this.baseUrl = baseUrl;
        this.apiKey = apiKey;
    }

    getFeed(feed, dateRange = undefined, sortBy = undefined, query = undefined){
        throw new Error(NOT_IMPLEMENTED_ERROR);
    }

    getFeeds(){
        throw new Error(NOT_IMPLEMENTED_ERROR);
    }


}