import express from "express";
import cors from 'cors';
import studentRoutes from './routes/student-routes';
import "reflect-metadata";
import { createConnection } from "typeorm";

//Declared
const app=express();
const port=3000;
createConnection().then(result=>{}).catch(error=>{console.error(error)});

//middleware

app.use(cors());
app.use(express.json());

//routes

app.use('/api-v1',studentRoutes)

app.listen(port,()=>{
    console.log(`listener Server http://localhost:${port}`);
})