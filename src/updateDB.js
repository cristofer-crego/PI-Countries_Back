const { Country } = require("./db");
const fs = require("fs");
const path = require("path");

const updateDB = async () => {
  try {
    const data = await fs.readFileSync(
      path.join(__dirname, "../api/db.json"),
      "utf8"
    );

    const countryData = JSON.parse(data);

    let countries = countryData.countries.map((country) => {
      let capital;
      if (!country.capital || country.capital.length === 0) {
        capital = "unknown";
      } else {
        capital = country.capital[0];
      }

      return {
        id: country.cca3,
        name: country.name.common,
        continents: country.continents[0],
        flags: country.flags.png,
        capital: capital,
        subregion: country.subregion,
        area: country.area,
        population: country.population,
      };
    });

    await Country.bulkCreate(countries);
    console.log("Data successfully loaded into the database.");
  } catch (error) {
    console.error("Error loading data into the database:", error);
  }
};
module.exports = updateDB;
