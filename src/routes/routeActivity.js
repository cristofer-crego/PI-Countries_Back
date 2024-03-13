const router = require("express").Router();
const getAllActivity = require("../controllers/getAllActivity");
const postActivity = require("../controllers/postActivity");
const deleteActivity = require("../controllers/deleteActivity");
router.post("/", postActivity);
router.get("/", getAllActivity);
router.delete("/:id", deleteActivity);
module.exports = router;
