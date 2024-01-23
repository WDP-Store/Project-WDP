import express from "express";
import * as dotenv from 'dotenv';
import connect from "./config/connect.js"
import route from './routes/index.js';
// .env
dotenv.config();

// default port = 9999
const port = process.env.PORT || 8888;

const app = express();

route(app);

app.listen(port, async(req, res) => {
    //connect successfully then listen on port
    await connect();
    console.log(`Start on port ${port}`);
}); 