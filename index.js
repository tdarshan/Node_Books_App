const express = require('express');
const dbConnection = require('./db_connect');
const app = express()
const port = 3000

require('./db_connect');

app.use(express.json());


const appRoute = require('./routes/app.route');
app.use('/api/books', appRoute);


app.listen(port, () => console.log(`App running on port ${port}!`))