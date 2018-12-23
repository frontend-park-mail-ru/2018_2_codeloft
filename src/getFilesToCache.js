const fs = require('fs');

const getFiles = (dir, filesList) => {
    filesList = filesList || [];
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
        const name = `${dir}/${file}`;
        if (fs.statSync(name).isDirectory()) {
            getFiles(name, filesList);
        } else {
            filesList.push(name.replace(__dirname, ''));
        }
    });
    return filesList;
};

fs.writeFileSync(`${__dirname}/cache.json`, JSON.stringify(getFiles(`${__dirname}/statics`)));