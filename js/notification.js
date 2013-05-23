

var Notification = function() {
  
};


Notification.show = function(givenStatus, givenTime){
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