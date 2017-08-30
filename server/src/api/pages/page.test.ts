var should = require('should');
var assert = require('assert');
var request = require('supertest');
var config = require('../../__test__/test.config.ts')

describe('============页面api测试============', function () {

    before(function (done) {
        done();
    });

    // 新增页面
    describe('#/api/page', function (done) {
        it('新增页面', function (done) {
            var profile = {
                "title": "横说竖说253363344w4" + new Date() * 1,
                "content": [{
                    "id": "1",
                    "cells": [{
                        "id": "5ac89ec4-7536-4120-a072-8eedad0a48ff",
                        "inline": null,
                        "size": 12
                    }]
                }]
            }
            request(config.url)
                .post('/api/page')
                .set('Cookie', config.userCookie)
                .send(profile)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    config.pageId = res.body.data.id;
                    res.body.code.should.equal(200);
                    done();
                });
        })
    })

    // 通过id查询页面
    describe('#/api/page/query/', function (done) {
        it('通过id查询页面', function (done) {
            request(config.url)
                .get('/api/page/query/' + config.pageId)
                .set('Cookie', config.userCookie)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body.code.should.equal(200);
                    done();
                });
        })
    })

    // 修改页面
    describe('#/api/page/update', function (done) {
        it('修改页面', function (done) {
            var profile = {
                "id": config.pageId,
                "title": "修改页面" + new Date() * 1,
                "page": [{
                    "id": "1",
                    "cells": [
                    {
                        "id": "5ac89ec4-7536-4120-a072-8eedad0a48ff",
                        "inline": null,
                        "size": 12
                    }
                    ]
                }]
            }
            request(config.url)
                .post('/api/page/update')
                .set('Cookie', config.userCookie)
                .send(profile)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body.code.should.equal(200);
                    done();
                });
        })
    })

    // 分页查询
    describe('#/api/page/queryByTitle', function (done) {
        it('分页查询', function (done) {
            request(config.url)
                .get(`/api/page/queryByTitle?pageSize=10&page=1`)
                .set('Cookie', config.userCookie)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body.code.should.equal(200);
                    done();
                });
        })
    })

    // fork页面
    describe('#/api/page/update/fork', function (done) {
        it('fork页面', function (done) {
            request(config.url)
                .post('/api/page/update/fork')
                .set('Cookie', config.userCookie)
                .send({
                    "id": config.pageId,
                    "title": "我是被fork"
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body.code.should.equal(200);
                    done();
                });
        })
    })

    // 获取fork人集合
    describe('#/api/fork?page=', function (done) {
        it('获取fork人集合', function (done) {
            request(config.url)
                .post('/api/page/update/fork')
                .set('Cookie', config.userCookie)
                .send({
                    "id": config.pageId,
                    "title": "我是被fork"
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body.code.should.equal(200);
                    done();
                });
        })
    })

    // 分享页面给指定用户
    describe('#/api/page/share', function (done) {
        it('分享页面给指定用户', function (done) {
            request(config.url)
                .post('/api/page/share')
                .set('Cookie', config.userCookie)
                .send({
                    "pageId": config.pageId,
                    "userId": "59942d2875a68fc803215fab"
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body.code.should.equal(200);
                    done();
                });
        })
    })

    // 分页查询自己页面
    describe('#/api/page/lists', function (done) {
        it('分页查询自己页面', function (done) {
            request(config.url)
                .get(`/api/page/lists?pageSize=10&page=1`)
                .set('Cookie', config.userCookie)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body.code.should.equal(200);
                    done();
                });
        })
    })

    // 发布页面
    describe('#/api/page/publish', function (done) {
        it('发布页面', function (done) {
            request(config.url)
                .post(`/api/page/publish`)
                .set('Cookie', config.userCookie)
                .send({
                    "id": config.pageId,
                    "type": true
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    done();
                });
        })
    })

    // 取消发布
    describe('#/api/page/publish', function (done) {
        it('取消发布', function (done) {
            request(config.url)
                .post(`/api/page/publish`)
                .set('Cookie', config.userCookie)
                .send({
                    "id": config.pageId,
                    "type": false
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    done();
                });
        })
    })

    // 通过id删除指定页面
    describe('#/api/page/remove/', function (done) {
        it('通过id删除指定页面', function (done) {
            request(config.url)
                .get(`/api/page/remove/${config.pageId}`)
                .set('Cookie', config.userCookie)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body.code.should.equal(200);
                    done();
                });
        })
    })
});