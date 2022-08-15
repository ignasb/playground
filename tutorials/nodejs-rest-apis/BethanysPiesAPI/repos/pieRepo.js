const fs = require("fs");
const FILE_NAME = "./assets/pies2.json";

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
  search: (searchObject, resolve, reject) => {
    fs.readFile(FILE_NAME, (err, data) => {
      if (err) {
        reject(err);
      } else {
        let pies = JSON.parse(data);
        // Perform search
        if (searchObject) {
          // Example search object
          // const searchObject = {
          //   "id": 1,
          //   "name": 'A'
          // };
          pies = pies.filter(
            (p) =>
              (searchObject.id ? p.id == searchObject.id : true) &&
              (searchObject.name
                ? p.name
                    .toLowerCase()
                    .indexOf(searchObject.name.toLowerCase()) >= 0
                : true),
          );
        }

        resolve(pies);
      }
    });
  },
  insert: (newData, resolve, reject) => {
    fs.readFile(FILE_NAME, (err, data) => {
      if (err) {
        reject(err);
      } else {
        let pies = JSON.parse(data);
        pies.push(newData);
        fs.writeFile(FILE_NAME, JSON.stringify(pies), (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(newData);
          }
        });
      }
    });
  },
  update: (newData, id, resolve, reject) => {
    fs.readFile(FILE_NAME, (err, data) => {
      if (err) {
        reject(err);
      } else {
        let pies = JSON.parse(data);
        let pie = pies.find((p) => p.id == id);
        if (pie) {
          Object.assign(pie, newData);
          fs.writeFile(FILE_NAME, JSON.stringify(pies), (err) => {
            if (err) {
              reject(err);
            } else {
              resolve(newData);
            }
          });
        }
      }
    });
  },
  delete: (id, resolve, reject) => {
    fs.readFile(FILE_NAME, (err, data) => {
      if (err) {
        reject(err);
      } else {
        const pies = JSON.parse(data);
        const filteredPies = pies.filter((p) => p.id != id);
        fs.writeFile(FILE_NAME, JSON.stringify(filteredPies), (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(filteredPies);
          }
        });
      }
    });
  },
};

module.exports = pieRepo;
