
export async function prepareVenues () {

	// collect venues based on user's selection state
	const filters = collectFilters();
	const timeFilter = document.querySelector('input[name="hhModeRadio"]:checked');

    const allVenues = await fetchVenues(filters, timeFilter.value);
    const filteredSpecialHours = await fetchSpecialHours(timeFilter.value);
    const filteredSpecials = await fetchSpecials(filteredSpecialHours);

    console.log('allVenues size: ', allVenues.length)

	if (allVenues !== null) {
		displayVenues(allVenues, filterSpecialHours, filteredSpecials);
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
	filters.beer = document.getElementById('checkboxFilterBeer').checked;
	filters.liqueur = document.getElementById('checkboxFilterLiqueur').checked;    

    console.log("filter beer: ", filters.beer);
    console.log("filter liqueur: ", filters.liqueur);

	return filters;
}

async function fetchVenues(filters, timeFilter) {

	let urlVenues = new URL('http://localhost:3000/api/venues');
	let params = new URLSearchParams();

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

        console.log("filteredVenues: ", filterVenues.length )
		return allVenues;

	} catch (error) {
		console.error('Fetch error:', error);
		return null;
	}

}

async function fetchSpecialHours (timeFilter) {

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

    try {

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

        return filteredSpecialHours;

    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }

}

async function fetchSpecials(filteredSpecialHours) {

	let urlSpecials = new URL('http://localhost:3000/api/specials');

	try {

		const responseSpecials = await fetch(urlSpecials.toString(), {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			},
		});

		if (!responseSpecials) throw new Error("No response received");
		if (!responseSpecials.ok) throw new Error(`HTTP error! status: ${responseSpecials.status}`);

		let allSpecials = await responseSpecials.json();

		// given active special hours, return array of active specials
		let filteredSpecials = filterSpecials(allSpecials, filteredSpecialHours);

		return filteredSpecials;

	} catch (error) {
		console.error('Fetch error:', error);
		return null;
	}

}


function displayVenues(venues, specialHours, specials) {
	// Clear previous content

    console.log('Your JavaScript engine is: ' + navigator.userAgent);
    console.log(typeof venues, Array.isArray(specialHours));
    console.log(typeof specialHours, Array.isArray(specialHours));
    console.log(typeof specials, Array.isArray(specialHours));

    /*
    // Step 1: Normalize data
    const venuesMap = Object.fromEntries(venues.map(venue => [venue.id, venue]));
    const specialHoursMap = Object.fromEntries(specialHours.map(hour => [hour.venueId, hour]));
    const specialsMap = Object.fromEntries(specials.map(special => [special.venueId, special]));
    console.log(combinedData);
    */


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
		<p>Happy Hour: START: END: ID: NAME: ${specials[0].txtSpecialName}</p>
	  `;
		venueList.appendChild(venueDiv);
	});
}

function filterSpecialHours(allSpecialHours) {

	// collect current time, compare against the start/end range for each special, return limited version
	// Get the current date and time
	// const currentTime = new Date("2024-11-26T15:00:00.000Z").getTime();
	const currentDate = new Date();
    console.log(currentDate);
	const currentTime = new Date().getTime();

	let specialStart1String = '2023-10-01T00:00:00.000Z';
	let specialStart2String = '2023-10-01T00:00:00.000Z';
	let specialEnd1String = '2023-10-01T00:00:00.000Z';
	let specialEnd2String = '2023-10-01T00:00:00.000Z';

    let testString = "Nov 26 2024 12:16:51 GMT-0800 (Pacific Standard Time)";

	let filteredSpecialHours = [];
	let filteredOut = [];

    console.log("sp1: ", specialStart1String);

	allSpecialHours.forEach(specialHour => {

		specialStart1String = specialHour.txtSpecialStart1;
		specialStart2String = specialHour.txtSpecialStart2;
		specialEnd1String = specialHour.txtSpecialEnd1;
		specialEnd2String = specialHour.txtSpecialEnd2;

		let startTime1 = new Date(specialStart1String).getTime();
		let endTime1 = new Date(specialEnd1String).getTime();
		let startTime2 = new Date(specialStart2String).getTime();
		let endTime2 = new Date(specialEnd2String).getTime();

        let testTime = new Date(testString).getTime();

        const timePartSpecialStart1String = specialStart1String.slice(11, 19); 
        const timePartSpecialEnd1String = specialEnd1String.slice(11, 19);
        // const timePartSpecialStart2String = specialStart2String.slice(11, 19);
        // const timePartSpecialEnd2String = specialEnd2String.slice(11, 19);

        const SPS1 = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), ...timePartSpecialStart1String.split(':').map(Number)).getTime();
        const SPE1 = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), ...timePartSpecialEnd1String.split(':').map(Number)).getTime();
        // const SPS2 = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), ...timePartSpecialStart2String.split(':').map(Number));
        // const SPE2 = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), ...timePartSpecialEnd2String.split(':').map(Number));
        
        console.log(
            "hoursID", specialHour.txtSpecialHourID,
            "Current Time: ", currentTime, 
            " Special Start 1: ", startTime1,
            " Special End 1: ", endTime1,
            " Special Start 2: ", startTime2,
            " Special End 2: ", endTime2,
            " testString: ", testString, 
            " testTime: " , testTime,
            " SPS1: ", SPS1,
            " SPE1: ", SPE1,
            " Current Time: ", currentTime, 
        )

 
		if ((currentTime >= SPS1 && currentTime <= SPE1) ||
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
	console.log("fosh.l: ", filteredOut.length);    
	return filteredSpecialHours;
//	return filteredOut;	
}

function filterVenues(allVenues, filteredSpecials) {

	let filteredVenues = [];
	let filteredOutVenues = [];

//	console.log("here1");

	allVenues.forEach(venue => {

//		console.log("here2", filteredSpecials.length);

		filteredSpecials.forEach(filteredSpecial => {
			
			if (venue.venueId == filteredSpecial.venueId) {
				filteredVenues.push(venue);
//				console.log("matched venue to special: venue, filteredSpecial: ", venue.venueId, filteredSpecial.venueId);
			} else {
				filteredOutVenues.push(venue);                
//				console.log("did not match venue to special: venue, filteredSpecial: ", venue.venueId, filteredSpecial.venueId);				
			}
		})

	})

	return filteredVenues;
//	return filteredOutVenues;
};

function filterSpecials(allSpecials, filteredSpecialHours) {

	let filteredSpecials = [];
	let filteredOutSpecials = [];

	allSpecials.forEach(special => {
		filteredSpecialHours.forEach(filteredSpecialHour => {

//			console.log("filteredSpecialHour, special: ", filteredSpecialHour.specialID, special.specialID);
			

			// match special id from each parameter, add item to new array
			if (filteredSpecialHour.specialID == special.specialID) {

				// then add to new array
				filteredSpecials.push(special);


			} else {
				filteredOutSpecials.push(special);
				console.log("no special match");

			}
		})
	})

//	console.log("fs.l: ", filteredSpecials.length);

    return filteredSpecials;
//	return filteredOutSpecials;

}
