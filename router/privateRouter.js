import express from "express"
 

const router = express.Router();

router.get("/admin",(req,res)=>{
    res.json({
        error: null,
        data: {
            title: "Admin",
            user: req.user,
        }
    })
})

export default router;