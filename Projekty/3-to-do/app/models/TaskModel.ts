import mongoose from 'mongoose';
import { Task } from '../interfaces/types';



const TaskSchema = new mongoose.Schema({
    title: {type: String, required: true},
    completed: {type: Boolean, required: true}
});

export default mongoose.model<Task>('TaskSchema', TaskSchema);