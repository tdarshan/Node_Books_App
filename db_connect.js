const mongoose = require('mongoose');

mongoose
    .connect("mongodb://localhost:27017/efeed_assignment", 
        {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((err) => console.log(err.message));

mongoose.connection.on('connected', ()=> {
    console.log('App connected to DB');
});

mongoose.connection.on('error', (err) => {
    console.log(err.message);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

process.on('SIGINT', async() => {
    await mongoose.connection.close();
    process.exit(0);
});