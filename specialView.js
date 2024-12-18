/* import data */

// load intial state
document.addEventListener('DOMContentLoaded', (event) => {
	starter();
});

function starter() {

    let venueId = '';

    const urlParams = new URLSearchParams(window.location.search);
    const specialId = urlParams.get('id');
    
    console.log(specialId); // This would log "123" to the console if the link was clicked

    getSpecialData(specialId);

}


async function getSpecialData(specialId){

    // 0SP0000002
    // ${specialId}
    let urlVenues = new URL(`/api/specials/${specialId}`, window.location.origin);
    console.log("url: ", urlVenues);

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
            displaySpecial(specialId);

            return '';
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

function displaySpecial(specialId) {

	const specialListDiv = document.createElement('div');
	specialListDiv.id = 'venueList';
	specialListDiv.innerHTML = '';
	document.body.appendChild(specialListDiv);

    // run query given specialId

    // display data

	let specialDiv = document.createElement('div');
    specialDiv.innerHTML = `

    <h3></h3>
    <h6>
    Special Name: <a href='./specialView.html'></a><br> 
    Special Note: <br> 
    Special Start 1: <br> 
    Special End 1: <br>
    Venue ID: <br> 
    Special ID: <br> 
    </h6>
    `;
    specialListDiv.appendChild(specialDiv);

}

