const express = require('express')
require('./db/mongoose')
require('dotenv').config();
const userRouter = require('./routers/user') 
const taskRouter = require('./routers/task') 
const app = express()
const port = process.env.PORT || 3000
//set json format accepted
app.use(express.json())

//roters
app.use(userRouter)

app.use(taskRouter)


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

/****************************************/
/*Relation of table testing function*/

// const Task = require('./models/task')
// const User = require('./models/user')

// const main = async () => { 
//  const task = await Task.findById('5d3dee069e69151a3b046af7')
// //This function get task owner details (Relation between tables)
//  await task.populate('owner').execPopulate()
//  console.log(task)


// // tasks using User model
//  const user = await User.findById('5d3deb086ba49f17b10ab529')
//  await user.populate('tasks').execPopulate()
//  console.log(user.tasks)
// }

// main()

/*****************Files Uploading******************/

// //User Profile upload
// const upload = multer({
//     dest : 'profile',
//     limits : {
//         fileSize : 1000000,
//     },
//     fileFilter(req,file,callback){

//         if(!file.originalname.match(/\.(jpg|png|jpeg)$/)){
//            return  callback(new Error('Please update an image'))
//         }
       
//         callback(undefined , true)
//         // callback(undefined , false)

//     }
// })

// router.post('/users/me/profile', upload.single('upload'), (req,res) => {
//     res.send() 
// },(error,req,res,next) => {
//     //if file not validate then error message send back
//     res.status(400).send({error : error.message})
