var mongoose = require("mongoose")

// const conn = async () => {
//     try {
//         const url = "mongodb://127.0.0.1:27017/crud"
//         const conne = await mongoose.connect(url,
//             {
//                 useUnifiedTopology: true,
//                 useNewUrlParser: true,
//                 //     useFindAndModify: false , 
//                 //     useCreateIndex: true,
//                 //     socketTimeoutMS: 60000,
//                 //     connectTimeoutMS: 60000,
//                 //     poolSize: 10
//             }
//         )
//         console.log(`database conection is done `)
//     } catch (error) {
//         console.log(error)
//     }
// }

// module.exports = conn;

const connectDb = async () => {
    try {
        const url = "mongodb://127.0.0.1:27017/crud"
        const conn = await mongoose.connect(url, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
        console.log(`server side run on port 8000`)
        console.log(`connected project mongodb ${conn.connection.host}`)
    } catch (error) {
        console.error(`Error - ${error.message}`);
        process.exit(1);
    }
}
module.exports = connectDb;

