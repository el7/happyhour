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
    let urlVenues = new URL(`http://localhost:3000/api/specials/${specialId}`);
    console.log("url: ", urlVenues);
    
    try {
        const responseVenues = await fetch(urlVenues, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },
        });

        console.log("Response status:", responseVenues.status);
        console.log("Response status text:", responseVenues.statusText);
        console.log("Response headers:", responseVenues.headers);

        if (!responseVenues) throw new Error("No response received");
        if (!responseVenues.ok) throw new Error(`HTTP error! status: ${responseVenues.status}`);

        // Check if the response has any content before parsing as JSON
        const text = await responseVenues.text();
        const parsedData = JSON.parse(text)[0];

        if (text.length === 0) {
            console.warn('Received an empty response from the server');
            return [];
        }

        // Try to parse the JSON. If it fails, throw a more descriptive error
        try {
//			displayNew(text);		

            console.log("parsed: ", parsedData);
            getSpecialDetails(parsedData);
//            return parsedData;

        } catch (jsonError) {
            console.error('Failed to parse JSON:', jsonError);
            console.log('Received text:', text);
            throw new Error('Response was not valid JSON');
        }

    } catch (error) {
        console.error('Fetch error:', error);
        
        return null;
    }
    

}

async function getSpecialDetails(specials){

    // 0SP0000002
    // ${specialId}
    let urlDetails = new URL(`http://localhost:3000/api/details/${specials}`);
    console.log("url: ", urlDetails);
    
    try {
        const responseSpecialDetails = await fetch(urlDetails, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },
        });

        console.log("Response status:", responseSpecialDetails.status);
        console.log("Response status text:", responseSpecialDetails.statusText);
        console.log("Response headers:", responseSpecialDetails.headers);

        if (!responseSpecialDetails) throw new Error("No response received");
        if (!responseSpecialDetails.ok) throw new Error(`HTTP error! status: ${responseSpecialDetails.status}`);

        // Check if the response has any content before parsing as JSON
        const text = await responseSpecialDetails.text();
        console.log("T, ", text);
        const parsedData = JSON.parse(text);

        if (text.length === 0) {
            console.warn('Received an empty response from the server');
            return [];
        }

        // Try to parse the JSON. If it fails, throw a more descriptive error
        try {
//			displayNew(text);		

            console.log("parsed2: ", parsedData);
            displaySpecial(specials, parsedData);
//            return parsedData;

        } catch (jsonError) {
            console.error('Failed to parse JSON:', jsonError);
            console.log('Received text:', text);
            throw new Error('Response was not valid JSON');
        }

    } catch (error) {
        console.error('Fetch error:', error);
        
        return null;
    }


}


function displaySpecial(specials, details) {

	const specialListDiv = document.createElement('div');
	specialListDiv.id = 'venueList';
	specialListDiv.innerHTML = '';
	document.body.appendChild(specialListDiv);

    console.log("test: ", specials.txtVenueID);


	let specialDiv = document.createElement('div');
    specialDiv.innerHTML = `

    <h3></h3>
    <h6>
    Special Name: ${specials.txtSpecialName}<br> 
    Special Note: ${specials.txtSpecialNote}<br> 
    Special Start 1: <br> 
    Special End 1: <br>
    Venue ID: ${specials.txtVenueID}<br> 
    Special ID: ${specials.txtSpecialID}<br> 
    </h6>
    `;
    specialListDiv.appendChild(specialDiv);

}

