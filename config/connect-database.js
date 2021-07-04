const mongoose = require('mongoose');
const config = require('./config');

function connect() {
	mongoose.Promise = Promise;
	mongoose.connect(
		config.database.url,
		{
			useNewUrlParser: true,
			useFindAndModify: false,
			useUnifiedTopology: true
		},
		function(error) {
			if (error) {
				console.error(error);
			} else {
				console.info(`mongodb connected successfully`);
			}
		}
	);
}

connect();