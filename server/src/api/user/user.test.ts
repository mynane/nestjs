var should = require('should');
var assert = require('assert');
var request = require('supertest');
var config = require('../../__test__/test.config.ts');

describe('============用户api测试============', function () {
    before(function (done) {
        done();
    });

    // 新增接口
    describe('#/api/users', function () {
        var profile = {
            "userName": "22qwe" + new Date().getTime(),
            "password": "12qwaszx",
            "userDspName": "huazaierli",
            "sex": 1,
            "phone": 18381333613,
            "email": "755836844@qq.com"
        }
        it('将新增成功', function (done) {
            request(config.url)
                .post('/api/users')
                .set('Cookie', config.userCookie)
                .send(profile)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body.code.should.equal(200);
                    config.userId = res.body.data.id;
                    done();
                });
        })
    })

    // 通过id查找接口
    describe('#/api/users/find?id=', function () {
        it('将返回用户信息', function (done) {
            request(config.url)
                .get('/api/users/find?id=' + config.userId)
                .set('Cookie', config.userCookie)
                .expect('Content-Type', /json/)
                .expect(200) //Status code
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body.code.should.equal(200);
                    done();
                });
        });
    });

    // 查询所有用户
    describe('#/api/users', function () {
        it('查询所有用户', function (done) {
            request(config.url)
            .get('/api/users')
            .set('Cookie', config.userCookie)
            .expect('Content-type', /json/)
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

    // 退出登录接口
    describe('#/api/users/logout', function () {
        it('退出登录', function (done) {
            request(config.url)
            .get('/api/users/logout')
            .set('Cookie', config.userCookie)
            .expect('Content-type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    throw err;
                }
                res.body.code.should.equal(200);
                done();
            })
        })
    })
});