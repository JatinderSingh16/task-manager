const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

//Create a User Schema
const userSchema = new mongoose.Schema({
        name:{
            type:String,
            required:true,
            trim:true,
            lowercase:true
        },
        email:{
           type:String,
           required:true,
           unique:true,
           trim:true,
           validate(value){
               if(!validator.isEmail(value)){
                 throw new Error('Email is invalid')
               }
           }
        },
        password:{
           type:String,
           required:true,
           trim:true,
           minlength:8,
           validate(value){
               if(value.toLowerCase().includes('password')){
                   throw new Error('Password cannot contain "password" ')
               }
    
           }
        },
        age:{
            type:Number,
            default:0,
            validate(value){
                if(value<0){
                    throw new Error('age must be a positive number')
                }
            }
        },
        token:{
            type:String,
        },
        profile:{
          type : Buffer,
        }    
  },
    {
      timestamps:true
    }
  )


  //Craete a virual relationship between user and tasks

  userSchema.virtual('tasks' , {

    ref: 'Task',
    localField :'_id',
    foreignField : 'owner'
  })
  //private data remove

    userSchema.methods.toJSON = function(){
        const user = this
        const userObject = user.toObject()

        delete userObject.password
        delete userObject.token
 
        return userObject
    }

   //generate and save token in user collection
   userSchema.methods.generateAuthToken = async function() {
     const user = this 
     const token = jwt.sign({ _id:user._id.toString() }, process.env.SECRET)
     //save token in user 
      user.token = token

     await user.save()
     return token
   }

   //match email and password exist or not
  userSchema.statics.findByCredentials = async (email,password) => {
    const user = await User.findOne({email})

      if(!user){
          throw new Error ('Unable to login')
      }

      const isMatch = await bcrypt.compare(password , user.password)
      
      if(!isMatch){
        throw new Error ('Unable to login') 
      }

      return user
    } 




//Middleware 
userSchema.pre('save', async function(next){
    //all the Object calue come in this
    const user = this
    
    if(user.isModified('password')){
       //hasing password when save or update
       user.password = await  bcrypt.hash(user.password, user.password.length)
    }
    
    next()
})


//delete user tasks when user is removed 
 userSchema.pre('remove', async function(next){
   const user = this
   await Task.deleteMany({owner : user._id })
   next()
  })


//Create a User Model 
const User = mongoose.model('User',userSchema)

module.exports = User