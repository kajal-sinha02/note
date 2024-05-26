const express = require('express')
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "hallaluya";
var fetchuser = require("../middleware/fetchuser")


//ROUTE 1 create a user using post "/api/auth/createuser"  doesnt require auth
router.post ('/createuser' ,[
    body('name','Enter a valid name min length is 3').isLength({min : 3}),
    body('email','Enter a valid email').isEmail() , 
    
    body('password','password must be atleast 5 characters').isLength({min: 5})

],async (req,res)=>{

    let success = false;
    // if there are errors return bad request and error
    const errors= validationResult(req);
    console.log(req.body);
    if(!errors.isEmpty()){
        return res.status(400).json({success ,errors : errors.array()});
    }
    //check whether user with this email exist already
    
    try {
        let us =await User.findOne({email : req.body.email})
    if(us){
        console.log("sorry a user with this email already exist");
        return res.status(400).json({ error : "sorry a user with this email already exist"})
       
    }
    // const user = User(req.body);
    // user.save();
    const salt =await bcrypt.genSalt(10);
    const secPass =await  bcrypt.hash(req.body.password,salt);
    let user = await User.create({
        name : req.body.name , 
        password : secPass ,
        email : req.body.email
    })
    
    // .then(user => res.json(user))
    // .catch(err =>{ console.log(err)
    // res.json({error : 'Please enter a unique email',message : err.message})}
    // )
    const data = {
        user: user.id 
    }
    const authtoken = jwt.sign(data , JWT_SECRET);
    console.log(authtoken);
    //using ES6 we can directly write authtoken in place of {authtoken : authtoken}
    let success = true;
    res.json({success , authtoken}); 
    } catch (error) {
     
        console.log(error.message);
        res.status(500).send("Internal server error occoured");
    }   
})

//ROUTE 2 create a user using post "/api/auth/login"  authenticate user


router.post ('/login' ,[
   
    body('email','Enter a valid email').isEmail() , 
    body('password','password must be atleast 5 characters').isLength({min: 5})

],async (req,res)=>{
    let success = false;
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }

    const {email , password} = req.body ; 
    try {
        let user =await User.findOne({email});
        if(!user){
            return res.status(400).json({error : "Please try to login with correct credentials"});
        }

        const passwordCompare = await bcrypt.compare(password , user.password);
        if(!passwordCompare){
             ;
            return res.status(400).json({success , error : "Please try to login with correct credentials"});
        }
        const data = {
            user:{
                id : user.id
            }
        }
        const authtoken = jwt.sign(data , JWT_SECRET);
        success = true ; 
        console.log(authtoken);
        res.json({success ,authtoken}); 
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error occoured");
     
    }
})


// Route 3 : Get logged in details user using POST "/api/auth/getuser" .login required.
router.post('/getuser' ,fetchuser ,  async (req,res) => {

    try {
        userID = req.user.id;
        //select all the field except password
        const user = await User.findById(userID).select("-password");
        res.send(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error occoured");    
    }
})

module.exports = router ;