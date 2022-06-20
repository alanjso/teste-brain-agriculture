const validarFormatarProdutorRural = require('../../utils/validar-formatar-produtor-rural');
const { ProdutorRural } = require('./produtor-rural-model');
const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');
const jwtSecret = config.get("jwtSecret");
const saltRounds = config.get("saltRounds");

module.exports = {

    list: async (offset, limit) => {
        // Retorna de forma ordenada(nome do produtor) e paginada a lista dos produtores rurais
        try {
            const list = await ProdutorRural.findAndCountAll({
                attributes: { exclude: ['password'] },
                order: [['nome_produtor', 'ASC']],
                offset,
                limit
            });
            return { statusCode: 200, list, msg: 'Sucesso' };
        } catch (error) {
            console.log("** erro pr list**");
            console.log(error);
            const list = [];
            return { list, msg: 'Falha', error };
        }
    },

    create: async (reqBody) => {
        // Cria um produtor rural
        try {
            const { isValid, produtorRuralFormatado } = await validarFormatarProdutorRural(reqBody);
            if (!isValid) {
                return { statusCode: 400, msg: 'Falha', error: 'Formulário inválido' };
            }
            await ProdutorRural.create(produtorRuralFormatado);
            return { statusCode: 200, msg: 'Sucesso' };
        } catch (error) {
            // console.log("** erro pr create **");
            // console.log(error);
            return { statusCode: 500, msg: 'Falha', error };
        }
    },

    edit: async (id, reqBody) => {
        try { // Verifica ser o id é valído e existe
            const response = await ProdutorRural.findOne({ where: { id: id } });
            if (!response) {
                return { statusCode: 404, msg: 'Falha', error: 'Objeto não encontrado' };
            }
        } catch (error) {
            console.log("** erro pr edit **");
            console.log(error);
            return { statusCode: 500, msg: 'Falha', error };
        }

        try {
            const { isValid, produtorRuralFormatado } = await validarFormatarProdutorRural(reqBody);
            if (!isValid) {
                return { statusCode: 400, msg: 'Falha', error: 'Formulário inválido' };
            }
            await ProdutorRural.update(produtorRuralFormatado, {
                where: { id: id }
            });

            return { statusCode: 200, msg: 'Editado com sucesso' };
        } catch (error) {
            console.log("** erro pr edit **");
            console.log(error);
            return { statusCode: 500, msg: 'Falha', error };
        }
    },

    getById: async (id) => {
        // Retorna um produtor rural especifico pelo id
        try {
            const response = await ProdutorRural.findOne({ where: { id: id }, attributes: { exclude: ['password'] } });
            return { statusCode: 200, msg: 'Sucesso', response };
        } catch (error) {
            console.log("** erro pr getById **");
            console.log(error);
            return { statusCode: 500, msg: 'Falha', error };
        }
    },

    delete: async (id) => {
        // Deleta um produtor rural baseado no id, se encontrar.
        try { // Verifica ser o id é valído e existe
            const response = await ProdutorRural.findOne({ where: { id: id } });
            if (!response) {
                return { statusCode: 404, msg: 'Falha', error: 'Objeto não encontrado' };
            }
        } catch (error) {
            console.log("** erro pr find for delete **");
            console.log(error);
            return { statusCode: 500, msg: 'Falha', error };
        }
        try {
            await ProdutorRural.destroy({ where: { id: id } });
            return { statusCode: 200, msg: 'Deletado' };
        } catch (error) {
            console.log("** erro pr delete **");
            console.log(error);
            return { statusCode: 500, msg: 'Falha', error };
        }
    },

    login: async (reqBody) => {
        let produtorEncontrado;
        try { // Verifica ser o id é valído e existe
            produtorEncontrado = await ProdutorRural.findOne({ where: { document: reqBody.document } });
            if (!produtorEncontrado) {
                return { statusCode: 404, msg: 'Documento ou senha inválida', error: 'Objeto não encontrado' };
            }
        } catch (error) {
            console.log("** erro pr find for login **");
            console.log(error);
            return { statusCode: 500, msg: 'Falha', error };
        }

        try {
            let comparedPw = await bcrypt.compare(reqBody.password, produtorEncontrado.password);
            if (!comparedPw) {
                return { statusCode: 404, msg: 'Documento ou senha inválida', error: 'Objeto não encontrado' };
            }

            const token = jwt.sign({
                data: {
                    nome_produtor: produtorEncontrado.nome_produtor,
                    document: produtorEncontrado.document,
                }
            }, jwtSecret, { expiresIn: '12h' });

            return { statusCode: 200, msg: 'Login feito com sucesso', result: token };
        } catch (error) {
            console.log("** erro pr login **");
            console.log(error);
            return { statusCode: 500, msg: 'Falha', error };
        }
    },

    changePassword: async (reqBody) => {
        let produtorEncontrado;
        try { // Verifica ser o id é valído e existe
            produtorEncontrado = await ProdutorRural.findOne({ where: { document: reqBody.document } });
            if (!produtorEncontrado) {
                return { statusCode: 404, msg: 'Documento ou senha inválida', error: 'Objeto não encontrado' };
            }
        } catch (error) {
            console.log("** erro pr find for login **");
            console.log(error);
            return { statusCode: 500, msg: 'Falha', error };
        }

        try {
            let comparedPw = await bcrypt.compare(reqBody.password, produtorEncontrado.password);
            if (!comparedPw) {
                return { statusCode: 404, msg: 'Documento ou senha inválida', error: 'Objeto não encontrado' };
            }

            let editProdutorPassword = { ...produtorEncontrado.dataValues };
            editProdutorPassword.password = await bcrypt.hash(reqBody.new_password, saltRounds);
            await ProdutorRural.update(editProdutorPassword, {
                where: { id: editProdutorPassword.id }
            });

            return { statusCode: 200, msg: 'Senha alterada com sucesso' };
        } catch (error) {
            console.log("** erro pr changePassword **");
            console.log(error);
            return { statusCode: 500, msg: 'Falha', error };
        }
    },

    resetPassword: async (reqBody) => {
        let produtorEncontrado;
        try { // Verifica ser o id é valído e existe
            produtorEncontrado = await ProdutorRural.findOne({ where: { document: reqBody.document } });
            if (!produtorEncontrado) {
                return { statusCode: 404, msg: 'Documento ou senha inválida', error: 'Objeto não encontrado' };
            }
        } catch (error) {
            console.log("** erro pr find for login **");
            console.log(error);
            return { statusCode: 500, msg: 'Falha', error };
        }

        try {

            let resetProdutorPassword = { ...produtorEncontrado.dataValues };
            resetProdutorPassword.password = await bcrypt.hash('123456', saltRounds);
            await ProdutorRural.update(resetProdutorPassword, {
                where: { id: resetProdutorPassword.id }
            });

            return { statusCode: 200, msg: 'Senha alterada com sucesso' };
        } catch (error) {
            console.log("** erro pr resetpw **");
            console.log(error);
            return { statusCode: 500, msg: 'Falha', error };
        }
    }
}