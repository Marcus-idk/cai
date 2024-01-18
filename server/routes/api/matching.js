const express = require("express");
const router = express.Router();
const matchingController = require("../../controllers/matchingController");

router.post("/run", matchingController.handleMatching);

module.exports = router;