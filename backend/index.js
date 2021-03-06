const express = require('express');
const morgan = require('morgan');
const app = express();
const PORT = process.env.PORT||3000;

const ordersRouter = require('./routes/orders');
const usersRouter = require('./routes/users');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
app.options('/*',(req, res, next) => res.send());
app.use('/orders', ordersRouter);
app.use('/users', usersRouter);

app.listen(PORT, ()=> console.log('server running on PORT '+PORT));