const express = require("express");
const { protect } = require("../controllers/userController");
const { createCrop, fetchAllCrops, fetchUserCrops, getCropsData } = require("../controllers/cropController");
const router = express.Router();



router.get("/get-all-crops", protect, fetchAllCrops)
router.post("/create-crop", protect, createCrop)
router.get("/get-farmer-crops/:id?", protect, fetchUserCrops)
router.get("/get-all-crops-data", protect, getCropsData)

module.exports = router;