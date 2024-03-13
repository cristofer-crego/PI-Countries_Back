const router = require("express").Router();
const getAllCountry = require("../controllers/getAllCountry");
const getCountryById = require("../controllers/getCountryById");
router.get("/", getAllCountry);
router.get("/:id", getCountryById);

module.exports = router;
