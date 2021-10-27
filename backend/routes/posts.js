const express = require('express');
const Post = require('../models/post');

const router = express.Router();

router.post('', (req, res, next) => {
	const post = new Post({
		title: req.body.title,
		content: req.body.content,
	});
	post
		.save()
		.then((result) => {
			res.status(201).json({ message: 'Post added successfully' });
		})
		.catch((error) => {
			res.status(500).json({ message: 'Internal Server Error' });
		});
});

router.put('/:_id', (req, res, next) => {
	const post = new Post({
		_id: req.params._id,
		title: req.body.title,
		content: req.body.content,
	});
	Post.updateOne({ _id: req.params._id }, post)
		.then((result) => {
			res.status(200).json({ message: 'Update successfull' });
		})
		.catch((error) => {
			res.status(500).json({ message: 'Internal Server Error' });
		});
});

router.get('', (req, res, next) => {
	Post.find()
		.then((documents) => {
			res.status(200).json({
				message: 'Posts fetched successfully!',
				posts: documents,
			});
		})
		.catch((error) => {
			res.status(500).json({ message: 'Internal Server Error' });
		});
});

router.get('/:_id', (req, res, next) => {
	Post.findById(req.params._id)
		.then((post) => {
			res.status(200).json(post);
		})
		.catch((error) => {
			res.status(404).json({ message: 'Post not found' });
		});
});

router.delete('/:_id', (req, res, next) => {
	Post.deleteOne({ _id: req.params._id })
		.then((result) => {
			console.log(result);
			res.status(200).json({ message: 'post deleted' });
		})
		.catch((error) => {
			res.status(500).json({ message: 'Internal Server Error' });
		});
});

module.exports = router;
