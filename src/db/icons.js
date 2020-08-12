import db from "./connection";

const createDB = () => {
    return new Promise((resolve, reject) => {
        if(db){
            const request = db.open("icons", 3);
            request.onerror = (error) => {
                reject({error});
            }
            request.onsuccess = (event) => {
                resolve(event.target.result);
            }
        }else{
            reject({error: "Does not support indexeddb"});
        }
    });
}

const insertIcon = (url, icon) => {
    return new Promise((resolve, reject) => {
        createDB.then((dataBase) => {
            dataBase.createObjectStore("icons", []);
        }).catch((error) => {
            reject({error});
        });
    });
}