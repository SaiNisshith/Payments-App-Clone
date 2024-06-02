const key = require('./config').JWT_SECRET;
const jwt = require('jsonwebtoken');

let authMiddleware = async (req,res,next)=>{
    let input = req.headers.authorization;
    if(!input && !input.startsWith('Bearer ')){
        return res.status(403).json({
            message : "Request is not according to the order",
            error : true
        });
    }
    let token = input.split(' ')[1];
    try {
        let decoded = jwt.verify(token, key);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(403).json({
            message : "Error Occured",
            error : true
        });
    }
}

module.exports = {
    authMiddleware
}