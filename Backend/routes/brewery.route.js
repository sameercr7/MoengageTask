// brewery.routes.js
const express = require("express");
const router = express.Router();
const breweryController = require("../controllers/brewery.controller");

// Route to get all breweries
router.get("/breweries", breweryController.getAllBreweries);

// Route to create a new brewery
router.post("/breweries", breweryController.createBrewery);

// Route to get a particular brewery by ID
router.get("/breweries/:id", breweryController.getBreweryById);

// Route to update a particular brewery by ID
// router.put("/breweries/:id", breweryController.updateBreweryById);

// Route to update a particular brewery by ID using PATCH
router.put("/breweries/:id", breweryController.updateBreweryById);

module.exports = router;
