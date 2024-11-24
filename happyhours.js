/* import data */
import data from './happyhours.json' with { type: 'json' };

/* const and variables */
const HH_ScopeSelection = {
	HH_All: "all",
	HH_Today: "today",
	HH_WithinHour: "hour",
	HH_Now: "now"
}

var specialActive = false;
var hhSelection = HH_ScopeSelection.HH_Now;
// hhSelection = HH_ScopeSelection.HH_Today;
// hhSelection = HH_ScopeSelection.HH_WithinHour;

var datetimeNow = new Date();
//var datetimeNow = new Date("2023-09-15T22:00:00.000Z");


starter();

function fetchTest () {

	const venueId = encodeURIComponent('0VE0000001');
	const specialId = encodeURIComponent('0SP0000001');
	const specialHoursId = encodeURIComponent('0TI0000001');	
	const attributeId = encodeURIComponent('0AT0000001');
	const venueHoursId = encodeURIComponent('0HO0000001');

	fetch('http://localhost:3000/api/venues')
	.then(response => response.text())
	.then(text => console.log('venues: ', text))
	.catch(error => console.error('Error:', error));

	fetch(`http://localhost:3000/api/venues/${venueId}`)
	.then(response => response.text())
	.then(text => console.log('venues>id: ', text))
	.catch(error => console.error('Error:', error));

	fetch(`http://localhost:3000/api/venues/${venueId}/specials`)
	.then(response => response.text())
	.then(text => console.log('venues>id>specials: ', text))
	.catch(error => console.error('Error:', error));

	fetch(`http://localhost:3000/api/venues/${venueId}/specials/${specialId}/details`)
	.then(response => response.text())
	.then(text => console.log('venues>id>specials>id>details: ', text))
	.catch(error => console.error('Error:', error));

	fetch(`http://localhost:3000/api/venues/${venueId}/specials/${specialId}/hours`)
	.then(response => response.text())
	.then(text => console.log('venues>id>specials>id>hours: ', text))
	.catch(error => console.error('Error:', error));

	fetch(`http://localhost:3000/api/venues/${venueId}/hours`)
	.then(response => response.text())
	.then(text => console.log('venues>id>hours: ', text))
	.catch(error => console.error('Error:', error));

	fetch(`http://localhost:3000/api/venues/${venueId}/specials/${specialId}`)
	.then(response => response.text())
	.then(text => console.log('venues>id>specials>id: ', text))
	.catch(error => console.error('Error:', error));

	fetch(`http://localhost:3000/api/venues/${venueId}/specials/${specialId}/hours/${specialHoursId}`)
	.then(response => response.text())
	.then(text => console.log('venues>id>specials>id>hours>id: ', text))
	.catch(error => console.error('Error:', error));

	fetch(`http://localhost:3000/api/venues/${venueId}/hours/${venueHoursId}`)
	.then(response => response.text())
	.then(text => console.log('venues>id>hours>id: ', text))
	.catch(error => console.error('Error:', error));

}

function displayVenuesOld(){

	// add div to display current hh selection
	var divHhMode = document.createElement("div");
	var textNodeHhMode = document.createTextNode("Deals: " + hhSelection.toUpperCase());
	divHhMode.append(textNodeHhMode);
	document.body.appendChild(divHhMode);

	/* iterate over biz' */
	for (var i = 0; i < data.Restaurants.length; i++) {

		try {
			var re = data.Restaurants[i];
			var openTime = re.Hours[datetimeNow.getDay()].Open; // this logic needs to change, doesn't account for venues with more or less than 7 entries
			var closeTime = re.Hours[datetimeNow.getDay()].Close; // this logic needs to change, doesn't account for venues with more or less than 7 entries. 
		} catch (ex) {
			console.log("ERROR no retaurant data, or no open/close time for today's day in the array")
		}

	addToDisplayRestaurantInfo(re);
	addToDisplayBizHours(re);
	addToDisplaySpecials(re, openTime, closeTime);

	}

}

function starter () {

	// fetchTest();
	clearPage();
	addHhScopeSelector();
	// displayVenuesOld();
	prepareVenues();
}

function prepareVenues(){

	document.querySelectorAll('.hhMode').forEach(button => {
		button.addEventListener('click', async () => {

			//	document.getElementById('filterButton').addEventListener('click', async () => {
			console.log('filterButton Clicked');

			const filters = collectFilters(); // A function to gather current filter selections
			//		const timeFilter = document.getElementById('timeFilter').value; // Or however you get the time filter
			const timeFilter = "now";
			const data = await fetchVenues(filters, timeFilter);
			if (data !== null) {
				displayVenues(data);
			} else {
			// Handle the case where fetchVenues returns null
				console.log("Failed to fetch venues");
			}

		});
	});

}

