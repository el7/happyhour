
export async function prepareVenues () {

	// collect venues based on user's selection state
	const filters = collectFilters();
	const timeFilter = document.querySelector('input[name="hhModeRadio"]:checked');
	const data2 = await fetchVenues(filters, timeFilter.value);

	if (data2 !== null) {
		displayVenues(data2);
	} else {
		// Handle the case where fetchVenues returns null
		console.log("Failed to fetch venues");
	}
}

// Function to gather filters (example)
function collectFilters() {
	let filters = {};
	// Collect filter data from DOM elements
	// Example:
	filters.beer = document.getElementById('checkboxFilterBeer').value;
	filters.liqueur = document.getElementById('checkboxFilterLiqueur').value;    

    console.log("filter beer: ", filters.beer);
    console.log("filter liqueur: ", filters.liqueur);

	return filters;
}

async function fetchVenues(filters, timeFilter) {

	let urlVenues = new URL('http://localhost:3000/api/venues');
	let urlSpecials = new URL('http://localhost:3000/api/specials');
	let urlSpecialHours = new URL('http://localhost:3000/api/specialHours');
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

	urlVenues.search = params;

	try {
		const responseVenues = await fetch(urlVenues.toString(), {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			},
		});

		if (!responseVenues) throw new Error("No response received");
		if (!responseVenues.ok) throw new Error(`HTTP error! status: ${responseVenues.status}`);

		let allVenues = await responseVenues.json();

		const responseSpecials = await fetch(urlSpecials.toString(), {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			},
		});

		if (!responseSpecials) throw new Error("No response received");
		if (!responseSpecials.ok) throw new Error(`HTTP error! status: ${responseSpecials.status}`);

		let allSpecials = await responseSpecials.json();

		const responseSpecialHours = await fetch(urlSpecialHours.toString(), {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			},
		});

		if (!responseSpecialHours) throw new Error("No response received");
		if (!responseSpecialHours.ok) throw new Error(`HTTP error! status: ${responseSpecialHours.status}`);

		let allSpecialHours = await responseSpecialHours.json();

		// given all special hours, returns array of active special hours
		let filteredSpecialHours = filterSpecialHours(allSpecialHours);
		console.log("fsh.l: ", filteredSpecialHours.length);

		// given active special hours, return array of active specials
		let filteredSpecials = filterSpecials(allSpecials, filteredSpecialHours);
		console.log("fs.l: ", filteredSpecials.length);

		// given active specials, returns array of active venues
		let filteredVenues = filterVenues(allVenues, filteredSpecials);

		return allVenues;

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
		<h6><a href='${venue.txtVenueWebsite}'>${venue.txtVenueWebsite}</a> <br>${venue.txtVenueAddress1}' <br>${venue.txtVenuePhoneNumber}</h6>
		<p>Happy Hour:</p>
	  `;
		venueList.appendChild(venueDiv);
	});
}

function filterSpecialHours(allSpecialHours) {

	// collect current time, compare against the start/end range for each special, return limited version
	// Get the current date and time
	const currentTime = new Date("2024-11-26T15:00:00.000Z").getTime();
	//	const currentTime = new Date().getTime();

	let specialStart1String = '2023-10-01T00:00:00.000Z';
	let specialStart2String = '2023-10-01T00:00:00.000Z';
	let specialEnd1String = '2023-10-01T00:00:00.000Z';
	let specialEnd2String = '2023-10-01T00:00:00.000Z';

	let filteredSpecialHours = [];
	let filteredOut = [];

	allSpecialHours.forEach(specialHour => {

		specialStart1String = specialHour.txtStartTime1;
		specialStart2String = specialHour.txtStartTime2;
		specialEnd1String = specialHour.txtEndTime1;
		specialEnd2String = specialHour.txtEndTime2;

		let startTime1 = new Date(specialStart1String).getTime();
		let endTime1 = new Date(specialEnd1String).getTime();
		let startTime2 = new Date(specialStart2String).getTime();
		let endTime2 = new Date(specialEnd2String).getTime();

		if ((currentTime >= startTime1 && currentTime <= endTime1) ||
			(currentTime >= startTime2 && currentTime <= endTime2)) {

				// within range, keep
			console.log("happy hour!", specialHour.txtSpecialHourID);
			filteredSpecialHours.push(specialHour);

		} else {

			// not in range, remove
//			console.log("no happy hour :(", specialHour.txtSpecialHourID);
			filteredOut.push(specialHour);

		}
	})

	console.log("fsh.l: ", filteredSpecialHours.length);
	return filteredSpecialHours;
//	return filteredOut;	
}

function filterVenues(allVenues, filteredSpecials) {

	let filteredVenues = [];

//	console.log("here1");

	allVenues.forEach(venue => {

//		console.log("here2", filteredSpecials.length);

		filteredSpecials.forEach(filteredSpecial => {
			
			if (venue.venueId == filteredSpecial.venueId) {
				filteredSpecials.push(venue);
//				console.log("matched venue to special: venue, filteredSpecial: ", venue.venueId, filteredSpecial.venueId);
			} else {
//				console.log("did not match venue to special: venue, filteredSpecial: ", venue.venueId, filteredSpecial.venueId);				
			}
		})
	})

	return filteredVenues;
};

function filterSpecials(allSpecials, filteredSpecialHours) {

	let filteredSpecials = [];

	allSpecials.forEach(special => {
		filteredSpecialHours.forEach(filteredSpecialHour => {

//			console.log("filteredSpecialHour, special: ", filteredSpecialHour.specialID, special.specialID);
			

			// match special id from each parameter, add item to new array
			if (filteredSpecialHour.specialID == special.specialID) {

				// then add to new array
				filteredSpecials.push(special);


			} else {

				console.log("no special match");

			}
		})
	})

//	console.log("fs.l: ", filteredSpecials.length);

	return filteredSpecials;
}
