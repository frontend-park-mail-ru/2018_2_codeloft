const mongoClient = require("mongodb").MongoClient;
const fs = require("fs");

const fileContent = fs.readFileSync("src/static/text/text.json", "utf8");
const elems = JSON.parse(fileContent);
const username = process.argv[2];
const password = process.argv[3];

if (!username || !password) {
    return console.log("Для обновления: node update_langs.js <username> <password>");
}

const url = `mongodb://${username}:${password}@ds211774.mlab.com:11774/codeloft`;

mongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
    if (err) {
        return console.log("Подключение не удалось");
    }

    const db = client.db("codeloft");
    const collection = db.collection("localization");

    console.log("Подключение успешно");
    for (key in elems) {
        const word = {name: key, en: elems[key].en, ru: elems[key].ru};
        collection.updateOne(
            {name: key},
            { $set : word},
            {upsert: true}
        )
    }
    
    client.close();
    console.log("Завершено");
});
