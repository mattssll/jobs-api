import express from "express";
import { connectToDatabase } from "./database/database";
import { jobsRouter } from "./routes/jobsRoutes";
import { jwtRouter } from "./routes/jwtRoutes";
import { port } from "./utils/jwtAuth";


// setup app

export const app = express()
app.use(express.json());


// start our webserver after connecting to database
connectToDatabase()
    .then(() => {

        app.use("/jobs", jobsRouter);
        app.use("/jwt", jwtRouter);

        app.listen(port, () => {       
            console.log(`Server started at port ${port}`);
        });

    }).catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });


// auxiliar jwt route
