/* import data */

// load intial state
document.addEventListener('DOMContentLoaded', (event) => {
	starter();
});

function starter() {

    const urlParams = new URLSearchParams(window.location.search);
    const specialId = urlParams.get('id');
    getSpecialData(specialId);

}


async function getSpecialData(specialId){

    let urlVenues = new URL(`http://localhost:3000/api/specials/${specialId}`);

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
        const parsedData = JSON.parse(text)[0];

        if (text.length === 0) {
            console.warn('Received an empty response from the server');
            return [];
        }

        // Try to parse the JSON. If it fails, throw a more descriptive error
        try {
//			displayNew(text);		

            getSpecialDetails(parsedData);
            
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

    let urlDetails = new URL(`http://localhost:3000/api/details/${specials.txtSpecialID}`);

    try {
        const responseSpecialDetails = await fetch(urlDetails, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },
        });

        if (!responseSpecialDetails) throw new Error("No response received");
        if (!responseSpecialDetails.ok) throw new Error(`HTTP error! status: ${responseSpecialDetails.status}`);

        // Check if the response has any content before parsing as JSON
        const text = await responseSpecialDetails.text();
        const parsedData = JSON.parse(text);

        if (text.length === 0) {
            console.warn('Received an empty response from the server');
            return [];
        }

        // Try to parse the JSON. If it fails, throw a more descriptive error
        try {
            displaySpecial(specials, parsedData);

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
    specialListDiv.classList.add('specialListDiv');
	specialListDiv.id = 'venueList';
	specialListDiv.innerHTML = '';
	document.body.appendChild(specialListDiv);

	let specialDiv = document.createElement('div');
    specialDiv.classList.add('specialDiv');
    specialDiv.innerHTML = `
    <h3></h3>
    <h6>
    Special Name: ${specials.txtSpecialName}<br> 
    Special Note: ${specials.txtSpecialNote}<br> 
    </h6>
    `;
    specialListDiv.appendChild(specialDiv);

    details.forEach(detail => {
 
        let detailDiv = document.createElement('div');
		detailDiv.classList.add('detailDiv');        
        detailDiv.innerHTML = `
        <h6>
        [${detail.txtDealType}] ${detail.txtDealModifier}${detail.intDealValue} ${detail.txtSpecialDetailName}: ${detail.txtDealNote}  
        </h6>
        `;
        specialListDiv.appendChild(detailDiv);

    });


}

