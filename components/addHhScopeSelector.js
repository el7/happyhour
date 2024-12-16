export function addHhScopeSelector() {

	var name = "hhModeRadio";
	var checked = "true";
	var labelNow = '<label for="radioNow">NOW</label>';
	var labelHour = '<label for="radioHour">HOUR</label>';
	var labelToday = '<label for="radioToday">TODAY</label>';
	var labelOff = '<label for="radioOff">OFF</label>';

	var radioModeNowHTML = '<input type="radio" id="hhModeNowRadio" class="radio hhMode" value="now" name="' + name + '"';
	var radioModeHourHTML = '<input type="radio" id="hhModeHourRadio" class="radio hhMode" value="hour" name="' + name + '"';
	var radioModeTodayHTML = '<input type="radio" id="hhModeTodayRadio" class="radio hhMode" value="today" name="' + name + '"';
	var radioModeOffHTML = '<input type="radio" id="hhModeOffRadio" class="radio hhMode" value="off" name="' + name + '"';
    var radioHtml = "";

	if (checked) {
		radioModeNowHTML += ' checked="checked"';
	}

	radioModeNowHTML += '/>';
	radioModeHourHTML += '/>';
	radioModeTodayHTML += '/>';
	radioModeOffHTML += '/>';

	radioHtml += 
    radioModeNowHTML + labelNow + 
    radioModeHourHTML + labelHour + 
    radioModeTodayHTML + labelToday + 
    radioModeOffHTML + labelOff;

	var radioFragment = document.createElement('div');
	radioFragment.innerHTML = radioHtml;

	document.body.appendChild(radioFragment);

}