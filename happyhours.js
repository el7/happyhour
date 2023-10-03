/* import data */
import data from './happyhours.json' assert { type: 'json' };

/* const and variables */
const HH_ScopeSelection = {
	HH_All: "all",
	HH_Today: "today",
	HH_WithinHour: "hour",
	HH_Now: "now"
}

var specialActive = false;
var hhSelection = HH_ScopeSelection.HH_Now;
hhSelection = HH_ScopeSelection.HH_Today;
 hhSelection = HH_ScopeSelection.HH_WithinHour;

var divHhMode = document.createElement("div");
var textNodeHhMode = document.createTextNode("Deals: " + hhSelection.toUpperCase());
divHhMode.append(textNodeHhMode);
document.body.appendChild(divHhMode);

var datetimeNow = new Date();
//var datetimeNow = new Date("2023-09-15T22:00:00.000Z");

starter();
function starter () {

	console.log("Time now: " + datetimeNow);
	document.body.style = "white-space: pre";

	/* iterate over biz' */
	for (var i = 0; i < data.Restaurants.length; i++) {

		try {
			var re = data.Restaurants[i];
			var openTime = re.Hours[datetimeNow.getDay()].Open;
			var closeTime = re.Hours[datetimeNow.getDay()].Close;
		} catch (ex) {
			console.log("ERROR no retaurant data, or no open/close time for today's day in the array")
		}

	addToDisplayRestaurantInfo(re);
	addToDisplayBizHours(re);
	addToDisplaySpecials(re, openTime, closeTime);

	}
}


function addToDisplayRestaurantInfo (restaurant) {

	var strRestrauntStatus;

	// get restaurant info from datasource
	try {
		console.log(restaurant.Name);
		var restaurantOpen = restaurant.Hours[datetimeNow.getDay()].Open;
		var restaurantClose = restaurant.Hours[datetimeNow.getDay()].Close;
		var datetimeRestaurantOpen = new Date(restaurantOpen);
		var datetimeRestaurantClose = new Date(restaurantClose);
		var strRestaurantGoogleMap = "https://www.google.com/maps/place/" + restaurant.Address;
		var strRestaurantMapLink = "";
		// strRestaurantMapLink = " (<a href='" + strRestaurantGoogleMap + "'>map</a>)"

	} catch (ex) {
		console.log("ERROR no retaurant data, or no open/close time2 for today's day in the array")
	}

	var hhSelectionModifierUpper = 0;
	var hhSelectionModifierLower = 0;

	switch (hhSelection) {
		case HH_ScopeSelection.HH_Now:
			hhSelectionModifierUpper = 0;
			hhSelectionModifierLower = 0;
			break;
		case HH_ScopeSelection.HH_WithinHour:
			hhSelectionModifierUpper = 1;
			hhSelectionModifierLower = 1;
			break;
		case HH_ScopeSelection.HH_Today:
			hhSelectionModifierLower = (datetimeNow.getHours() - datetimeRestaurantOpen.getHours());
			hhSelectionModifierUpper = (nighttimeAdjustment(datetimeRestaurantClose.getHours()) - datetimeNow.getHours());
			break;		
	}

	console.log("now: " + datetimeNow.getHours() + " hhSelectionModifierLower: " + hhSelectionModifierLower + " upper: " + hhSelectionModifierUpper);

	// decide if restaurant is open
	if (isDateHoursBetween(datetimeRestaurantOpen.getHours(), datetimeRestaurantClose.getHours(), datetimeNow.getHours())) {
		console.log("open");
		strRestrauntStatus = "Open";
	} else {
		console.log("closed");
		strRestrauntStatus = "Closed";
	}

	divFactoryRestaurants(restaurant, strRestaurantMapLink, strRestrauntStatus, datetimeRestaurantOpen, datetimeRestaurantClose);

}

function addToDisplayDeals (sp) {

	/* iterate over deals for the special */
	for (var l = 0; l < sp.Details.length; l++) {

		var de = sp.Details[l];
		var dealId;

		try {
			dealId = de.id;
		} catch (er) {
			dealId = "noDealId";
		}

		console.log("Deal: " + de.Name);
		divFactoryDeals(de, dealId);

	}
}


