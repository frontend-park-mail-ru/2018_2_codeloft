const fs = require('fs');

const getFiles = (dir, files_) => {
	files_ = files_ || [];
	const files = fs.readdirSync(dir);
	files.forEach((file) => {
		const name = `${dir}/${file}`;
		if (fs.statSync(name).isDirectory()) {
			getFiles(name, files_);
		} else {
			files_.push(name.replace(__dirname, ''));
		}
	});
	return files_;
};

fs.writeFileSync(`${__dirname}/cache.json`, JSON.stringify(getFiles(`${__dirname}/static`)));
