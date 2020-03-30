const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

/**
 * 
 * Em ambiente de desenvolvimento, utiliza-se sem parâmetro
 * Em ambiente de produção, devemos passar a url do domínio como parâmentro
 * Ex.: app.use(cors( origin: 'http://meuapp.com' ));
 * 
 */
app.use(cors());

app.use(express.json());
app.use(routes);

app.listen(3333);
