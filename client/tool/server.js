/**
 * @file server.js
 * @author denglingbo
 */

var path = require('path');
var LocalServer = require('freed-spa/tool/server');

var ROOT_PATH = path.resolve(__dirname);

const __TEST__ = process.env.NODE_ENV === 'test';

var host = 'localhost';

var rules = [];

// 联调环境
if (__TEST__) {
    rules = [{
        pattern: /https?:\/\/[\w\.]*(?::\d+)?\/(.+)/,
        responder: 'http://localhost:3000/$1'
    }];
} else {
    rules = [{
        pattern: /https?:\/\/[\w\.]*(?::\d+)?\/.+\/(\w+)*/,
        responder: path.join(ROOT_PATH, '../mock/') + '$1.json'
    }];
}

var proxyConfig = {
    port: 3000,
    rules: rules
};

var devConfig = {
    host: host,
    port: 8000,
    proxy: {
        '/api': `http://${host}:${proxyConfig.port}`,
        '/fc-web': `http://${host}:${proxyConfig.port}`,
    }
};

LocalServer({
    proxyConfig: proxyConfig,
    devConfig: devConfig,
});