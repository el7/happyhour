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


	// displayVenues(venues, specials);
	// displaySpecialHours(specialHours);
	// displaySpecials(specials);

}