// Function to gather filters (example)
function collectFilters() {
	let filters = {};
	// Collect filter data from DOM elements
	// Example:
	// filters.foodType = document.getElementById('foodTypeSelect').value;
	// ... more filters ...
	return filters;

}

async function fetchVenues(filters, timeFilter) {

	let url = new URL('http://localhost:3000/api/venues');
	let params = new URLSearchParams();
  
	// Time Filter
	if (timeFilter === "now") {
	  params.append('time', 'now');
	} else if (timeFilter === "withinOneHour") {
	  params.append('time', 'withinOneHour');
	} else if (timeFilter === "today") {
	  params.append('time', 'today');
	}
  
	// Attribute Filters
	if (filters && Object.keys(filters).length > 0) {
		for (let [key, value] of Object.entries(filters)) {
		if (Array.isArray(value)) {
			value.forEach((v) => params.append(key, v));
		} else {
			params.append(key, value);
		}
		}
	}
	
		url.search = params;
  
	try {
	  const response = await fetch(url.toString(), {
		method: 'GET',
		headers: {
		  'Content-Type': 'application/json'
		},
	  });
	  
	  if (!response) throw new Error("No response received");

	  if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	  }

	  
	  return await response.json();
	} catch (error) {
	  console.error('Fetch error:', error);
	  return null;
	}

}

  function displayVenues(venues) {
	// Clear previous content


	const venueListDiv = document.createElement('div');
	venueListDiv.id = 'venueList';
	document.body.appendChild(venueListDiv);

	let venueList = document.getElementById('venueList');
	venueList.innerHTML = '';
  
	// Add new venues
	venues.forEach(venue => {
	  let venueDiv = document.createElement('div');
	  venueDiv.innerHTML = `
		<h3>${venue.txtVenueName}</h3>
		<h6>${venue.txtVenueWebsite} <br>${venue.txtVenueAddress1} <br>${venue.txtVenuePhoneNumber}</h6>
		<p>Happy Hour:</p>
		<!-- More info like address, etc -->
	  `;
	  venueList.appendChild(venueDiv);
	});
  }



function clearPage() {
	document.body.innerHTML = "";
}

function addHhScopeSelector() {

	var name = "hhModeRadio";
	var checked = "true";
	var labelNow = '<label for="radioNow">NOW</label>';
	var labelHour = '<label for="radioHour">HOUR</label>';
	var labelToday = '<label for="radioToday">TODAY</label>';
	var labelButton = '<label for="venueButton">Click!</label>';

	var radioModeNowHTML = '<input type="radio" id="hhModeNowRadio" class="radio hhMode" value="now" name="' + name + '"';
	var radioModeHourHTML = '<input type="radio" id="hhModeHourRadio" class="radio hhMode" value="hour" name="' + name + '"';
	var radioModeTodayHTML = '<input type="radio" id="hhModeTodayRadio" class="radio hhMode" value="today" name="' + name + '"';
	var radioHtml = "";

	if ( checked ) {
        radioModeNowHTML += ' checked="checked"';
    }

	radioModeNowHTML += '/>';
    radioModeHourHTML += '/>';
	radioModeTodayHTML += '/>';

	radioHtml += radioModeNowHTML + labelNow + radioModeHourHTML + labelHour + radioModeTodayHTML + labelToday;

	var radioFragment = document.createElement('div');
    radioFragment.innerHTML = radioHtml;

	document.body.appendChild(radioFragment);
	
}

function hhModeRadioSelectionFunc () {
	console.log("rb clicked");
}



