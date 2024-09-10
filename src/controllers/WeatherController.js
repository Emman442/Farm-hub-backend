const fs = require("fs").promises
const path = require("path")
const catchAsync = require("../utils/catchAsync")
const AppError = require("../utils/appError");
 

exports.getAllWeatherData = catchAsync(async (req, res, next) => {
    try {
        const filePath = path.resolve(__dirname, '../data/WeatherData.json'); // Resolve absolute path
        const datas = await fs.readFile(filePath, 'utf-8');
        res.status(200).json({
            status: 'success',
            data: JSON.parse(datas) // Assuming you want to send the parsed data as JSON
        });
    } catch (error) {
        console.error(error);
        return next(new AppError("Error Fetching Weather Data", 500));
    }
});
exports.getAllWeatherDataByCountry = catchAsync(async (req, res, next) => {
    const country = req.query.country
    console.log(country)
    try {
        const filePath = path.resolve(__dirname, '../data/WeatherData.json');
        const datas = await fs.readFile(filePath, 'utf-8');
        const parsedData = JSON.parse(datas).Maharashtra[country]
        console.log(parsedData)
        res.status(200).json({
            status: 'success',
            data: {parsedData}
        });
    } catch (error) {
        console.error(error);
        return next(new AppError("Error Fetching Weather Data", 500));
    }
});
