const jwt = require('jsonwebtoken')
const User = require('../model/UserModel')

const requireAuth = async (req,res,next) =>{
    // verify authorazion
    const {authorization } = req.headers
    if(!authorization){
        return res.status(401).json({error : "authorization token required"})
    }

    const token = await authorization.split(" ")[1]

    try {
        const {_id} = jwt.verify(token, process.env.SECRET_JWT)

        req.user = await User.findOne({_id}).select('_id')
        next()
    }catch(error){
        res.status(401).json({error : "request is not authorized"});
    }

}

module.exports = requireAuth