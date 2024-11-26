
export const fetchTest = () => {

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
};