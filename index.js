/* import data */
import { fetchTest } from './utils/fetchTest.js';
import { displayVenuesOld } from './spare_files/legacyDisplay.js';
import { prepareVenues } from './prepareVenues.js';
import { isEmpty } from "./utils/utils.js";
import {addHhScopeSelector} from "./components/addHhScopeSelector.js";
import { addHhFilterSelector } from "./components/addHhFilterSelector.js";

let hhModeState; // Store the state of the radio buttons
let hhAttrState = {}; // Store the state of the checkboxes

// load intial state
document.addEventListener('DOMContentLoaded', (event) => {
	starter();
});

// handle time and filter selections
document.addEventListener('click', function (event) {
    if (event.target.matches('.hhMode') || event.target.matches('.hhAttr')) {
        // Save state after the click has processed the change
        saveState();
        refreshContent();
    }
});


function starter() {
    // Assuming you have a container for filters and another for content
    addHhScopeSelector();
    addHhFilterSelector();
    saveState(); // Initial state saves after selectors are added
    refreshContent();
}

function refreshContent() {
    // Here, instead of clearing the entire page, clear only the content area
    let contentArea = document.getElementById('contentArea'); // Make sure you have this element in your HTML
    if (contentArea) {
        contentArea.innerHTML = "";
        prepareVenues();
    } else {
		console.log("lol");
	}
}

// Function to save the state of selectors
function saveState() {
    let mode = document.querySelector('input[name="hhMode"]:checked');
    hhModeState = mode ? mode.value : null;

    document.querySelectorAll('.hhAttr').forEach(checkbox => {
        hhAttrState[checkbox.value] = checkbox.checked;
    });
}
