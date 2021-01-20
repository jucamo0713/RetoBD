const express = require('express');
const morgan = require('morgan');
const app = express();
const routes = require('./routes/routes');
require('dotenv').config();

app.use(morgan('dev'));
app.use(express.json());

//Routes
app.use('/',routes);

app.set('port',process.env.PORT || 4001);
    
app.listen(app.get('port'), () => {
    console.log(`Aplicación corriendo en el puerto ${app.get('port')}!!`);
})