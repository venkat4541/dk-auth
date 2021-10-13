require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const basicAuth = require('auth/basic-auth');

const userRoutes = require('./src/user/routes');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// app.use(basicAuth);

const port = 3000;

app.use(express.json());


app.use("/v1/user", userRoutes);

app.listen(port, () => console.log(`app listening on port ${port}`));