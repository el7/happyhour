/* import data */
import { fetchTest } from './fetchTest.js';
import { displayVenuesOld } from './legacyDisplay.js';
import { prepareVenues } from './prepareVenues.js';

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

// load data for intial state
document.addEventListener('DOMContentLoaded', (event) => {
	starter();
});


function starter() {

	// fetchTest();
	clearPage();
	addHhScopeSelector();
	addHhFilterSelector();
	//displayVenuesOld();
	prepareVenues();
}

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

function addHhScopeSelector() {

	var name = "hhModeRadio";
	var checked = "true";
	var labelNow = '<label for="radioNow">NOW</label>';
	var labelHour = '<label for="radioHour">HOUR</label>';
	var labelToday = '<label for="radioToday">TODAY</label>';
	var labelButton = '<label for="venueButton">Click!</label>';

	var radioModeNowHTML = '<input type="radio" id="hhModeNowRadio" class="radio hhMode" value="now" name="' + name + '"';
	var radioModeHourHTML = '<input type="radio" id="hhModeHourRadio" class="radio hhMode" value="hour" name="' + name + '"';
	var radioModeTodayHTML = '<input type="radio" id="hhModeTodayRadio" class="radio hhMode" value="today" name="' + name + '"';
	var radioHtml = "";

	if (checked) {
		radioModeNowHTML += ' checked="checked"';
	}

	radioModeNowHTML += '/>';
	radioModeHourHTML += '/>';
	radioModeTodayHTML += '/>';

	radioHtml += radioModeNowHTML + labelNow + radioModeHourHTML + labelHour + radioModeTodayHTML + labelToday;

	var radioFragment = document.createElement('div');
	radioFragment.innerHTML = radioHtml;

	document.body.appendChild(radioFragment);
	addHhFilterSelector
}

function addHhFilterSelector() {


	var checkboxHMTLBeer = "<input type='checkbox' class='checkbox hhAttr' id='checkboxFilterBeer' name='filterBeer'>";
	var checkboxLabelBeer = "<label for='filterBeer'>Beer</label>";
	var checkboxHMTLLiqueur = "<input type='checkbox' class='checkbox hhAttr' id='checkboxFilterLiqueur' name='filterLiqueur' >";
	var checkboxLabelLiqueur = "<label for='filterLiqueur'>Liqueur</label>";
	var htmlBreak = "<br>";

	var checkboxHTMLComplete = checkboxHMTLBeer + checkboxLabelBeer + htmlBreak + checkboxHMTLLiqueur + checkboxLabelLiqueur + htmlBreak;

	var checkboxFragment = document.createElement('div');
	checkboxFragment.innerHTML = checkboxHTMLComplete;

	document.body.appendChild(checkboxFragment);

}