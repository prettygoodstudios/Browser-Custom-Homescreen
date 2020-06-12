import {GET_STREAMS} from "./types";
import { API_KEY } from "../../config";


async function getHeadlines(){
    var url = 'https://newsapi.org/v2/top-headlines?' + 'country=us&' + 'apiKey=' + API_KEY;
    var req = new Request(url);
    const headlines = await fetch(req).then((response) => {
        return response.json();
    }).then((data) => {
        return data;
    }).catch((e) => {
        console.log(e);
    });
    return headlines;
}

async function getTechNews(){
    var url = 'https://newsapi.org/v2/top-headlines?sources=wired,ars-technica,the-verge,engadget,techcrunch&sortBy=popularity' + '&apiKey=' + API_KEY;
    var req = new Request(url);
    const headlines = await fetch(req).then((response) => {
        return response.json();
    }).then((data) => {
        return data;
    }).catch((e) => {
        console.log(e);
    });
    return headlines;
}

async function getPolitics(){
    var url = 'https://newsapi.org/v2/everything?q=utah&from=' + `20${new Date().getYear() - 100}-${new Date().getMonth() + 1 > 9 ? '' : '0'}${new Date().getMonth() + 1}-${new Date().getDate() > 9 ? '' : '0'}${new Date().getDate()}` + 'country=us&' + 'apiKey=' + API_KEY;
    var req = new Request(url);
    const headlines = await fetch(req).then((response) => {
        return response.json();
    }).then((data) => {
        return data;
    }).catch((e) => {
        console.log(e);
    });
    return headlines;
}


export const getStreams = () => {
    return async function(dispatch){
        const headlines = await getHeadlines();
        const wired = await getTechNews();
        const politics = await getPolitics();
        dispatch({
            type: GET_STREAMS,
            payload: [
                {
                    title: 'Top News Headlines',
                    data: headlines
                },{
                    title: 'Tech News',
                    data: wired
                },
                {
                    title: 'Local News',
                    data: politics
                }
            ]
        })
    }
}