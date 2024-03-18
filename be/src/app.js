import express from "express";
import * as dotenv from 'dotenv';
import cors from "cors";
import helmet from "helmet";
import connect from "./config/connect.js"
import route from './routes/index.js';
import cookieParser from "cookie-parser";
import swaggerDocs from './swagger.js';
import client from "./config/connect_redis.js";
import session from "express-session";

const app = express();
// .env
dotenv.config();
 

// default port = 9999
const port = process.env.PORT || 8888;

//support call api FE -> BE
app.use(cors());
app.use(helmet());
app.use(cookieParser());

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//use session
app.use(session({
    secret: '99',
    resave: false,
    saveUninitialized: false
  }));

route(app);

app.listen(port, async (req, res) => {
    //connect successfully then listen on port
    await connect();
    client
    swaggerDocs(app, port)
    console.log(`Start on port ${port}`);
}); 