const fs = require("fs");
const path = require("path");

/**
 * Reads the runs directory and returns a list of all files with the .py extension.
 */
const readDirectoryFiles = () => {
    try {
        const targetDir = path.join(__dirname, "../runs");
        const fileNames = fs.readdirSync(targetDir);
        let files = [];
        
        for (let i = 0; i < fileNames.length; i++) {
            if (path.extname(fileNames[i]) == ".py") {
                files.push(fileNames[i]);
            }
        }

        return files;

    } catch (error) {
        return error;
    }
}

module.exports = { readDirectoryFiles }