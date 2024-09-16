import express from "express"
import "dotenv/config"  
import userRouter from "./router/userRouter.js"
import cors from  "cors"
import conectDB from "./dataBase/db.js"
import privateRouter from "./router/privateRouter.js"
import comprobacionJwt from "./middleware/comprobacionJwt.js"

const app = express();
app.use(cors());

const PORT = process.env.PORT || 8080

//Rutas
app.use(express.json());
app.use("/api",userRouter) //Endpoint http://localhost:3000/api/users
app.use("/api", comprobacionJwt, privateRouter)

const initApp = () =>{
    try {
        conectDB();
        app.listen(PORT, ()=>{
            console.log(`Server corriendo en el puerto ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}
initApp();