const {Router} = require("express");
const { signup, login, protect } = require("../controllers/userController");
const router = Router()

router.post('/signup', signup)
router.post('/login', login)
router.get("/me", protect, (req, res)=>{
    res.send("HIIIII")
})
module.exports=router;