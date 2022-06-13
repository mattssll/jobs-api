import express from "express";
import { generateAccessToken } from './utils/jwtAuth';
import { connectToDatabase } from "./database/database";
import { jobsRouter } from "./controller/jobsRoute";
import { config } from "dotenv";


const app = express()
app.use(express.json());

app.post('/v1/api/getToken', (req, res) => {
    const token = generateAccessToken({ username: req.body.username });
    res.json({jwt_token: token});
    //const payload = fetchData(baseUrl, 100, 'Software Engineer')
})


config(); // to get env variables
const port = process.env.PORT

connectToDatabase().then(() => {
        
        app.use("/jobs", jobsRouter);

        app.listen(port, () => {       
            // start our express backend
            console.log(`Server started at http://localhost:${port}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });    
    

    /*cron.schedule('* * * * *', () => {
        const payload = fetchData(baseUrl, 3, 'Software Engineer');
    });*/

    
