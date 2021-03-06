const express = require('express');
const mongoose = require('mongoose');

const postRoutes = require('./routes/posts');

const app = express();

mongoose
	.connect(
		'' // insert mongodb atlas link here
	)
	.then(() => {
		console.log('connected to database');
	})
	.catch(() => {
		console.log('Connection failed');
	});

app.use(express.json());

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

app.use('/api/posts', postRoutes);

module.exports = app;
