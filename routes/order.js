import express from 'express'
import { AuthorizeAdmin, isAuthenticate } from '../middleware/auth.js';
import { getAdminOrders, getMyorders, getOrderDetails, paymentVerification, placeOrder, placeOrderOnline, processOrder } from '../controllers/order.js';

const router = express.Router();


router.post("/createorder", isAuthenticate, placeOrder)

router.post("/createorderonline", isAuthenticate, placeOrderOnline)


router.post("/paymentverification", isAuthenticate, paymentVerification)

router.get("/myorders", isAuthenticate, getMyorders)


router.get("/order/:id", isAuthenticate, getOrderDetails)

//add admin middleware
router.get("/admin/order", isAuthenticate, AuthorizeAdmin, getAdminOrders);


router.get("/admin/order/:id", isAuthenticate, AuthorizeAdmin, processOrder);

export default router;
