import { displayDataController } from './displayData.js';
import { isEmpty } from "./utils/utils.js";

export async function prepareVenues () {

	// collect venues based on user's selection state
	const filters = collectFilters();
	const timeFilter = document.querySelector('input[name="hhModeRadio"]:checked');

	const filteredVenues2 = await fetchVenues2(filters, timeFilter.value);
}

// Function to gather filters (example)
function collectFilters() {

	let filters = {};
	// Collect filter data from DOM elements
	filters.beer = document.getElementById('checkboxFilterBeer').checked;
	filters.liqueur = document.getElementById('checkboxFilterLiqueur').checked;    

    console.log("filter beer: ", filters.beer);
    console.log("filter liqueur: ", filters.liqueur);

	return filters;
}


async function fetchVenues2 (filters, timeFilter) {

	let urlVenues = '';
	let params = new URLSearchParams();

	switch(timeFilter) {
	case 'now':
		urlVenues = new URL('http://localhost:3000/api/getSpecialsNow');
		break;
	case 'hour':
		urlVenues = new URL('http://localhost:3000/api/getSpecialsHour');
		break;
	case 'today':
		urlVenues = new URL('http://localhost:3000/api/getSpecialsToday');
		break;
	default:
		urlVenues = new URL('http://localhost:3000/api/getSpecialsNow');
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
		const responseVenues = await fetch(urlVenues, {
			method: 'GET',
			headers: {
				'Accept': 'application/json'
			},
		});

		if (!responseVenues) throw new Error("No response received");
		if (!responseVenues.ok) throw new Error(`HTTP error! status: ${responseVenues.status}`);

		// Check if the response has any content before parsing as JSON
		const text = await responseVenues.text();
		if (text.length === 0) {
			console.warn('Received an empty response from the server');
			return [];
		}

        // Try to parse the JSON. If it fails, throw a more descriptive error
        try {
//			displayNew(text);		
			console.log("parse: ", JSON.parse(text));
			displayNew(JSON.parse(text));
			return JSON.parse(text);
        } catch (jsonError) {
            console.error('Failed to parse JSON:', jsonError);
            console.log('Received text:', text);
            throw new Error('Response was not valid JSON');
        }
//        console.log("filteredVenues: ", filterVenues.length )


		return allVenues;

	} catch (error) {
		console.error('Fetch error:', error);
		return null;
	}


}


function displayNew(allVenues){

	const venueListDiv = document.createElement('div');
	venueListDiv.id = 'venueList';
	venueListDiv.innerHTML = '';
	document.body.appendChild(venueListDiv);

	allVenues.forEach(venue => {

		console.log("V: ", venue);

		const dateSpecialStart1 = new Date(venue.txtSpecialStart1);
		const dateSpecialEnd1 = new Date(venue.txtSpecialEnd1);
	
		const timeStringStart1 = dateSpecialStart1.toLocaleTimeString('en-US', { 
			hour: 'numeric', 
			minute: 'numeric', 
			hour12: true 
		  });
	
		  const timeStringEnd1 = dateSpecialEnd1.toLocaleTimeString('en-US', { 
			hour: 'numeric', 
			minute: 'numeric', 
			hour12: true 
		  });
	

		let venueDiv = document.createElement('div');
		venueDiv.innerHTML = `
		<h3>${venue.txtVenueName}</h3>
		<h5>
		<a href='./specialView.html?id=${venue.txtSpecialID}'>${venue.txtSpecialName}</a> (${timeStringStart1} - ${timeStringEnd1})<br>
		${venue.txtSpecialNote}
		</h5>
	  `;
		venueListDiv.appendChild(venueDiv);

	});
}



