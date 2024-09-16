import express from "express"
import userControllers from "../controllers/userControllers.js";

const router  = express.Router();
    
    router.get("/users", userControllers.getUsers);

    router.post("/register", userControllers.registroUsuario);

    router.delete("/user/:id",userControllers.deleteUser);
 
    router.post("/login", userControllers.loginUser);

    router.put("/user/:id",userControllers.updateUser)
 
export default router;