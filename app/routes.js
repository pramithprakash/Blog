var Blog = require('./models/blog');

function getBlogs(res){
	Blog.find(function(err, blogs) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(blogs); // return all blogs in JSON format
		});
};

module.exports = function(app) {

	// api ---------------------------------------------------------------------
	// get all blogs
	app.get('/api/blogs', function(req, res) {

		// use mongoose to get all blogs in the database
		getBlogs(res);
	});

	// create blog and send back all blog after creation
	app.post('/api/blogs', function(req, res) {

		// create a blog, information comes from AJAX request from Angular
		Blog.create({
			title : req.body.title,
			description : req.body.description
		}, function(err, blog) {
			if (err)
				res.send(err);

			// get and return all the blog after you create another
			getBlogs(res);
		});

	});

	// delete a todo
	app.delete('/api/blogs/:blog_id', function(req, res) {
		Blog.remove({
			_id : req.params.blog_id
		}, function(err, blog) {
			if (err)
				res.send(err);

			getBlogs(res);
		});
	});

	

	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};