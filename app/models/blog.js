var mongoose = require('mongoose');

module.exports = mongoose.model('Blogs', {
	title : {type : String, default: ''},
	description : {type : String, default: ''}
});