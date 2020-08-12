import * as cookieParser from 'cookie-parser';
import * as  express from 'express';
import * as logger from 'morgan';
import * as path from 'path';
import * as routes from './routes/index';

export const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/plot', express.static(path.join(__dirname, '../client/plot')));
app.use('/', express.static(path.join(__dirname, '../client/main')));

app.use('/', routes.router);
