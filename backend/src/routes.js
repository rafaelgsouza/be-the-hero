const express = require('express');

const OngController = require('./Controllers/OngController');
const IncidenteController = require('./Controllers/IncidenteController');
const GestaoIncidenteController = require('./Controllers/GestaoIncidenteController');
const SessionController = require('./Controllers/SessionController');

const routes = express.Router();

/** Rotas das Ongs */
routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

/** Rotas dos Incidentes */
routes.get('/incidentes', IncidenteController.index);
routes.post('/incidentes', IncidenteController.create);
routes.delete('/incidentes/:id', IncidenteController.delete);

/** Gerencimento de incidentes */
routes.get('/incidentes', GestaoIncidenteController.index);

/** Login e Logout */
routes.post('/sessions', SessionController.create);


module.exports = routes;