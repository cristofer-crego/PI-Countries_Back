const axios = require("axios");
const server = require("./src/server");
const { conn } = require("./src/db.js");
const { Sequelize } = require("sequelize");
const updateDB = require("./src/updateDB.js");
const { PORT } = process.env;

conn
  .sync({ force: false })
  .then(() => {
    server.listen(PORT, () => {
      updateDB();
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => console.error(error));
