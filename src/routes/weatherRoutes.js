const express= require("express");
const { protect } = require("../controllers/userController");
const { getAllWeatherData, getAllWeatherDataByCountry } = require("../controllers/WeatherController");
const router = express.Router();


router.get("/", protect, getAllWeatherData )
router.get("/country", protect, getAllWeatherDataByCountry )
// router.get("/", protect, getAllWeatherData )




module.exports = router;