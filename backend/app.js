const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postRoutes = require('./routes/posts');

const app = express();
const cors = require('cors');

mongoose
	.connect(
		'mongodb+srv://lalit:Lalitrana12-B@cluster0.srv5f.mongodb.net/node-angular?retryWrites=true&w=majority'
	)
	.then(() => {
		console.log('connected to database');
	})
	.catch(() => {
		console.log('Connection failed');
	});

const corsOptions = {
	origin: 'http://localhost:4200',
	credentials: true, //access-control-allow-credentials:true
	optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, PATCH, DELETE, PUT, OPTIONS'
	);
	next();
});

app.use('/api/posts',postRoutes);

module.exports = app;
