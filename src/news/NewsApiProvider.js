import NewsProvider from "./NewsProvider";
import { API_KEY } from "../../config";

export default class NewsApiProvider extends NewsProvider {

    constructor(){
        super("https://newsapi.org/v2/", API_KEY);
    }

    getFeed(feed, {date, sortBy, query, country, sources} = {}){
        return new Promise((resolve, reject) => {
            const params = [];
            if(date){
                params.push({
                    label: "from",
                    value: date
                });
            }
            if(sortBy){
                params.push({
                    label: "sortBy",
                    value: sortBy
                });
            }
            if(query){
                params.push({
                    label: "q",
                    value: query
                });
            }
            if(country){
                params.push({
                    label: "country",
                    value: country
                });
            }
            if(sources){
                params.push({
                    label: "sources",
                    value: sources
                });
            }
            params.push({
                label: "apiKey",
                value: this.apiKey
            });

            const url = this.baseUrl + feed + this.buildQueryString(params);
            const req = new Request(url);
            fetch(req).then((response) => {
                return response.json();
            }).then((data) => {
                resolve(data);
            }).catch((e) => {
                reject(e);
            });
        });
    }

}