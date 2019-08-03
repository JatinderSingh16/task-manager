const {MongoClient, ObjectID } = require('mongodb')
const connectionURL = 'mongodb://127.0.0.1:27017'

const databaseName = 'task-manager'

// id In mongo db use field _id if you want
// const id = new ObjectID
// console.log(id)

MongoClient.connect(connectionURL,{useNewUrlParser:true}, (error,client) => {

    if(error)
    {
             return console.log('Unable to connect with database')
    }
    
    const db = client.db(databaseName)

 //Insertion

    // db.collection('user').insertOne({
    //     name : 'Jatinder',
    //     age : 22
    // },(error,result) => {
    //    //This is callback function
    //     if(error){
    //         return console.log('Unable to insert')
    //     }
          
    //     console.log(result.ops)
    // })


    // db.collection('task').insertMany([{
    //             description : 'Ready to Go',
    //             complete : true
    //         },{
    //             description : 'Not Ready to Go',
    //             complete : false
    //         },{
    //             description : 'Always Ready to Go',
    //             complete : true
    //         }
    //  ],(error,result) => {
    //    //This is callback function
    //     if(error){
    //         return console.log('Unable to insert document')
    //     }
          
    //     console.log(result.ops)
    // })

//Find or Selection

//   db.collection('user').findOne({name : 'Jatinder'},(error,result) => {
//        //This is callback function
//         if(error){
//             return console.log('Unable to find data')
//         }
          
//         console.log(result)
//     })

// db.collection('user').find({age:22}).toArray((error,result) => {
//     //This is callback function
//      if(error){
//          return console.log('Unable to find data')
//      }    
//      console.log(result)
//  })


// db.collection('user').find({age:22}).count((error,result) => {
//     //This is callback function
//      if(error){
//          return console.log('Unable to find data')
//      }
       
//      console.log(result)
//  })


//Updation 

//   const updatePromise = db.collection('user').updateOne({
//        _id: new ObjectID("5d389ae7a114e92e3aadffae")
//     },{
//       $set:{
//         name:'Doraemee',
//         age:23
//       } 
//     })

//     updatePromise.then((result) => {
//         console.log(result)
//     }).catch((error) => {
//         console.log(error)
//     })

//Deletion 


//   const deletePromise = db.collection('user').deleteOne({
//        _id: new ObjectID("5d395a2a6f10e31c69562495")
//     })

//     deletePromise.then((result) => {
//         console.log(result)
//     }).catch((error) => {
//         console.log(error)
//     })
   
})