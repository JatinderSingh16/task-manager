const User = require('../models/user')
const jwt = require('jsonwebtoken')

const auth = async(req,res,next) => {
 
    try{
        const token = req.header('Authorization').replace('Bearer ', '')
        const decode = jwt.verify(token, 'thekeyisready')
        const user = await User.findOne({_id : decode._id , token : token})

        console.log(user)

        if(!user){
            throw new Error('')
        }

        req.user = user
        next()
     }catch(e){
        res.status(401).send({error:'please authonticate.'})
     }
}

module.exports = auth