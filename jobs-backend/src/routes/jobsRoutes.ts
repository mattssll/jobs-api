import express, { Request, Response, Router } from "express";
import { authenticateToken } from '../utils/jwtAuth';
import { getJobs, createJob } from "../controller/jobsCrud";


export const jobsRouter: Router = express.Router();
jobsRouter.use(express.json());



jobsRouter.get("/", /* authenticateToken,*/ async (req: Request, res: Response) => {
    getJobs(req, res);
});

jobsRouter.post("/", authenticateToken, async (req: Request, res: Response) => {
    createJob(req, res);
});