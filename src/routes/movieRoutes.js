import express from 'express';



const router = express.Router();

router.get("/hello", (req, res)=>{
    res.json({
        title: "hello world",
    })
})
router.get("/", (req, res)=>{
    res.json({
        title: "hello world",
    })
})


export default router