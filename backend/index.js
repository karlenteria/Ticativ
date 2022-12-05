const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const server = express();
const port = 8088;

//Middle ware
server.use( morgan('dev') );
server.use( cors() );
server.use( bodyParser.json() );
server.use( helmet() );

//Routes
const AuthRoute = require('./routes/authRoute');
const UserRoute = require('./routes/users');
const ArtProductRoute = require('./routes/artProduct');
const CartRoute = require('./routes/cart');

// Database connection
mongoose.connect('mongodb+srv://tricative:WW2HjUgFqXieitJU@cluster0.zjj0pac.mongodb.net/ticativ')







server.get('/', (request, response) => {
    response.send(`Welcome to the ticativ api`);
})


//Routes
server.use('/api/v1/auth', AuthRoute);
server.use('/api/v1/user', UserRoute);
server.use('/api/v1/artProduct', ArtProductRoute);
server.use('/api/v1/cart', CartRoute);

server.listen(
    port,
    () => {
        console.log(`Server running on port ${port}`);
    }
);
