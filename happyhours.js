/* import deal info */
import data from './happyhours.json' assert { type: 'json' };

/* create variables */
var dealActive = false;
var targetDiv = document.getElementById('container-hh-result');
var datetimeNow = new Date();

document.body.style = "white-space: pre;"

/* iterate over biz */
for (var i = 0; i < data.Restaurants.length; i++) {

	var re = data.Restaurants[i];
	var openTime = re.Open;
	var closeTime = re.Close;
	var contentRestaurantName = document.createTextNode("\n" + re.Name + "\n");

	targetDiv.appendChild(contentRestaurantName);

	addToDisplayBizHours();
	addToDisplaySpecials();
}

function addToDisplayDeals () {

	var contentSpecialName = document.createTextNode("\n> " + sp.Name + "\n");
	targetDiv.appendChild(contentSpecialName);

	/* iterate over deals for the special */
	for (var l = 0; l < sp.Details.length; l++) {

		var de = sp.Details[l];
		var contentDealName = document.createTextNode("- " + de.Name + ": ");
		var contentDealValue = document.createTextNode(de.DealValue + " ");
		var contentDealModifier = document.createTextNode(de.DealModifier);
		var contentDealNote = document.createTextNode("(" + de.DealNote + ")\n");

		targetDiv.appendChild(contentDealModifier);
		targetDiv.appendChild(contentDealValue);
		targetDiv.appendChild(contentDealName);
		targetDiv.appendChild(contentDealNote);
	}
}


function addToDisplayBizHours () {

	/* iterate over biz hours info */
	for (var iter_hours = 0; iter_hours < re.Hours.length; iter_hours++) {
	
		/* display hour info */
		var datetimeRestaurantOpen = new Date(re.Hours[iter_hours].Open);
		var datetimeRestaurantClose = new Date(re.Hours[iter_hours].Close);
		var textRestaurantHours = "Open: " + datetimeRestaurantOpen.toLocaleTimeString() + "\nClose: " + datetimeRestaurantClose.toLocaleTimeString() + "\n";

		/* show hour info for today */
		if (datetimeNow.getDay() == re.Hours[iter_hours].DayOfWeek) {

			var contentRestaurantHours = document.createTextNode(textRestaurantHours);
			targetDiv.appendChild(contentRestaurantHours);
		}
	}

}

function addToDisplaySpecials(){
		/* iterate over specials for the biz */
		for (var j = 0; j < re.Specials.length; j++) {

			var sp = re.Specials[j];
	
			/* iterate over days/hours the special is active */
			for (var k = 0; k < sp.Days.length; k++) {
				var da = sp.Days[k];
	
				if (da.StartTime == "open") da.StartTime = openTime;
				if (da.EndTime == "close") da.EndTime = closeTime;
	
				var datetimeDealStart = new Date(da.StartTime);
				var datetimeDealEnd = new Date(da.EndTime);
	
				/* check if this deal is active // WORKS */
				if (datetimeNow.getHours() >= datetimeDealStart.getHours() && datetimeNow.getHours() <= datetimeDealEnd.getHours()) {
	
					dealActive = true;
	
				} else {
	
					dealActive = false;
				}
			}
	
			/* if deal active, add to div */
			if (dealActive == true) {
	
				addToDisplayDeals();
	
			}
		}
}