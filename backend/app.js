const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

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

app.post('/api/posts', (req, res, next) => {
	const post = new Post({
		title: req.body.title,
		content: req.body.content,
	});
	post.save();
	console.log(post);
	res.status(201).json({
		message: 'Post added successfully',
	});
});

app.get('/api/posts', (req, res, next) => {
	Post.find().then((documents) => {
		res.status(200).json({
			message: 'Posts fetched successfully!',
			posts: documents,
		});
		console.log(documents);
	});
});

app.delete('/api/posts/:_id', (req, res, next) => {
	Post.deleteOne({ _id: req.params._id }).then((result) => {
		console.log(result);
		res.status(200).json({ message: 'post deleted' });
	});
});

module.exports = app;
