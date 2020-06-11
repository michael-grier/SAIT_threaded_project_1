const greetings = ["Welcome new agent", "Bienvenue nouveau agent", "Hallo neuer Agent"];

exports.greet = function  getGreeting()
{
	let rand = Math.floor(Math.random() * greetings.length);
	return greetings[rand];
} 

//exports.greet = ()=>getGreeting();