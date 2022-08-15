const fs = require("fs");
const FILE_NAME = "./assets/pies.json";

const pieRepo = {
  get: (resolve, reject) => {
    fs.readFile(FILE_NAME, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  },
  getById: (id, resolve, reject) => {
    fs.readFile(FILE_NAME, (err, data) => {
      if (err) {
        reject(err);
      } else {
        const pie = JSON.parse(data).find((p) => p.id == id);
        resolve(pie);
      }
    });
  },
};

module.exports = pieRepo;
