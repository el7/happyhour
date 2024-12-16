/* import data */
import { fetchTest } from './utils/fetchTest.js';
import { displayVenuesOld } from './spare_files/legacyDisplay.js';
import { prepareVenues } from './prepareVenues.js';
import { isEmpty } from "./utils/utils.js";
import {addHhScopeSelector} from "./components/addHhScopeSelector.js";
import { addHhFilterSelector } from "./components/addHhFilterSelector.js";

/* const and variables */
const HH_ScopeSelection = {
	HH_All: "all",
	HH_Today: "today",
	HH_WithinHour: "hour",
	HH_Now: "now"
}

var specialActive = false;
var hhSelection = HH_ScopeSelection.HH_Now;
// hhSelection = HH_ScopeSelection.HH_Today;
// hhSelection = HH_ScopeSelection.HH_WithinHour;

var datetimeNow = new Date();
//var datetimeNow = new Date("2023-09-15T22:00:00.000Z");

// load intial state
document.addEventListener('DOMContentLoaded', (event) => {
	console.log("here");
	starter();
});


function starter() {

	// fetchTest(); // test festching data
	clearPage();
	addHhScopeSelector();
	addHhFilterSelector();
	//displayVenuesOld(); // old method of showing data
	prepareVenues();
}

// handle time and filter selections
document.addEventListener('click', function (event) {
	if (event.target.matches('.hhMode')) {
		console.log('Radio reLoading');
		
		prepareVenues();
	} else if (event.target.matches('.hhAttr')) {
		console.log('Checkbox reLoading');
		prepareVenues();
	}
});


function clearPage() {
	document.body.innerHTML = "";
}
