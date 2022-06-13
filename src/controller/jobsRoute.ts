import express, { Request, Response } from "express";
import { authenticateToken } from '../utils/jwtAuth';
import { getJobs, postJob } from "./jobsCrud";

export const jobsRouter = express.Router();

jobsRouter.use(express.json());

// CRUD
jobsRouter.get("/", /* authenticateToken,*/ async (req: Request, res: Response) => {
    getJobs(req, res);
});

jobsRouter.post("/", authenticateToken, async (req: Request, res: Response) => {
    postJob(req, res);
});