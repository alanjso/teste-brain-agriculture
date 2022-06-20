const produtorRuralController = require('./produtor-rural-controller');

module.exports = {

    list: async (req, res) => {
        // Retorna de forma ordenada(nome do produtor) e paginada a lista dos produtores rurais
        try {
            let { page = 1, limit = 10 } = req.query;
            const offset = (page - 1) * limit;

            const { statusCode, list, msg } = await produtorRuralController.list(offset, limit);
            res.status(statusCode).json({ list, msg });
        } catch (error) {
            console.log("** erro req list**");
            console.log(error);
            res.status(500).json(error);
        }
    },

    create: async (req, res) => {
        // Cria um produtor rural
        try {
            const { statusCode, msg, error } = await produtorRuralController.create(req.body);
            res.status(statusCode).json({ msg, error });
        } catch (error) {
            console.log("** erro req create **");
            console.log(error);
            res.status(500).json(error);
        }
    },

    edit: async (req, res) => {
        // Edita um produtor rural baseado no id
        try {
            const { statusCode, msg, error } = await produtorRuralController.edit(req.params.id, req.body);
            res.status(statusCode).json({ msg, error });
        } catch (error) {
            console.log("** erro req edit **");
            console.log(error);
            res.status(500).json(error);
        }
    },

    getById: async (req, res) => {
        // Retorna um produtor rural especifico pelo id
        try {
            const { statusCode, response, msg, error } = await produtorRuralController.getById(req.params.id);
            res.status(statusCode).json({ response, msg, error });
        } catch (error) {
            console.log("** erro req getById **");
            console.log(error);
            res.status(500).json(error);
        }
    },

    delete: async (req, res) => {
        // Deleta um produtor rural baseado no id, se encontrar.
        try {
            const { statusCode, msg, error } = await produtorRuralController.delete(req.params.id);
            res.status(statusCode).json({ msg, error });
        } catch (error) {
            console.log("** erro req delete **");
            console.log(error);
            res.status(500).json(error);
        }
    },

    login: async (req, res) => {
        try {
            const { statusCode, result, msg, error } = await produtorRuralController.login(req.body);
            res.status(statusCode).json({ result, msg, error });
        } catch (error) {
            console.log("** erro req login**");
            console.log(error);
            res.status(500).json(error);
        }
    },

    changePassword: async (req, res) => {
        try {
            const { statusCode, result, msg, error } = await produtorRuralController.changePassword(req.body);
            res.status(statusCode).json({ result, msg, error });
        } catch (error) {
            console.log("** erro req changePassword**");
            console.log(error);
            res.status(500).json(error);
        }
    },

    resetPassword: async (req, res) => {
        try {
            const { statusCode, result, msg, error } = await produtorRuralController.resetPassword(req.body);
            res.status(statusCode).json({ result, msg, error });
        } catch (error) {
            console.log("** erro req resetPassword**");
            console.log(error);
            res.status(500).json(error);
        }
    }
}