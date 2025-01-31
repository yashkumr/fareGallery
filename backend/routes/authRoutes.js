import express from "express"
import { loginController, registerController } from "../controllers/authController.js";
import { requireSignIn } from "../middleware/authMiddleware.js";

const router = express.Router();


//registerRoute
router.post("/register", registerController);

// loginRoute
router.post("/login", loginController);

//Protected UserRoute
router.get("/user-auth", requireSignIn, (req, res)=>{
    res.status(200).send({ ok : true});
})
//Protected admin route
router.get("/admin-auth", requireSignIn, (req, res)=>{
    res.status(200).send({ ok : true});
})

export default router;