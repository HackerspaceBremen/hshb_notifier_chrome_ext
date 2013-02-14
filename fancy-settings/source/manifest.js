// SAMPLE
this.manifest = {
    "name": "Hackerspace Bremen",
    "icon": "../../images/hackerspace_icon.png",
    "settings": [
        {
            "tab": i18n.get("updates"),
            "group": i18n.get("intervall"),
            "name": "descrIntervallName",
            "type": "description",
            "text": i18n.get("descrIntervall")
        },
        {
            "tab": i18n.get("updates"),
            "group": i18n.get("intervall"),
			"name": "intervallList",
			"type": "radioButtons",
            "label": i18n.get("intervallList"),
            "options": [
                [i18n.get("onem")],[i18n.get("fivem")],
				[i18n.get("tenm")],[i18n.get("fifteenm")],
				[i18n.get("thirtym")]
            ]   
        },
        {
            "tab": i18n.get("updates"),
            "group": i18n.get("notifications"),
            "name": "descrNotificationName",
            "type": "description",
            "label": i18n.get("descrNotifications")
        },
        {
            "tab": i18n.get("updates"),
            "group": i18n.get("notifications"),
            "name": "notificationCheckbox",
            "type": "checkbox",
            "label": i18n.get("notificationsEnable")
        }
    ]
};