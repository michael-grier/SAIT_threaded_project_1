// Author: Chrystal Champion/Robert Geipel
// Date: 6/18/2020
// Class: OOSD APR16
// Description: view package

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
			if (typeof result !== 'undefined') {
				res.write(`Thank you, ${ result.pop().AgtFirstName }!<br/>`);
			}
			else
			{
				res.write("Thank you!<br/>");
			}
// serves out static part below
			res.write(htmlbottom);
			res.end();
		});
	});
};


