export function addHhFilterSelector() {


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
