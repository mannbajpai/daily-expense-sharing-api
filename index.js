import express from "express";
import { configDotenv } from "dotenv";
configDotenv();

const app = express();
const PORT = process.env.PORT || 8000;

app.listen(PORT, ()=>{
    console.log("App listening on port : ",PORT);
})