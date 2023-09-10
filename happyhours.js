
/* import deal info */
import data from './happyhours.json' assert { type: 'json' };

document.body.style = "white-space: pre;"

console.log(data);
console.log(data.Restaurants[0].Name);

/* create variables */
const jsonDataTest2 = '{"R1":"McMen", "D1":"$5 Off Burger", "TimeStart":"2023-01-01T08:00:00.000Z", "TimeEnd":"2023-01-01T07:00:00.000Z"}';

var dealActive = false;
var targetDiv = document.getElementById('container-hh-result');
var datetimeNow = new Date();

console.log("current datetime: " + datetimeNow.toISOString());
console.log("current hours: " + datetimeNow.getHours());
console.log("current day: " + datetimeNow.getDay());

/* iterate over data */
for (var i = 0; i < data.Restaurants.length; i++) {
	var re = data.Restaurants[i];
	console.log("Restaurant: " + re.Name)
	var openTime = re.Open;
	var closeTime = re.Close;
	var contentRestaurantName = document.createTextNode("\n" + re.Name + "\n");

	targetDiv.appendChild(contentRestaurantName);


	// loop r.hours, if day matches display hours, mark as open else mark closed

	// loop open hours for biz
	for (var iter_hours = 0; iter_hours < re.Hours.length; iter_hours++) {
		// collect times to show hours
		var datetimeRestaurantOpen = new Date(re.Hours[iter_hours].Open);
		var datetimeRestaurantClose = new Date(re.Hours[iter_hours].Close);
		var textRestaurantHours = "Open: " + datetimeRestaurantOpen.toLocaleTimeString() + "\nClose: " + datetimeRestaurantClose.toLocaleTimeString() + "\n";

		if (datetimeNow.getDay() == re.Hours[iter_hours].DayOfWeek) {
			var contentRestaurantHours = document.createTextNode(textRestaurantHours);
			targetDiv.appendChild(contentRestaurantHours);
		}
		// compare curent time to see if open
	}

	for (var j = 0; j < re.Specials.length; j++) {
		var sp = re.Specials[j];
		console.log("Special: " + sp.Name);

		for (var k = 0; k < sp.Days.length; k++) {
			var da = sp.Days[k];
			console.log("Day StartTime: " + da.StartTime)
			console.log("Day EndTime: " + da.EndTime)

			// if "close" set to closing time for that day
			// if "open" set to open time for that day
			if (da.StartTime == "open") da.StartTime = openTime;
			if (da.EndTime == "close") da.EndTime = closeTime;

			var datetimeDealStart = new Date(da.StartTime);
			var datetimeDealEnd = new Date(da.EndTime);
			console.log("start hours: " + datetimeDealStart.getHours());
			console.log("end hours: " + datetimeDealEnd.getHours());

			/* check if this deal is active // WORKS */
			if (datetimeNow.getHours() >= datetimeDealStart.getHours() && datetimeNow.getHours() <= datetimeDealEnd.getHours()) {

				console.log("active");
				dealActive = true;

			} else {
				console.log("not active");
				dealActive = false;
			}
		}

		if (dealActive == true) {

			var contentSpecialName = document.createTextNode("\n> " + sp.Name + "\n");
			targetDiv.appendChild(contentSpecialName);

			for (var l = 0; l < sp.Details.length; l++) {
				var de = sp.Details[l];
				console.log("Details: " + de.Name)

				var contentDealName = document.createTextNode("- " + de.Name + ": ");
				var contentDealValue = document.createTextNode(de.DealValue + " ");
				var contentDealModifier = document.createTextNode(de.DealModifier);
				var contentDealNote = document.createTextNode("(" + de.DealNote + ")\n");
				document.write("<br>");


				targetDiv.appendChild(contentDealModifier);
				targetDiv.appendChild(contentDealValue);
				targetDiv.appendChild(contentDealName);
				targetDiv.appendChild(contentDealNote);

			}
		}
	}
}




