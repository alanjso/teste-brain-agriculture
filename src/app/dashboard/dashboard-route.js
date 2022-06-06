const dashboardService = require('./dashboard-service');

module.exports = routes => {
    const SERVICE = '/dashboard/produtorrural'

    routes.get(`${SERVICE}/completo`, dashboardService.calcDashboardCompleto);
    routes.get(`${SERVICE}/total-fazendas`, dashboardService.calcTotalFazendas);
    routes.get(`${SERVICE}/total-hectares`, dashboardService.calcTotalHectares);
    routes.get(`${SERVICE}/pizza-uso-solo`, dashboardService.calcPizzaUsoSolo);
    routes.get(`${SERVICE}/pizza-estados`, dashboardService.calcPizzaEstados);
    routes.get(`${SERVICE}/pizza-culturas`, dashboardService.calcPizzaCulturas);
}