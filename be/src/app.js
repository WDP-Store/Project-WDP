import express from "express";
import * as dotenv from 'dotenv';
import cors from "cors";
import connect from "./config/connect.js"
import route from './routes/index.js';
const app = express();
// .env
dotenv.config();

// default port = 9999
const port = process.env.PORT || 8888;

//support call api FE -> BE
app.use(cors());  

//middleware
app.use(express.json());

route(app);

app.listen(port, async(req, res) => {
    //connect successfully then listen on port
    await connect();
    console.log(`Start on port ${port}`);
}); 