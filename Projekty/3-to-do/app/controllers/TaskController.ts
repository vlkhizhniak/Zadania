import TaskModel from '../models/TaskModel';
import { Request, Response } from 'express';
import  {Task} from '../interfaces/types';


export const index = (req: Request  , res: Response) =>{
        res.render('home')
    }