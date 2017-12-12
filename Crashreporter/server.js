const formidable = require('formidable');

require('http').createServer((req, res) => {
	if(req.url === '/crashes'){
		const form = formidable.IncomingForm();
		form.parse(req, (err, fields, files) => {
			if(err){
				console.log(err);
				res.end('1');
				return;
			}
			console.log(fields);
			console.log(files);
			res.end('1');
			return;
		});
	} else {
		res.end();
	}
}).listen(3000, () => console.log('Listening'));