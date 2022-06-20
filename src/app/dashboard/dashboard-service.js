const { ProdutorRural } = require('../produtor-rural/produtor-rural-model');
const pizzaCulturas = require('../../utils/func-pizza-culturas');
const pizzaEstados = require('../..//utils/func-pizza-estados');
const dashboardController = require('./dashboard-controller');

module.exports = {

    calcDashboardCompleto: async (req, res) => {
        try {
            const { statusCode, msg, erro, dashboard } = await dashboardController.calcDashboardCompleto();
            res.status(statusCode).json({ msg, erro, ...dashboard });
        } catch (error) {
            console.log("** Erro dashboard **");
            console.log(error);
            res.status(500).json(error);
        }
    },

    calcTotalFazendas: async (req, res) => {
        try {
            const { statusCode, msg, erro, dashboard } = await dashboardController.calcTotalFazendas();
            res.status(statusCode).json({ msg, erro, ...dashboard });
        } catch (error) {
            console.log("** Erro calcTotalFazendas **");
            console.log(error);
            res.status(500).json(error);
        }
    },

    calcTotalHectares: async (req, res) => {
        try {
            const { statusCode, msg, erro, dashboard } = await dashboardController.calcTotalHectares();
            res.status(statusCode).json({ msg, erro, ...dashboard });
        } catch (error) {
            console.log("** Erro calcTotalHectares **");
            console.log(error);
            res.status(500).json(error);
        }
    },

    calcPizzaUsoSolo: async (req, res) => {
        try {
            const { statusCode, msg, erro, dashboard } = await dashboardController.calcPizzaUsoSolo();
            res.status(statusCode).json({ msg, erro, ...dashboard });
        } catch (error) {
            console.log("** Erro calcPizzaUsoSolo **");
            console.log(error);
            res.status(500).json(error);
        }
    },

    calcPizzaEstados: async (req, res) => {
        try {
            const { statusCode, msg, erro, dashboard } = await dashboardController.calcPizzaEstados();
            res.status(statusCode).json({ msg, erro, ...dashboard });
        } catch (error) {
            console.log("** Erro calcPizzaEstados **");
            console.log(error);
            res.status(500).json(error);
        }
    },

    calcPizzaCulturas: async (req, res) => {
        try {
            const { statusCode, msg, erro, dashboard } = await dashboardController.calcPizzaCulturas();
            res.status(statusCode).json({ msg, erro, ...dashboard });
        } catch (error) {
            console.log("** Erro calcPizzaCulturas **");
            console.log(error);
            res.status(500).json(error);
        }
    }
}