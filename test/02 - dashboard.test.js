const express = require('../src/server');
let chai = require('chai');
let request = require('supertest')(express);
let assert = chai.assert;
const config = require('config');
const jwt = require('jsonwebtoken');
const jwtSecret = config.get("jwtSecret");

const SERVICE = '/v1/dashboard/produtorrural';
let token;
describe('########## Dashboard ##########\n', function () {

    this.beforeAll(async () => {
        token = jwt.sign({
            data: {
                nome_produtor: 'Admin',
                document: '01234567891',
            }
        }, jwtSecret, { expiresIn: '1m' });
    });

    it('Dashboard completo: status code 200 e prenchido', async () => {
        await request.get(`${SERVICE}/completo`)
            .set("Authorization", `Bearer ${token}`).expect(function (res) {
                assert.equal(res.statusCode, '200');
                assert.isDefined(res.body);
                assert.isArray(res.body.usoSolo);
                assert.isArray(res.body.pizzaEstados);
                assert.isArray(res.body.pizzaCulturas);
                assert.isAbove(res.body.totalFazendas, 0);
                assert.isAbove(res.body.totalHectaresFazendas, 0);
            });
    });

    it('Dashboard total qtde fazendas: status code 200 e prenchido', async () => {
        await request.get(`${SERVICE}/total-fazendas`)
            .set("Authorization", `Bearer ${token}`).expect(function (res) {
                assert.equal(res.statusCode, '200');
                assert.isDefined(res.body);
                assert.isAbove(res.body.totalFazendas, 0);
            });
    });

    it('Dashboard total hectares fazendas: status code 200 e prenchido', async () => {
        await request.get(`${SERVICE}/total-hectares`)
            .set("Authorization", `Bearer ${token}`).expect(function (res) {
                assert.equal(res.statusCode, '200');
                assert.isDefined(res.body);
                assert.isAbove(res.body.totalHectaresFazendas, 0);
            });
    });

    it('Dashboard Pizza Estados: status code 200 e prenchido', async () => {
        await request.get(`${SERVICE}/pizza-estados`)
            .set("Authorization", `Bearer ${token}`).expect(function (res) {
                assert.equal(res.statusCode, '200');
                assert.isDefined(res.body);
                assert.isArray(res.body.pizzaEstados);
            });
    });

    it('Dashboard: pizza culturas: status code 200 e prenchido', async () => {
        await request.get(`${SERVICE}/pizza-culturas`)
            .set("Authorization", `Bearer ${token}`).expect(function (res) {
                assert.equal(res.statusCode, '200');
                assert.isDefined(res.body);
                assert.isArray(res.body.pizzaCulturas);
            });
    });

    it('Dashboard: Pizza uso do solo: status code 200 e prenchido', async () => {
        await request.get(`${SERVICE}/pizza-uso-solo`)
            .set("Authorization", `Bearer ${token}`).expect(function (res) {
                assert.equal(res.statusCode, '200');
                assert.isDefined(res.body);
                assert.isArray(res.body.usoSolo);
            });
    });
});