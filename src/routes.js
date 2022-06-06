const { Router } = require('express');
const routes = new Router();

routes.get('/health', (req, res) => {
    res.status(200).json({ testeBrainAgriculture: 'Server UP' });
});

require('./app/produtor-rural/produtor-rural-route')(routes);
require('./app/dashboard/dashboard-route')(routes);

module.exports = routes;