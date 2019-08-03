require('../src/db/mongoose')
const Task = require('../src/models/task')

// //promise-chaining method
// Task.findByIdAndDelete('5d39dcda3fd24b48af3e0c4b').then((task) => {
//    console.log(task)
//     return Task.countDocuments({completed:true}).then((count) => {
//         console.log(count)
//     }).catch((e) => {
//         console.log(e)
//     })
// })

//promise chaining method with the help of async and await

const deleteUserandCount = async (id,status) => {
  const task = await Task.findByIdAndDelete(id)
  const count = await Task.countDocuments({completed:status})
  return task
}

deleteUserandCount('5d39dd2b404dfa48c9beb54f',true).then((task) => {
    console.log(task)
}).catch((e) => {
    console.log(e)
})