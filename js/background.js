"use strict";

var settings = new Store("settings", {
    "notificationCheckbox": true,
	"intervallList": i18n.get("fivem")
});

getStatus(true);

chrome.extension.onMessage.addListener(
     function(request, sender, sendResponse)
     {
		if(request.name=="fetch"){
			if(typeof(localStorage.status) != 'undefined'){
				var message = "";
				if(typeof(localStorage.message) != 'undefined'){
					message = localStorage.message;
				}
-				sendResponse({name: localStorage.status, timeText: localStorage.time, message: message})
			}else{
				getStatus(false);
			}
		}
     }
);

function getData(callBack){
	if(typeof(localStorage.status) != 'undefined'){
		var message = "";
		if(typeof(localStorage.message) != 'undefined'){
			message = localStorage.message;
		}
		callBack({name:localStorage.status, timeText: localStorage.time, message: message});
	}else{
		getStatus(false);
	}
}

function getStatus(intervall) {
	$.ajax({
		url: 'https://hackerspacehb.appspot.com/v2/status?format=de',
		dataType: 'json',
		success: function(data, textStatus, jqXHR){
			var res = JSON.parse(jqXHR.responseText);
			if(res.RESULT.ST3=="OPEN"){
				chrome.browserAction.setIcon({path:"images/status_auf_48px.png"});
			}else{
				chrome.browserAction.setIcon({path:"images/status_zu_48px.png"});
			}
			if(typeof(res.RESULT.ST5) == 'undefined'){
				localStorage.message = '';
			}else{
				localStorage.message = res.RESULT.ST5;
			}
			showNotification(res.RESULT.ST3, res.RESULT.ST2);
			chrome.extension.sendMessage({name: res.RESULT.ST3, timeText: res.RESULT.ST2, message: res.RESULT.ST5});
		}
	});
	if(intervall){
		var fetchFreq = getFetchFreq();
		setTimeout(callGetStatus, fetchFreq);
	}
}

function getFetchFreq(){
	var intervallList = settings.get("intervallList");
	if(typeof(intervallList) == undefined || intervallList == i18n.get("fivem")){
		return 300000;
	}else if(intervallList == i18n.get("onem")){
		return 60000;
	}else if(intervallList == i18n.get("tenm")){
		return 600000;
	}else if(intervallList == i18n.get("fifteenm")){
		return 900000;
	}
	//i18n.get("thirtym")
	return 1800000;
}

function callGetStatus(){
	getStatus(true);
}

function showNotification(givenStatus, givenTime){
	// Create a simple text notification:
	
	if(typeof(localStorage.status) == 'undefined' || (givenTime != localStorage.time)){
		localStorage.status = givenStatus;
		localStorage.time = givenTime;
		var notificationCheckbox = settings.get("notificationCheckbox");
		if(notificationCheckbox){
			var notification;
			if(givenStatus=="OPEN"){
				notification = webkitNotifications.createNotification(
					'images/status_auf_48px.png', 
					'Der Space ist offen!',  
					givenTime
				);
			}else{
			
				notification = webkitNotifications.createNotification(
					'images/status_zu_48px.png', 
					'Der Space ist geschlossen!',  
					givenTime
				);
			}
			// Then show the notification.
			notification.show();
		}
	}
}