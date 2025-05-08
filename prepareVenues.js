
export function prepareVenues () {

	// collect venues based on user's selection state
	const filters = collectFilters();
	fetchVenues2(filters);
}

// Collect filter data from DOM elements
function collectFilters() {

	let filters = {};

	filters.beer = document.getElementById('checkboxFilterBeer').checked;
	filters.liqueur = document.getElementById('checkboxFilterLiqueur').checked;    
	filters.timeFilter = document.querySelector('input[name="hhModeRadio"]:checked').value;

	return filters;
}

async function fetchVenues2 (filters) {

	let urlVenues = '';
	let params = new URLSearchParams();

	switch(filters.timeFilter) {
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

	// collect filters and add to url search
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

	// collect from api: venues with specials given timefilter
	try {
		const responseVenues = await fetch(urlVenues, {
			method: 'GET',
			headers: {
				'Accept': 'application/json'
			},
		});

		if (!responseVenues) throw new Error("No response received");
		if (!responseVenues.ok) throw new Error(`HTTP error! status: ${responseVenues.status}`);

		const responseVenuesText = await responseVenues.text();

		// Check if the response has any content before parsing as JSON
		if (responseVenuesText.length === 0) {
			console.warn('Received an empty response from the server');
			return [];
		}

        // Try to parse the JSON. If it fails, throw a more descriptive error
        try {
			console.log("parse: ", JSON.parse(responseVenuesText));
			displayNew(JSON.parse(responseVenuesText));
			return JSON.parse(responseVenuesText);
        } catch (jsonError) {
            console.error('Failed to parse JSON:', jsonError);
            console.log('Received text:', responseVenuesText);
            throw new Error('Response was not valid JSON');
        }


	} catch (error) {
		console.error('Fetch error:', error);
		return null;
	}


}

// adds html content for venue/special, adds link to special detail view
function displayNew(allVenues){

	const venueListDiv = document.createElement('div');
	venueListDiv.id = 'venueList';
	venueListDiv.classList.add('venueListDiv');
	venueListDiv.innerHTML = '';
	document.getElementById('contentArea').appendChild(venueListDiv);


	allVenues.forEach(venue => {

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
		venueDiv.classList.add('venueDiv');
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



