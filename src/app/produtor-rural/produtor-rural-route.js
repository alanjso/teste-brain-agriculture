const produtorRuralService = require('./produtor-rural-service');

module.exports = routes => {
    const SERVICE = '/produtorrural'

    routes.get(`${SERVICE}`, produtorRuralService.list);

    routes.post(`${SERVICE}`, produtorRuralService.create);

    routes.put(`${SERVICE}/:id`, produtorRuralService.edit);

    routes.delete(`${SERVICE}/:id`, produtorRuralService.delete);

    routes.get(`${SERVICE}/:id`, produtorRuralService.getById);

    routes.post(`${SERVICE}/changepw`, produtorRuralService.changePassword);

    routes.post(`${SERVICE}/resetpw`, produtorRuralService.resetPassword);

    routes.post(`/login`, produtorRuralService.login);
}