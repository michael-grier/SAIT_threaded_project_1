const fs = require("fs");


exports.genThanks = (result, res)=>{

// read file to get static HTML header and bottom part 
	fs.readFile(__dirname + "/thanks_header.html", (err, htmlhead)=>{
		if (err) throw err;
		fs.readFile(__dirname + "/thanks_bottom.html", (err, htmlbottom)=>{
// customize body using db response 
//			res.writeHead(200, { "Content-Type":"text/html" });
// serves out static part above
			res.write(htmlhead);
			res.write(`Thank you ${ result.pop().AgtFirstName }<br/>`);
// serves out static part below
			res.write(htmlbottom);
			res.end();
		});
	});
};


