import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import { engine } from 'express-handlebars';
import cookieParser from 'cookie-parser';
import TaskRouter from './app/routers/TaskRouter';
const app: Express = express();


mongoose.connect('mongodb://127.0.0.1:27017/projekt-todo');

app.use(express.urlencoded({ extended: true }))

app.engine('hbs', engine({
    extname: '.hbs'
}));
app.set("view engine", "hbs");
app.set('views', __dirname + '/views');
app.use(cookieParser());
app.use(express.json());






app.use('/', TaskRouter);


app.listen(8080, () => {
    console.log(`Server is active`);
});
