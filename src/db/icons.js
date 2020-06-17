import db from "./connection";

const createDB = () => {
    return new Promise((resolve, reject) => {
        if(db){
            const request = db.open("MyTestDatabase", 3);
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