const catchAsync = require("../utils/catchAsync");
const {User} = require("../models");
const AppError = require("../utils/appError");
const crypto = require("crypto")
const {promisify} = require("util")
const jwt = require("jsonwebtoken")

const signToken = (email) => {
    console.log("email: ",email)
  return jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
exports.signup = catchAsync(async (req, res, next) => {
    try {
      const { firstName, lastName, email, password, role } = req.body;
      // Check if user already exists
      const userAlreadyExists = await User.findOne({ where: { email } });
      
      if (userAlreadyExists) {
        return next(new AppError("User Already Exists! please login.", 400));
      }
      
      // Create new user
      const newUser = await User.create({
        firstName,
        lastName,
        email,
        password,
        role,
      });
  
      console.log("sending response.... ", newUser);
  
      // Send response

      res.status(201).json({
        message: "User Created successfully",
        data: { newUser },
      });
    } catch (error) {
      console.error("Error in signup: ", error);
      return next(new AppError("Signup failed", 500));
    }
  });

  
 exports.login = async(req, res, next)=>{
    console.log(process.env.JWT_SECRET)
    const {email, password} = req.body
    if (!email || !password) {
      return next(new AppError("Please Enter email and password!", 400));
    }
   try {
    const user = await User.findOne({where: {email}})
    console.log(user.validPassword(password))
    if(!user){
        return next(new AppError("Either email or password is Incorrect", 404))
    }
    if(!user || !(user.validPassword(password))){
        return next(new AppError("Either email or password is Incorrect", 400));
    }
    console.log(user)

    const token = signToken(user.email);
    console.log(token)

    res.cookie("jwt", token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: req.secure || req.headers["x-forwarded-proto"] === "https",
    });


    user.password = undefined;

    res.status(200).json({
      status: "success",
      token,
      data: {
        user,
      },
    });
   } catch (error) {
    console.error("Error in Login: ", error);
    return next(new AppError("Login failed", 500));
   }

}


exports.protect = catchAsync(async (req, res, next) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }
 
  
    if (!token) {
      return next(
        new AppError("You are not logged in! Please log in to get access.", 401)
      );
    }
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const currentUser = await User.findOne({email: decoded.email});
    if (!currentUser) {
      return next(
        new AppError(
          "The user belonging to this token does no longer exist.",
          401
        )
      );
    }
  
    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return next(
        new AppError("User recently changed password! Please log in again.", 401)
      );
    }
  
    req.user = currentUser;
    res.locals.user = currentUser;
    next();
  });