import express, { IRouter, Router, Response, Request } from 'express';
import { app } from '../index'
import { generateAccessToken } from '../utils/jwtAuth';

export const jwtRouter: Router = Router();
jwtRouter.use(express.json());


jwtRouter.post('/getToken', (req: Request, res: Response) => {
    const token = generateAccessToken({ username: req.body.username });
    res.json({jwt_token: token});
})