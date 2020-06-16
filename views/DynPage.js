const fs = require("fs");
const greeting = require("../public/js/greeting.js");

exports.genConfirm = (result, lv_view, res)=>{

// read file to get HTML response header 
	fs.readFile(lv_view + "/confirmation.html", (err, htmlhead)=>{
		if (err) throw err;
// customize body using db response 
		res.writeHead(200, { "Content-Type":"text/html" });
		res.write(htmlhead);				
// write data inside a table
		res.write("<body>");
		res.write("<h1>" + greeting.greet() + "</h1>");
		res.write("<table border='1'>");
		for (agent of result)
		{
			res.write("<tr>");
			res.write("<td>" + agent.AgentId + "</td>"
					+ "<td>" + agent.AgtLastName + "</td>"
					+ "<td>" + agent.AgtFirstName + "</td>");
			res.write("</tr>");
		}
		res.write("</table>");
		res.write("</body>");
		res.end();
	});
};
	

