import express, { urlencoded } from 'express'
import dotenv from 'dotenv'
import { connectPassport } from './utils/Provider.js'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import passport from 'passport';
import { errorMiddleware } from './middleware/errorMiddleware.js'
import cors from "cors"
import { Message } from './models/Message.js'

const app = express();

export default app;

//define the path of the config file

dotenv.config({
    path: "./config/config.env"
})

//using middleware

app.use(
    session({
        name: 'connect.sid',
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        //we provide name of the cookie here  [actually this is for cookies]

        cookie: {
            secure: process.env.NODE_ENV === "development" ? false : true,
            httpOnly: process.env.NODE_ENV === "development" ? false : true,
            sameSite: process.env.NODE_ENV === "development" ? false : "none",
        },
        // cookie: {
        //     secure: false,
        //     httpOnly: false,
        //     sameSite: false,
        // },
    })
);
console.log(process.env.NODE_ENV);
//now connect session and google auth

app.use(cookieParser());
app.use(express.json())

app.use(
    urlencoded({
        extended: true,
    }))

app.use(
    cors({
        credentials: true,
        origin: process.env.FRONTEND_URL,
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
)



app.use(passport.authenticate("session"))
app.use(passport.initialize());
app.use(passport.session());
app.enable("trust proxy");
connectPassport();

//Importing Routes
app.post('/api/v1/contactform', async (req, res) => {
    try {
      const contact = new Message(req.body);
      await contact.save();
      res.status(200).send({ message: 'Success', contact });
    } catch (error) {
      console.error('Error saving contact:', error);
      res.status(500).send({ error: 'Internal Server Error' });
    }
  });
  
import userRoute from "./routes/user.js"
import orderRoute from "./routes/order.js"


app.use('/api/v1', userRoute);
app.use('/api/v1', orderRoute);


//using error middleware 
app.use(errorMiddleware);
