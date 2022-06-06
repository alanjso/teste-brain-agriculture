const validarFormatarProdutorRural = require('../../utils/validar-formatar-produtor-rural');
const { ProdutorRural } = require('./produtor-rural-model');

module.exports = {

    list: async (req, res) => {
        // Retorna de forma ordenada(nome do produtor) e paginada a lista dos produtores rurais
        try {
            let { page = 1, limit = 10 } = req.query;
            const offset = (page - 1) * limit;

            const list = await ProdutorRural.findAndCountAll({
                order: [['nome_produtor', 'ASC']],
                offset,
                limit
            });
            res.status(200).json(list);
        } catch (error) {
            console.log("** erro pr list**");
            console.log(error);
            res.status(500).json(error);
        }
    },

    create: async (req, res) => {
        // Cria um produtor rural
        try {
            const { isValid, produtorRuralFormatado } = await validarFormatarProdutorRural(req.body);
            if (!isValid) {
                return res.status(400).json({ erro: 'Formulário inválido' });
            }
            await ProdutorRural.create(produtorRuralFormatado);
            res.status(200).json('success');
        } catch (error) {
            console.log("** erro pr create **");
            console.log(error);
            res.status(500).json(error);
        }
    },

    edit: async (req, res) => {
        // Edita um produtor rural baseado no id
        try { // Verifica ser o id é valído e existe
            const response = await ProdutorRural.findOne({ where: { id: req.params.id } });
            if (!response) {
                return res.status(404).json({ erro: 'Objeto não encontrado' });
            }
        } catch (error) {
            console.log("** erro pr edit **");
            console.log(error);
            return res.status(500).json(error);
        }

        try {
            const { isValid, produtorRuralFormatado } = await validarFormatarProdutorRural(req.body);
            if (!isValid) {
                return res.status(400).json({ erro: 'Formulário inválido' });
            }
            await ProdutorRural.update(produtorRuralFormatado, {
                where: { id: req.params.id }
            });

            res.status(200).json({ msg: 'Editado com sucesso' });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    getById: async (req, res) => {
        // Retorna um produtor rural especifico pelo id
        try {
            const response = await ProdutorRural.findOne({ where: { id: req.params.id } });
            res.status(200).json(response);
        } catch (error) {
            console.log("** erro pr getById **");
            console.log(error);
            res.status(500).json(error);
        }
    },

    delete: async (req, res) => {
        // Deleta um produtor rural baseado no id, se encontrar.
        try { // Verifica ser o id é valído e existe
            const response = await ProdutorRural.findOne({ where: { id: req.params.id } });
            if (!response) {
                return res.status(404).json({ erro: 'Objeto não encontrado' });
            }
        } catch (error) {
            console.log("** erro pr delete **");
            console.log(error);
            return res.status(500).json(error);
        }
        try {
            await ProdutorRural.destroy({ where: { id: req.params.id } });
            res.status(200).json({ msg: "Deletado" });
        } catch (error) {
            console.log("** erro pr delete **");
            console.log(error);
            res.status(500).json(error);
        }
    }
}