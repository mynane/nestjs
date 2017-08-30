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

if (process.env.NODE_ENV === 'development') {
    app.all('*', function(req, res, next) {
        req.session.user = { _id: '59942d2875a68fc803215fab',
            userName: 'shijh',
            password: '12qwaszx',
            userDspName: 'huazaierli',
            phone: 18381333613,
            email: '755836844@qq.com',
            __v: 0,
            activity: true,
            birthday: '2017-08-16T11:31:52.192Z',
            sex: 1
        }
        res.header("Access-Control-Allow-Origin", "*");  
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Credentials", "true");
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
        res.header("X-Powered-By",' 3.2.1')  
        res.header("Content-Type", "application/json;charset=utf-8");  
        next();
    });
}

const nest = NestFactory.create(ApplicationModule, app);
nest.setGlobalPrefix('api');

nest.listen(config.port || 3000, () => {
    console.log(`Nest app is listening on port ${config.port}.`);
}
);