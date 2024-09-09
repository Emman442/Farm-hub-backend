const catchAsync = require("../utils/catchAsync");
const {Crop, User} = require("../models");
const AppError = require("../utils/appError");
exports.createCrop = catchAsync(async(req, res, next)=>{
    const{hectare, crop_name, sowing_area, sowing_date, soil_type, variety} = req.body
   try {
    const user = req.user
    const date =new Date(Date.now())
    const newCrop = await Crop.create({
        crop_name,
        hectare,
        createdBy: user.id,
        sowing_area,
        soil_type,
        variety,
        sowing_date:date
    })
    res.status(201).json({
        status: "success",
        message: "crop created successfully!",
        data: {
            newCrop
        }
    })
   } catch (error) {
    console.error(error.name)
    return next(new AppError(error?.message, 500));
   }

})

exports.fetchAllCrops = catchAsync(async(req, res, next)=>{
    const crops = await Crop.findAndCountAll({
        include: [{
            model: User,
            as: "creator"
        }]
    })
    res.status(500).json({
        status: "success",
        message: "Crops fetched sucessfully",
        data: {
            crops
        }
    })
})

exports.fetchUserCrops = catchAsync(async(req, res, next)=>{
    const id=req.params.id?req.params.id:req.user.id
    const crops = await Crop.findAndCountAll({
        where: {createdBy: id},
        include: [{
            model: User,
            as: "creator"
        }]
    })
    res.status(500).json({
        status: "success",
        message: "Crops fetched sucessfully",
        data: {
            crops
        }
    })
})