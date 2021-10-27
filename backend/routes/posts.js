const express = require('express');
const Post = require('../models/post');

const router = express.Router();

router.post('', (req, res, next) => {
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

router.put('/:_id', (req, res, next) => {
	const post = new Post({
		_id: req.params._id,
		title: req.body.title,
		content: req.body.content,
	});
	Post.updateOne({ _id: req.params._id }, post).then((result) => {
		console.log(result);
		res.status(200).json({ message: 'Update successfull' });
	});
});

router.get('', (req, res, next) => {
	Post.find().then((documents) => {
		res.status(200).json({
			message: 'Posts fetched successfully!',
			posts: documents,
		});
		console.log(documents);
	});
});

router.get('/:_id', (req, res, next) => {
	Post.findById(req.params._id).then((post) => {
		if (post) {
			res.status(200).json(post);
		} else {
			res.status(404).json({ message: 'Post not found' });
		}
	});
});

router.delete('/:_id', (req, res, next) => {
	Post.deleteOne({ _id: req.params._id }).then((result) => {
		console.log(result);
		res.status(200).json({ message: 'post deleted' });
	});
});

module.exports = router;
