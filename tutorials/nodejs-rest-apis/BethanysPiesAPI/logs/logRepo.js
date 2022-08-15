const fs = require("fs");
const FILE_NAME = "./logs/log.txt";

const logRepo = {
  write: (data, resolve, reject) => {
    const toWrite = `${"*".repeat(80)} + \r\n
        Date/Time: ${new Date().toLocaleDateString()} \r\n
        Exception Info: ${JSON.stringify(data)} \r\n
        ${"*".repeat(80)} \r\n`;
    fs.writeFile(FILE_NAME, toWrite, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  },
};

module.exports = logRepo;