function addToDisplayBizHours (restaurant) {

	/* iterate over biz hours info */
	for (var iter_hours = 0; iter_hours < restaurant.Hours.length; iter_hours++) {
	
		/* display hour info */
		var datetimeRestaurantOpen = new Date(restaurant.Hours[iter_hours].Open);
		var datetimeRestaurantClose = new Date(restaurant.Hours[iter_hours].Close);
		var textRestaurantHours = "Open: " + datetimeRestaurantOpen.toLocaleTimeString() + "\nClose: " + datetimeRestaurantClose.toLocaleTimeString() + "\n";

		/* show hour info for today */
		if (datetimeNow.getDay() == restaurant.Hours[iter_hours].DayOfWeek) {
			// do later
		}
	}

}

function addToDisplaySpecials(restaurant, openTime, closeTime){
		/* iterate over specials for the biz */

		var datetimeRestaurantOpen = new Date(openTime);
		var datetimeRestaurantClose = new Date(closeTime);
		var hhSelectionModifierUpper = 0;
		var hhSelectionModifierLower = 0;

		for (var j = 0; j < restaurant.Specials.length; j++) {

			var sp = restaurant.Specials[j];
			//	console.log("here2");

			console.log("Special Name: " + sp.Name);

			/* iterate over days/hours the special is active */
			for (var k = 0; k < sp.Days.length; k++) {

				var da = sp.Days[k];

				if (da.StartTime == "open") da.StartTime = openTime; // prob going to break
				if (da.EndTime == "close") da.EndTime = closeTime; // prob going to break

				var datetimeDealStart = new Date(da.StartTime);
				var datetimeDealEnd = new Date(da.EndTime);

				switch (hhSelection) {
					case HH_ScopeSelection.HH_Now:
						console.log("now!");
						hhSelectionModifierUpper = 0;
						hhSelectionModifierLower = 0;
						break;
					case HH_ScopeSelection.HH_WithinHour:
						console.log("hour!");
						hhSelectionModifierUpper = 0;
						hhSelectionModifierLower = 1;
						break;
					case HH_ScopeSelection.HH_Today:
						console.log("today!");
						// mod lower gets time between deal start and open time
						hhSelectionModifierLower = (datetimeDealStart.getHours() - datetimeRestaurantOpen.getHours());
						// mod upper gets time between deal end and close time
						hhSelectionModifierUpper = (nighttimeAdjustment(datetimeRestaurantClose.getHours()) - datetimeDealStart.getHours());
						break;
				}

				console.log("Special Start: " 				+ datetimeDealStart.getHours()
							+ " Special End: " 				+ nighttimeAdjustment(datetimeDealEnd.getHours())
							+ " Current Day: " 				+ datetimeNow.getDay()
							+ " Current Hours: " 			+ datetimeNow.getHours()
							+ " dealStartHours: " 			+ datetimeDealStart.getHours()
							+ " dealEndHours: " 			+ nighttimeAdjustment(datetimeDealEnd.getHours())
							+ " da.day: " 					+ da.DayOfWeek
							+ " hhSelectionModifierLower: " + hhSelectionModifierLower 
							+ " upper: " 					+ hhSelectionModifierUpper);

				/* check if this special is active */
				if (isDateHoursBetween(datetimeDealStart.getHours()-hhSelectionModifierLower, 
						nighttimeAdjustment(datetimeDealEnd.getHours())+hhSelectionModifierUpper, 
						datetimeNow.getHours())
						&& datetimeNow.getDay() == da.DayOfWeek) {

					specialActive = true;
					console.log("special active");
	
				} else {

					console.log("special not active");
					console.log("Special Start: " 	+ datetimeDealStart.getHours()
					+ " Special End: " 				+ nighttimeAdjustment(datetimeDealEnd.getHours())
					+ " Special Day: " 				+ da.DayOfWeek
					+ " Current Hours: "	 		+ datetimeNow.getHours()
					+ " Current Day: " 				+ datetimeNow.getDay()
					+ " ModifierLower: " 			+ hhSelectionModifierLower 
					+ " upper: " 					+ hhSelectionModifierUpper);					
				}
			}
	
			/* if deal active, add to div */
			if (specialActive == true) {

				var datetimeSpecialLastConfirmed = new Date(sp.datetimeSpecialLastConfirmed);

				divFactorySpecials(sp, datetimeDealStart, datetimeDealEnd);

				addToDisplayDeals(sp);

			} else {
			}

			specialActive = false;

		}
}

