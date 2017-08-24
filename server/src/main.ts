process.env.NODE_ENV = process.env.NODE_ENV || 'development';

import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as session from 'express-session';
import { ApplicationModule } from './app.module';
import * as config from './config/environment';

const app = express();


// connect to datebase
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
	console.error('MongoDB connection error: ' + err);
	process.exit(-1);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser('static-page'));
app.use(session({
    secret: 'static-page',
    resave: true,
    saveUninitialized: true
}));

const nest = NestFactory.create(ApplicationModule, app);
nest.setGlobalPrefix('api');

nest.listen(config.port || 3000, () => {
    console.log(`Nest app is listening on port ${config.port}.`);
}
);