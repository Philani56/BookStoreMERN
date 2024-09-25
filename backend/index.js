import express, { request, response } from "express"; // Correct way to import express
import { PORT, mongoDBURL } from "./config.js"; // Ensure correct relative path and extension
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

// Middleware forpassing request body
app.use(express.json());

// Middleware for Handling CORS Policy
app.use(cors());
//    app.use(
//    cors({
//        origin: 'http://localhost:3000',
//        methods: ['GET', 'POST', 'PUT', 'DELETE'],
//        allowedHeaders: ['Content-Type'],
//    })
//);

app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('Hi welcome')
});

app.use('/books', booksRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });