import mongoose from "mongoose";

const URI = process.env.MONGO_URI
const DB  = process.env.MONGO_DB

const conectDB = async  () => {
    try {
        await mongoose.connect(`${URI}/${DB}`,)
        console.log("concectado a la base de datos") 
    } catch (error) {
        console.log(error)
    }
}

export default conectDB