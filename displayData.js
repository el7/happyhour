import { isEmpty } from "./utils/utils.js";

export function displayDataController(venues, specialHours, specials) {

    // Clear previous content
    console.log("type: ", typeof venues);
    console.log("type: ", typeof specialHours);
    console.log("type: ", typeof specials);

    /*
    // Step 1: Normalize data
    const venuesMap = Object.fromEntries(venues.map(venue => [venue.id, venue]));
    const specialHoursMap = Object.fromEntries(specialHours.map(hour => [hour.venueId, hour]));
    const specialsMap = Object.fromEntries(specials.map(special => [special.venueId, special]));
    console.log(combinedData);
    */

	displayVenues(venues);
	// displaySpecialHours(specialHours);
	displaySpecials(specials);

}


function displayVenues(venues){

	const venueListDiv = document.createElement('div');
	venueListDiv.id = 'venueList';
	venueListDiv.innerHTML = '';
	document.body.appendChild(venueListDiv);

	// Add new venues
	venues.forEach(venue => {

		let venueDiv = document.createElement('div');
		venueDiv.innerHTML = `
		<h3>${venue.txtVenueName}</h3>
		<h6><a href='${venue.txtVenueWebsite}'>${venue.txtVenueWebsite}</a> <br>${venue.txtVenueAddress1}' <br>${venue.txtVenuePhoneNumber}</h6>
	  `;
		venueListDiv.appendChild(venueDiv);

        // 
	});


}

function displaySpecialHours(specialHours){

}



function displaySpecials(specials){

	console.log(isEmpty(specials)); // true
	specials.prop = 'value';
	console.log(isEmpty(specials)); // false

	const specialsListDiv = document.createElement('div');
	specialsListDiv.id = 'specialsList';
	specialsListDiv.innerHTML = '';
	document.body.appendChild(specialsListDiv);
	console.log("specials length: ", specials.id)

	// Add new venues
	specials.forEach(special => {

		console.log("special: ", special.txtSpecialName);
		let specialDiv = document.createElement('div');
		specialDiv.innerHTML = `
		<p>Happy Hour: ${special.txtSpecialName}</p>		
	  `;
		specialsListDiv.appendChild(specialDiv);

        // 
	});


}


