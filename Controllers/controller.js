const jwt = require("jsonwebtoken");

const User = require("../Models/user-model");

const login = async(req, res, next) => {
    const {email, password} = req.body;

    let existingUser;
    try{
        existingUser = await User.findOne({email})
    }
    catch(err){
        return res.json({
            "message" : 'Sorry, some error occured!'
        })
    }


    if(!existingUser || existingUser.password !== password){
        
        return res.json({    
            "message" : "Invalid credentials"
        })
    }

    let token;

    try{
        token = jwt.sign({userId: existingUser.id, mail: existingUser.email},
            "secretKey",
            {expiresIn: '1h'}
            )
    }
    catch(err){
        res.json({
            err
        })
    }

    return res.json({
        userId: existingUser.id,
        mail: existingUser.email,
        token: token    
    })
}


const signup = async(req, res, next) => {
    const {firstName, lastName, email, password} = req.body;

    const createdUser = new User({
        firstName,
        lastName,
        email,
        password
    });

    try{
        await createdUser.save()
    }
    catch(err){
        console.log(err)
        return res.json({
            "message":"sign up failed"
        })
    }

    let token;

    try{
        token = jwt.sign({userId: createdUser.id, mail: createdUser.email},
            "secretKey",
            {expiresIn: '1h'})
    }
    catch(err){
        return res.json({
            "message" : "Sign Up failed please try again later."

        })
    }
    return res.json({
        userId: createdUser.id,
        firstName: createdUser.firstName,
        lastName: createdUser.lastName,
        mail: createdUser.email,
        token: token,
    })
}





const list = async(req, res, next) => {
    let users;

    try{
    users = await User.find({})
    }
    catch(err){
        return res.json({
            "message" : "Can't find users"
        })
    }

    res.json({users: users.map(user => user.toObject())})
}
    
exports.login = login;
exports.signup = signup;
exports.list = list;