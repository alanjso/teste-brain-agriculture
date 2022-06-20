const { ProdutorRural } = require('../produtor-rural/produtor-rural-model');
const pizzaCulturas = require('../../utils/func-pizza-culturas');
const pizzaEstados = require('../..//utils/func-pizza-estados');

module.exports = {

    calcDashboardCompleto: async () => {
        try {
            let culturasTotais = [];
            let estadosTotais = [];

            let dashboard = {
                totalFazendas: 0,
                totalHectaresFazendas: 0,
                pizzaEstados: [],
                pizzaCulturas: [],
                usoSolo: [
                    {
                        id: 'Área agricultável',
                        value: 0
                    },
                    {
                        id: 'Área de vegetação',
                        value: 0
                    }
                ]
            };

            const produtoresParaCalcular = await ProdutorRural.findAndCountAll({});

            produtoresParaCalcular.rows.forEach(pr => {
                estadosTotais.push(pr.dataValues.estado);
                culturasTotais = culturasTotais.concat(pr.dataValues.culturas_plantadas)
                dashboard.totalHectaresFazendas = dashboard.totalHectaresFazendas + pr.dataValues.area_total_fazenda
                dashboard.usoSolo[0].value = dashboard.usoSolo[0].value + pr.dataValues.area_agricultavel;
                dashboard.usoSolo[1].value = dashboard.usoSolo[1].value + pr.dataValues.area_vegetacao;
            });

            dashboard.totalFazendas = produtoresParaCalcular.count;

            dashboard.pizzaEstados = await pizzaEstados(estadosTotais);

            dashboard.pizzaCulturas = await pizzaCulturas(culturasTotais);

            return { statusCode: 200, msg: 'Sucesso', dashboard };
        } catch (error) {
            console.log("** Erro dashboard **");
            console.log(error);
            return { statusCode: 500, msg: 'Falha', error };
        }
    },

    calcTotalFazendas: async (req, res) => {
        try {
            let dashboard = {
                totalFazendas: 0,
            };

            const count = await ProdutorRural.count({});
            dashboard.totalFazendas = count;
            return { statusCode: 200, msg: 'Sucesso', dashboard };
        } catch (error) {
            console.log("** Erro calcTotalFazendas **");
            console.log(error);
            return { statusCode: 500, msg: 'Falha', error };
        }
    },

    calcTotalHectares: async (req, res) => {
        try {
            let dashboard = {
                totalHectaresFazendas: 0
            };

            const produtoresParaCalcular = await ProdutorRural.findAndCountAll({});

            produtoresParaCalcular.rows.forEach(pr => {
                dashboard.totalHectaresFazendas = dashboard.totalHectaresFazendas + pr.dataValues.area_total_fazenda
            });

            return { statusCode: 200, msg: 'Sucesso', dashboard };
        } catch (error) {
            console.log("** Erro calcTotalHectares **");
            console.log(error);
            return { statusCode: 500, msg: 'Falha', error };
        }
    },

    calcPizzaUsoSolo: async (req, res) => {
        try {
            let dashboard = {
                usoSolo: [
                    {
                        id: 'Área agricultável',
                        value: 0
                    },
                    {
                        id: 'Área de vegetação',
                        value: 0
                    }
                ]
            };

            const produtoresParaCalcular = await ProdutorRural.findAndCountAll({});

            produtoresParaCalcular.rows.forEach(pr => {
                dashboard.usoSolo[0].value = dashboard.usoSolo[0].value + pr.dataValues.area_agricultavel;
                dashboard.usoSolo[1].value = dashboard.usoSolo[1].value + pr.dataValues.area_vegetacao;
            });

            return { statusCode: 200, msg: 'Sucesso', dashboard };
        } catch (error) {
            console.log("** Erro calcPizzaUsoSolo **");
            console.log(error);
            return { statusCode: 500, msg: 'Falha', error };
        }
    },

    calcPizzaEstados: async (req, res) => {
        try {
            let estadosTotais = [];
            let dashboard = {
                pizzaEstados: []
            };

            const produtoresParaCalcular = await ProdutorRural.findAndCountAll({});

            produtoresParaCalcular.rows.forEach(pr => {
                estadosTotais.push(pr.dataValues.estado);
            });

            dashboard.pizzaEstados = await pizzaEstados(estadosTotais);
            return { statusCode: 200, msg: 'Sucesso', dashboard };
        } catch (error) {
            console.log("** Erro calcPizzaEstados **");
            console.log(error);
            return { statusCode: 500, msg: 'Falha', error };
        }
    },

    calcPizzaCulturas: async (req, res) => {
        try {
            let culturasTotais = [];
            let dashboard = {
                pizzaCulturas: []
            };

            const produtoresParaCalcular = await ProdutorRural.findAndCountAll({});

            produtoresParaCalcular.rows.forEach(pr => {
                culturasTotais = culturasTotais.concat(pr.dataValues.culturas_plantadas)
            });

            dashboard.pizzaCulturas = await pizzaCulturas(culturasTotais);

            return { statusCode: 200, msg: 'Sucesso', dashboard };
        } catch (error) {
            console.log("** Erro calcPizzaCulturas **");
            console.log(error);
            return { statusCode: 500, msg: 'Falha', error };
        }
    }
}