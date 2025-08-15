import { Router } from "express";
import { userAuth } from "./middlewares/userAuth.js";
const router = Router();

router.use(userAuth);

router.post("/",function(req, res)
{

});


router.put("/",function(req, res)
{

});

router.delete("/",function(req,res)
{

});

router.get("/",function(req,res)
{

});

export default router;