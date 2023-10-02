import { Router } from 'express';
import * as TaskController from '../controllers/TaskController';
const router = Router()

router.get('/', TaskController.index);



export default router;