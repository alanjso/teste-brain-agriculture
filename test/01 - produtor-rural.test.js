const express = require('../src/server');
let chai = require('chai');
let request = require('supertest')(express);
let assert = chai.assert;
let { ProdutorRural } = require('../src/app/produtor-rural/produtor-rural-model');
const config = require('config');
const jwt = require('jsonwebtoken');
const jwtSecret = config.get("jwtSecret");

const SERVICE = '/v1/produtorrural';
let token;
describe('########## Produtor Rural ##########\n', function () {

    this.beforeAll(async () => {
        await ProdutorRural.destroy({ where: {} });

        token = jwt.sign({
            data: {
                nome_produtor: 'Admin',
                document: '01234567891',
            }
        }, jwtSecret, { expiresIn: '5m' });
    });

    it('Adiciona Produtor Rural com CPF sem pontos', async () => {
        await request.post(`${SERVICE}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                "document": "05738153057",
                "nome_produtor": "Produtor CPF sem pontos",
                "nome_fazenda": "Fazendinha Feliz!",
                "cidade": "Indaiatuba",
                "estado": "São Paulo",
                "area_total_fazenda": 100.0,
                "area_agricultavel": 50.0,
                "area_vegetacao": 50.0,
                "culturas_plantadas": ["soja", "milho", "algodão"],
                "password": "1q2w3e!Q@W#E"
            })
            .expect(function (res) {
                assert.equal(res.statusCode, '200');
            });
    });

    it('Adiciona Produtor Rural com CPF com pontos', async () => {
        await request.post(`${SERVICE}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                "document": "057.381.530-57",
                "nome_produtor": "Produtor CPF com pontos",
                "nome_fazenda": "Fazendinha Feliz 2!",
                "cidade": "Fortaleza",
                "estado": "Ceara",
                "area_total_fazenda": 100.0,
                "area_agricultavel": 50.0,
                "area_vegetacao": 50.0,
                "culturas_plantadas": ["soja", "milho", "algodão"],
                "password": "1q2w3e!Q@W#E"
            })
            .expect(function (res) {
                assert.equal(res.statusCode, '200');
            });
    });

    it('Adiciona Produtor Rural com CNPJ sem pontos', async () => {
        await request.post(`${SERVICE}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                "document": "39973526000193",
                "nome_produtor": "Produtor CNPJ sem pontos",
                "nome_fazenda": "Fazendinha Feliz 3!",
                "cidade": "Fortaleza",
                "estado": "Ceara",
                "area_total_fazenda": 100.0,
                "area_agricultavel": 50.0,
                "area_vegetacao": 50.0,
                "culturas_plantadas": ["soja", "milho", "algodão"],
                "password": "1q2w3e!Q@W#E"
            })
            .expect(function (res) {
                assert.equal(res.statusCode, '200');
            });
    });

    it('Adiciona Produtor Rural com CNPJ com pontos', async () => {
        await request.post(`${SERVICE}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                "document": "34.389.783/0001-69",
                "nome_produtor": "Produtor CNPJ com pontos",
                "nome_fazenda": "Fazendinha Feliz 4!",
                "cidade": "Fortaleza",
                "estado": "Ceara",
                "area_total_fazenda": 100.0,
                "area_agricultavel": 50.0,
                "area_vegetacao": 50.0,
                "culturas_plantadas": ["soja", "milho", "algodão"],
                "password": "1q2w3e!Q@W#E"
            })
            .expect(function (res) {
                assert.equal(res.statusCode, '200');
            });
    });

    it('Formulário inválido: CPF', async () => {
        await request.post(`${SERVICE}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                "document": "12345678901",
                "nome_produtor": "Formulário inválido",
                "nome_fazenda": "Fazendinha Feliz 0!",
                "cidade": "Fortaleza",
                "estado": "Ceara",
                "area_total_fazenda": 100.0,
                "area_agricultavel": 50.0,
                "area_vegetacao": 50.0,
                "culturas_plantadas": ["soja", "milho", "algodão"]
            })
            .expect(function (res) {
                assert.equal(res.statusCode, '400');
            });
    });

    it('Formulário inválido: CNPJ', async () => {
        await request.post(`${SERVICE}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                "document": "12345698701234",
                "nome_produtor": "Formulário inválido",
                "nome_fazenda": "Fazendinha Feliz 0!",
                "cidade": "Fortaleza",
                "estado": "Ceara",
                "area_total_fazenda": 100.0,
                "area_agricultavel": 50.0,
                "area_vegetacao": 50.0,
                "culturas_plantadas": ["soja", "milho", "algodão"],
                "password": "1q2w3e!Q@W#E"
            })
            .expect(function (res) {
                assert.equal(res.statusCode, '400');
            });
    });

    it('Formulário inválido: Soma das Áreas inválidas', async () => {
        await request.post(`${SERVICE}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                "document": "662.180.570-54",
                "nome_produtor": "Formulário inválido",
                "nome_fazenda": "Fazendinha Feliz 0!",
                "cidade": "Fortaleza",
                "estado": "Ceara",
                "area_total_fazenda": 99.0,
                "area_agricultavel": 50.0,
                "area_vegetacao": 50.0,
                "culturas_plantadas": ["soja", "milho", "algodão"],
                "password": "1q2w3e!Q@W#E"
            })
            .expect(function (res) {
                assert.equal(res.statusCode, '400');
            });
    });

    it('Formulário inválido: Cultura não listada no enum', async () => {
        await request.post(`${SERVICE}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                "document": "662.180.570-54",
                "nome_produtor": "Formulário inválido",
                "nome_fazenda": "Fazendinha Feliz 0!",
                "cidade": "Fortaleza",
                "estado": "Ceara",
                "area_total_fazenda": 100.0,
                "area_agricultavel": 50.0,
                "area_vegetacao": 50.0,
                "culturas_plantadas": ["Trigo"],
                "password": "1q2w3e!Q@W#E"
            })
            .expect(function (res) {
                assert.equal(res.statusCode, '500');
            });
    });

    it('Lista Produtores Rurais: Espera status 200 e 4 Produtores', async () => {
        await request.get(`${SERVICE}`)
            .set("Authorization", `Bearer ${token}`)
            .expect(function (res) {
                assert.equal(res.statusCode, '200');
                assert.equal(res.body.list.count, '4');
            });

    });

    it('Get por id de um Produtor Rural e recebe status code 200', async () => {
        const id = await (await request.get(`${SERVICE}`)
            .set("Authorization", `Bearer ${token}`)).body.list.rows[0].id
        await request.get(`${SERVICE}/${id}`)
            .set("Authorization", `Bearer ${token}`)
            .expect(function (res) {
                assert.equal(res.statusCode, '200');
            });
    });

    it('Deleta um Produtor Rural que existe e recebe status code 200', async () => {
        const id = await (await request.get(`${SERVICE}`).set("Authorization", `Bearer ${token}`)).body.list.rows[0].id
        await request.delete(`${SERVICE}/${id}`)
            .set("Authorization", `Bearer ${token}`)
            .expect(async function (res) {
                assert.equal(res.statusCode, '200');
                await request.get(`${SERVICE}`)
                    .set("Authorization", `Bearer ${token}`)
                    .expect(function (res) {
                        assert.equal(res.statusCode, '200');
                        assert.equal(res.body.list.count, '3');
                    });
            });
    });

    it('Edita um Produtor Rural que existe e recebe status code 200', async () => {
        const id = await (await request.get(`${SERVICE}`).set("Authorization", `Bearer ${token}`)).body.list.rows[0].id
        await request.put(`${SERVICE}/${id}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                "document": "39973526000193",
                "nome_produtor": "Produtor (cana de açúcar)",
                "nome_fazenda": "Fazendinha Feliz 3!",
                "cidade": "São Paulo",
                "estado": "São Paulo",
                "area_total_fazenda": 150.0,
                "area_agricultavel": 100.0,
                "area_vegetacao": 50.0,
                "culturas_plantadas": [
                    "Soja",
                    "Milho",
                    "Algodão",
                    "Cana de Açúcar",
                ],
                "password": "1q2w3e!Q@W#E"
            })
            .expect(async function (res) {
                assert.equal(res.statusCode, '200');
                await request.get(`${SERVICE}`)
                    .set("Authorization", `Bearer ${token}`)
                    .expect(function (res) {
                        assert.equal(res.statusCode, '200');
                        assert.equal(res.body.list.count, '3');
                    });
            });
    });
});