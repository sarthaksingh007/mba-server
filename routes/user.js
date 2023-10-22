import express from 'express'
import passport from 'passport'
import { GetAdminStats, GetAdminUsers, MyProfile, logout } from '../controllers/user.js';
import { authorizeAdmin, isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

router.get("/googlelogin",
    passport.authenticate("google", {
        scope: ["profile"],
    }))

router.get("/login",
    passport.authenticate("google", {
        scope: ["profile"],
        successRedirect: process.env.FRONTEND_URL,
    })
    // passport.authenticate("google"),
    // (req,res,next)=>{
    //     res.send("Logged In");
    // }
); 

router.get("/me",isAuthenticated ,MyProfile);

router.get("/logout",logout); 

//admin routes
router.get("/admin/users",isAuthenticated,authorizeAdmin,GetAdminUsers)

router.get("/admin/stats",isAuthenticated,authorizeAdmin,GetAdminStats)

export default router;