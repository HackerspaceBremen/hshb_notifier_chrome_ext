"use strict";

(function(window) {

	chrome.extension.sendMessage({name:"fetch"}, function(response) {
		styleData(response, document.getElementById('since_time'), document.getElementById('load_data'),
			document.getElementById('space_message'));
	});
	
	chrome.extension.onMessage.addListener(
		function(request, sender, sendResponse)
		{
			styleData(request, document.getElementById('since_time'), document.getElementById('load_data'), 
				document.getElementById('space_message'));
		}
	);
})(window, undefined);

function styleData(data, sinceTime, loadData, spaceMessage){
	var body = document.getElementById('popupId');
	switch (data.name)
	{
	   case "OPEN":
			loadData.style.display="none";
			sinceTime.innerHTML = "<b>" + data.timeText + "</b>";
			if(data.message.length > 0){
				spaceMessage.innerHTML = "<b>Statusnachricht: </b></br>" + data.message;
				spaceMessage.style.display = "inline";
			}else{
				spaceMessage.style.display = "none";
			}
			body.setAttribute("class", "space_open");
			break;
	   case "CLOSED":
			loadData.style.display="none";
			sinceTime.innerHTML = "<b>" + data.timeText + "</b>";
			if(data.message.length > 0){
				spaceMessage.innerHTML = "<b>Statusnachricht: </b></br>" + data.message;
				spaceMessage.style.display = "inline";
			}else{
				spaceMessage.style.display = "none";
			}
			body.setAttribute("class", "space_closed");
		  break;
	}
}