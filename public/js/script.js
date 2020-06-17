//Array contains reminder messages
var reminders = ["Remember, cell phone use is not permitted during an exam",
				"No other person is permitted in the exam room",
				"If you require assistance please contact support via the help button",
				"Stay hydrated by grabbing a glass of water",
				"Make sure you're comfortable while taking your exam"];

//Variable for the reminder interval	
var remindInter;

//Index number used to get a reminder, randomly generated initially
var i = Math.floor(Math.random() * reminders.length);

//Starts the interval
function addReminder(){
	remindInter = setInterval(switchReminder, 5000);
}

//Switch reminder to a random one
function switchReminder(){
	i = Math.floor(Math.random() * reminders.length);
	document.getElementsByClassName("reminder")[0].innerHTML = reminders[i];
}