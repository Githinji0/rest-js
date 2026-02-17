import express from 'express';
import {config} from "dotenv"
import movieRoutes from './routes/movieRoutes.js';

const app = express();

app.use("/movies", movieRoutes);
config()



const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`);
});