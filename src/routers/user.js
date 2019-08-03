const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')
const { sendWelcomeEmail } = require('../email/account')
//user routes set
// app.post('/user',(req,res) => {
// const user = new User(req.body)
// //User Save
// user.save().then(() => {
//         res.status(200).send(user)
//      }).catch((e) =>{
//        res.status(400).send(e)
//    })
// })


//jwt login 

router.post('/users/login', async (req,res) => { 

    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)  
        const token = await user.generateAuthToken()
        
        res.send({user , token })
    }catch(e){
        res.status(400).send(e)
    }
})

//User Logout 

router.post('/users/logout',auth, async (req,res) => { 

    try{
        req.user.token = '';
        req.user.save()

        res.send()
    }
    catch(e){
      res.status(500).send(e)
    }
})


//Async await User Save
router.post('/user',async (req,res) => {
    const user = new User(req.body)

    //User Save
    try{
        await user.save()
        //registered mail send to user
        sendWelcomeEmail(user.name, user.email)
         //if save then send next line response back else go to catch
        res.status(200).send(user)
    }
    catch(e){
        
        res.status(400).send(e)
    }
})


//Find Users
router.get('/users',auth,async (req,res) => {
     
      res.send(req.user)
        // try{
        //     const user =  await User.find({})

        //     res.send(user)
        // }catch(e){
        //     res.status(500).send()
        // }
    })

//Find One user 
//Find Users
router.get('/users/:id',(req,res) => {
    const _id = req.params.id 
    
    try{
        const user = User.findById({_id})

        if(!user){
            return res.status(404).send('')
        }

         res.send(user)
        }catch(e){
            res.status(500).send()
        }
    })

// update the user by id

router.patch('/users/me', auth ,async(req,res) =>{
    // const id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','email','password','age']
    const isvalidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isvalidOperation){
       return res.status(400).send('invalid updates!')
    }
    try{
        //usable
        // const user =  await User.findByIdAndUpdate(id , req.body ,{ new: true ,runValidators : true} )
      
        // const user = await User.findById(id) 
        
        //match object keys with collection keys
        updates.forEach((update) => req.user[update] = req.body[update])
         await req.user.save()

        // if(!user){
        //     return res.status(404).send('')
        // }

        res.send(req.user)
    }catch(e){
        res.status(400).send(e)
    }
  }) 

  //Delete user by Id
    
  router.delete('/users/me', auth , async (req,res) => {
    // const id = req.params.id
    try{
        // const user = await User.findByIdAndDelete(id)

        // if(!user){
        //    return res.status(404).send()
        // }
        await req.user.remove()
        res.send(req.user)
    }
    catch(e){
      res.status(500).send(e)
    }

  })
  
//User Profile upload
const upload = multer({
    limits : {
        fileSize : 1000000,
    },
    fileFilter(req,file,callback){

        if(!file.originalname.match(/\.(jpg|png|jpeg)$/)){
           return  callback(new Error('Please update an image'))
        }
       
        callback(undefined , true)
        // callback(undefined , false)

    }
})

router.post('/users/me/profile',auth ,upload.single('upload'), async (req,res) => {

    req.user.profile = req.file.buffer
    await req.user.save()

    res.send() 
},(error,req,res,next) => {
    //if file not validate then error message send back
    res.status(400).send({error : error.message})
})

//user profile pic delete
router.delete('/users/me/profile',auth, async (req,res) => {

     req.user.profile = undefined
    await req.user.save()
    res.send()
})


//user prifle pic get
router.get('/users/:id/profile',auth, async (req,res) => {
 try{
     const user = User.findById(req.params.id)

      if(!user || !user.profile){
          throw new Error()
      }
      res.set('Contect-Type : image/jpg')
      res.send(user.profile)
 }
 catch(e){
   res.status(400).send()
 }
})
  module.exports = router 