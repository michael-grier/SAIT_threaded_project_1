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
function timeReminder(){
	remindInter = setInterval(switchReminder, 5000);
}

//Switch reminder to a random one
function switchReminder(){
	var newIndex = Math.floor(Math.random() * reminders.length);

	//Check if new random number is the same as the previous
	//increment newIndex if it's the same
	if (i == newIndex){
		newIndex = (i + 1) % reminders.length;
	}
	
	i = newIndex;
	document.getElementsByClassName("reminder")[0].innerHTML = reminders[i];
}