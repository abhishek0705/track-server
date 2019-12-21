require('./models/User');
require('./models/Track');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const requireAuth = require('./middlewares/requireAuth');

const app = express();
app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

const mongoUri = 'mongodb+srv://admin:7610013352@cluster0-2c7ob.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoUri, {
    useNewUrlParser : true,
    useCreateIndex : true,
});

app.get('/',requireAuth, (req,res)=> {
    res.send(`Your email: ${req.user.email}`);
});

mongoose.connection.on('connected', () => {
    console.log("connected to mongo");
});

mongoose.connection.on('error', (err) => {
    console.log(err,"error connecting to mongo");
});
app.listen(3000, () => {
    console.log("on port 3000");
});