function addToDisplayRestaurantInfo (restaurant) {

	var strRestrauntStatus;

	// get restaurant info from datasource
	try {
//		console.log(restaurant.Name);
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
			hhSelectionModifierLower = datetimeNow.getHours();
			hhSelectionModifierUpper = (nighttimeAdjustment(datetimeRestaurantClose.getHours()) - datetimeNow.getHours());
			break;		
	}

	console.log("now: " + datetimeNow.getHours() + " hhSelectionModifierLower: " + hhSelectionModifierLower + " upper: " + hhSelectionModifierUpper);

	// decide if restaurant is open
	if (isDateHoursBetween(datetimeRestaurantOpen.getHours(), datetimeRestaurantClose.getHours(), datetimeNow.getHours())) {
//		console.log("open");
		strRestrauntStatus = "Open";
	} else {
//		console.log("closed");
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

//		console.log("Deal: " + de.Name);
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
		var specialActiveStart;
		var specialActiveEnd;

		for (var j = 0; j < restaurant.Specials.length; j++) {

			var sp = restaurant.Specials[j];
			//	console.log("here2");

			// console.log("Special Name: " + sp.Name);

			/* iterate over days/hours the special is active */
			for (var k = 0; k < sp.Days.length; k++) {

				var da = sp.Days[k];

				if (da.StartTime == "open") da.StartTime = openTime; // prob going to break
				if (da.EndTime == "close") da.EndTime = closeTime; // prob going to break

				var datetimeDealStart = new Date(da.StartTime);
				var datetimeDealEnd = new Date(da.EndTime);

				switch (hhSelection) {
					case HH_ScopeSelection.HH_Now:
						// console.log("now!");
						hhSelectionModifierUpper = 0;
						hhSelectionModifierLower = 0;
						break;
					case HH_ScopeSelection.HH_WithinHour:
						// console.log("hour!");
						hhSelectionModifierUpper = 0;
						hhSelectionModifierLower = 1;
						break;
					case HH_ScopeSelection.HH_Today:
						// console.log("today!");
						// mod lower gets time between deal start and midnight
						hhSelectionModifierLower = datetimeNow.getHours();
						// mod upper gets time between deal end and close time
						hhSelectionModifierUpper = (nighttimeAdjustment(datetimeRestaurantClose.getHours()) - datetimeDealStart.getHours());
						break;
				}

				/*
				console.log("Special Start: " 				+ datetimeDealStart.getHours()
							+ " Special End: " 				+ nighttimeAdjustment(datetimeDealEnd.getHours())
							+ " Current Day: " 				+ datetimeNow.getDay()
							+ " Current Hours: " 			+ datetimeNow.getHours()
							+ " dealStartHours: " 			+ datetimeDealStart.getHours()
							+ " dealEndHours: " 			+ nighttimeAdjustment(datetimeDealEnd.getHours())
							+ " Deal Day: " 				+ da.DayOfWeek
							+ " hhSelectionModifierLower: " + hhSelectionModifierLower 
							+ " upper: " 					+ hhSelectionModifierUpper);
				*/

				/* check if this special is active */
				if (isDateHoursBetween(datetimeDealStart.getHours()-hhSelectionModifierLower, 
						nighttimeAdjustment(datetimeDealEnd.getHours())+hhSelectionModifierUpper, 
						datetimeNow.getHours())
						&& datetimeNow.getDay() == da.DayOfWeek) {

					specialActive = true;
					specialActiveStart = datetimeDealStart;
					specialActiveEnd = datetimeDealEnd;
					// console.log("special active");
	
				} else {

					/*
					console.log("special not active");
					console.log("Special Start: " 	+ datetimeDealStart.getHours()
					+ " Special End: " 				+ nighttimeAdjustment(datetimeDealEnd.getHours())
					+ " Special Day: " 				+ da.DayOfWeek
					+ " Current Hours: "	 		+ datetimeNow.getHours()
					+ " Current Day: " 				+ datetimeNow.getDay()
					+ " ModifierLower: " 			+ hhSelectionModifierLower 
					+ " upper: " 					+ hhSelectionModifierUpper);					
					*/
				}
			}
	
			/* if deal active, add to div */
			if (specialActive == true) {

				var datetimeSpecialLastConfirmed = new Date(sp.datetimeSpecialLastConfirmed);
				divFactorySpecials(sp, specialActiveStart, specialActiveEnd);
				addToDisplayDeals(sp);

			} else {
			}

			specialActive = false;

		}
}

function divFactoryRestaurants (restaurant, strRestaurantMapLink, strRestrauntStatus, datetimeRestaurantOpen, datetimeRestaurantClose) {

	// create div for restaurant
	var textNodeRestaurantInfo = document.createTextNode(restaurant.Name + " | " + strRestaurantMapLink + " \n" + strRestrauntStatus + " [" + datetimeRestaurantOpen.getHours() + " - " + datetimeRestaurantClose.getHours() + "]");
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
	const confirmed = "" + datetimeSpecialLastConfirmed.getFullYear + "/" + datetimeSpecialLastConfirmed.getMonth + "/" + datetimeSpecialLastConfirmed.getDay;

	var contentSpecialName = document.createTextNode(sp.Name + "\n");
	var contentSpecialTimes = document.createTextNode("[Start: " + datetimeDealStart.getHours() + " End: " + nighttimeAdjustment(datetimeDealEnd.getHours()) + "]\n");
	var contentSpecialConfirmed = document.createTextNode("Verified: " + datetimeSpecialLastConfirmed);
	//var contentSpecialConfirmed = document.createTextNode("Verified: " + confirmed);


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
	var contentDealName = document.createTextNode(de.Name + " | ");
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
	// console.log("r.open " + lowerHour + " r.close: " + upperHour + "nowhour: " + currentHour);

	if (currentHour >= lowerHour && currentHour < upperHour) {
		return true;
	} else {
		return false;
	}

}