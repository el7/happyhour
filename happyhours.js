/* import deal info */
import data from './happyhours.json' assert { type: 'json' };

/* create variables */
var dealActive = false;
var targetDiv = document.getElementById('container-hh-result');

var datetimeNow = new Date();
//var datetimeNow = new Date("2023-09-11T15:00:00.000Z");
console.log("Time now: " + datetimeNow);

document.body.style = "white-space: pre;"

/* iterate over biz' */
for (var i = 0; i < data.Restaurants.length; i++) {

	console.log("here3");
	var re = data.Restaurants[i];
	var openTime = re.Hours[datetimeNow.getDay()].Open;
	var closeTime = re.Hours[datetimeNow.getDay()].Close;
	var contentRestaurantName = document.createTextNode("" + re.Name + "");

	// create div for restaurant
	var divRestaurant = document.createElement("div");
    divRestaurant.classList.add(re.Id, "restaurant");
    divRestaurant.style.backgroundColor = "red";
    divRestaurant.style.width = "1px";
    divRestaurant.style.height = "20px";
    divRestaurant.style.marginTop = "20px";
	document.body.appendChild(divRestaurant); 
	divRestaurant.appendChild(contentRestaurantName);

	console.log(re.Name);

	addToDisplayBizHours();
	addToDisplaySpecials(openTime, closeTime);
}

function addToDisplayDeals (sp) {

	/* iterate over deals for the special */
	for (var l = 0; l < sp.Details.length; l++) {

		var de = sp.Details[l];

		console.log("Deal Name: " + de.Name);

		var divDeal = document.createElement("div");
		// divDeal.classList.add(de.Id, "deal");
		divDeal.classList.add("deal");
		divDeal.style.backgroundColor = "green";
		divDeal.style.width = "1px";
		divDeal.style.height = "20px";
		divDeal.style.marginLeft = "20px";
		document.body.appendChild(divDeal); 

		var contentDealModifier = document.createTextNode(de.DealModifier);
		var contentDealValue = document.createTextNode(de.DealValue + " ");
		var contentDealName = document.createTextNode("| " + de.Name + ": ");
		var contentDealNote = document.createTextNode("(" + de.DealNote + ")\n");
		divDeal.appendChild(contentDealModifier);
		divDeal.appendChild(contentDealValue);
		divDeal.appendChild(contentDealName);
		divDeal.appendChild(contentDealNote);

		console.log("Deal: " + de.Name);
		
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
			// targetDiv.appendChild(contentRestaurantHours);
		}
	}

}

function addToDisplaySpecials(openTime, closeTime){
		/* iterate over specials for the biz */
		for (var j = 0; j < re.Specials.length; j++) {

			var sp = re.Specials[j];
//			console.log("here2");

			console.log("Special Name: " + sp.Name);

			/* iterate over days/hours the special is active */
			for (var k = 0; k < sp.Days.length; k++) {

				var da = sp.Days[k];

				if (da.StartTime == "open") da.StartTime = openTime; // prob going to break
				if (da.EndTime == "close") da.EndTime = closeTime; // prob going to break

				console.log("Special Start: " + da.StartTime);
				console.log("Special End: " + da.EndTime);

				var datetimeDealStart = new Date(da.StartTime);
				var datetimeDealEnd = new Date(da.EndTime);


				/* check if this deal is active */
				if (datetimeNow.getHours() >= datetimeDealStart.getHours() 
					&& datetimeNow.getHours() <= datetimeDealEnd.getHours()
					&& datetimeNow.getDay() == da.DayOfWeek) {
					dealActive = true;
	
				} else {
					dealActive = false;
				}
			}
	
			/* if deal active, add to div */
			if (dealActive == true) {

				console.log("special active");
				// create div for restaurant
				var divSpecial = document.createElement("div");
				divSpecial.className = sp.Id;
				divSpecial.style.backgroundColor = "blue";
				divSpecial.style.width = "1px";
				divSpecial.style.height = "20px";
				divSpecial.style.marginLeft = "10px";
				document.body.appendChild(divSpecial); 


				var contentSpecialName = document.createTextNode(sp.Name);
				// targetDiv.appendChild(contentSpecialName);	
				divSpecial.appendChild(contentSpecialName);
				addToDisplayDeals(sp);	

			} else {
				console.log("special not active");
			}
		}
}