function divFactoryRestaurants (restaurant, strRestaurantMapLink, strRestrauntStatus, datetimeRestaurantOpen, datetimeRestaurantClose) {

	// create div for restaurant
	var textNodeRestaurantInfo = document.createTextNode(restaurant.Name + strRestaurantMapLink + " \n" + strRestrauntStatus + " [" + datetimeRestaurantOpen.getHours() + " - " + datetimeRestaurantClose.getHours() + "]");
	var divRestaurant = document.createElement("div");
	var spanBusinessName = document.createElement('span');

	spanBusinessName.appendChild(textNodeRestaurantInfo);

	divRestaurant.classList.add(restaurant.Id, "restaurant");
	divRestaurant.appendChild(spanBusinessName);

	document.body.appendChild(divRestaurant); 

}


function divFactorySpecials (sp, datetimeDealStart, datetimeDealEnd) {

	// create div for restaurant
	var divSpecial = document.createElement("div");
	// divSpecial.classList.add(sp.Id, "special");
	divSpecial.classList.add("special");
	document.body.appendChild(divSpecial); 

	var datetimeSpecialLastConfirmed = new Date(sp.datetimeSpecialLastConfirmed);

	var contentSpecialName = document.createTextNode(sp.Name + "\n");
	var contentSpecialTimes = document.createTextNode("[Start: " + datetimeDealStart.getHours() + " End: " + datetimeDealEnd.getHours() + "]\n");
	var contentSpecialConfirmed = document.createTextNode("Verified: " + datetimeSpecialLastConfirmed);

	var spanSpecialName = document.createElement('span');
	var spanSpecialTimes = document.createElement('span');
	var spanSpecialConfirmed = document.createElement('span');

	spanSpecialName.appendChild(contentSpecialName);
	spanSpecialTimes.appendChild(contentSpecialTimes);
	spanSpecialConfirmed.appendChild(contentSpecialConfirmed);

	// targetDiv.appendChild(contentSpecialName);	
	divSpecial.appendChild(spanSpecialName);
	divSpecial.appendChild(spanSpecialTimes);
	divSpecial.appendChild(spanSpecialConfirmed);

}

function divFactoryDeals (de, dealId) {

	// crate div for deal
	var divDeal = document.createElement("div");
	divDeal.classList.add(dealId, "deal");
	document.body.appendChild(divDeal); 

	// crate text content for deal
	var contentDealType = document.createTextNode(de.DealType + " | ");
	var contentDealModifier = document.createTextNode(de.DealModifier + " ");
	var contentDealValue = document.createTextNode(de.DealValue + " | ");
	var contentDealName = document.createTextNode(de.Name + "\n");
	var contentDealNote = document.createTextNode(de.DealNote);

	var spanDealType = document.createElement('span');
	var spanDealModifier = document.createElement('span');
	var spanDealValue = document.createElement('span');
	var spanDealName = document.createElement('span');
	var spanDealNote = document.createElement('span');

	spanDealType.appendChild(contentDealType);
	spanDealModifier.appendChild(contentDealModifier);
	spanDealValue.appendChild(contentDealValue);
	spanDealName.appendChild(contentDealName);
	spanDealNote.appendChild(contentDealNote);

	divDeal.appendChild(spanDealType);
	divDeal.appendChild(spanDealModifier);
	divDeal.appendChild(spanDealValue);
	divDeal.appendChild(spanDealName);
	divDeal.appendChild(spanDealNote);


}


function nighttimeAdjustment (lateHours) {

	// adjust for late hours, likely needs guardrails 
	if (lateHours > -1 && lateHours < 5) 
		lateHours += 24;
	
	return lateHours;
}

function isDateHoursBetween (lowerHour, upperHour, currentHour) {

	upperHour = nighttimeAdjustment(upperHour);
	console.log("r.open " + lowerHour + " r.close: " + upperHour + "nowhour: " + currentHour);

	if (currentHour >= lowerHour && currentHour <= upperHour) {
		return true;
	} else {
		return false;
	}

}