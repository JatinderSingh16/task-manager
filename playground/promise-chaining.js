require('../src/db/mongoose')
const User = require('../src/models/user')

// //Method 2 Chaining Method.
// User.findByIdAndUpdate('5d39d4bf0c92e44480200518' ,{age:23}).then((user) => {
//    console.log(user)
//     return User.countDocuments({age:23}).then((count) => {
//         console.log(count)
//     }).catch((e) => {
//         console.log(e)
//     })
// })

//method 2 Easy method (async await functionality)
const updateAgeandCount = async (id , age) => {
    const user = await User.findByIdAndUpdate(id , { age })
    const count = await User.countDocuments({ age })

    return user
}

updateAgeandCount('5d39d4bf0c92e44480200518',23).then((user) => {
    console.log(user)
}).catch((e) =>{
   console.log(e)
})