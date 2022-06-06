const express = require('../src/server');
let chai = require('chai');
let request = require('supertest')(express);
let assert = chai.assert;

const SERVICE = '/v1/dashboard/produtorrural';
describe('########## Dashboard ##########\n', function () {

    this.beforeAll(async () => {
    });

    it('Dashboard completo: status code 200 e prenchido', async () => {
        await request.get(`${SERVICE}/completo`).expect(function (res) {
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
        await request.get(`${SERVICE}/total-fazendas`).expect(function (res) {
            assert.equal(res.statusCode, '200');
            assert.isDefined(res.body);
            assert.isAbove(res.body.totalFazendas, 0);
        });
    });

    it('Dashboard total hectares fazendas: status code 200 e prenchido', async () => {
        await request.get(`${SERVICE}/total-hectares`).expect(function (res) {
            assert.equal(res.statusCode, '200');
            assert.isDefined(res.body);
            assert.isAbove(res.body.totalHectaresFazendas, 0);
        });
    });

    it('Dashboard Pizza Estados: status code 200 e prenchido', async () => {
        await request.get(`${SERVICE}/pizza-estados`).expect(function (res) {
            assert.equal(res.statusCode, '200');
            assert.isDefined(res.body);
            assert.isArray(res.body.pizzaEstados);
        });
    });

    it('Dashboard: pizza culturas: status code 200 e prenchido', async () => {
        await request.get(`${SERVICE}/pizza-culturas`).expect(function (res) {
            assert.equal(res.statusCode, '200');
            assert.isDefined(res.body);
            assert.isArray(res.body.pizzaCulturas);
        });
    });

    it('Dashboard: Pizza uso do solo: status code 200 e prenchido', async () => {
        await request.get(`${SERVICE}/pizza-uso-solo`).expect(function (res) {
            assert.equal(res.statusCode, '200');
            assert.isDefined(res.body);
            assert.isArray(res.body.usoSolo);
        });
    });
});