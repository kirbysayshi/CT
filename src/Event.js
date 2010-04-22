function Event(type, location, radius, direction, trigger, options, repeatable){
	
	if(arguments.length == 0)
		return false;
	
	this.type = type;
	this.mapX = location.x;
	this.mapY = location.y;
	this.radius = radius;
	this.facingX = direction.x;
	this.facingY = direction.y;
	this.trigger = trigger;
	this.options = options;
	this.complete = false;
	this.repeatable = repeatable !== undefined ? repeatable : true;
	this.enabled = true;
	this.id = _id();
	this.lastMessageNum = 0;
	this.nextStep = 0;
	this.selected = 0;
	this.waiting = false;
	
	function _id(){
		return Math.floor(Math.random() * 100000000000000000);
	}
}

Event.prototype = {
	check: function(){
		
	},
	unload: function(){
		this.enabled = false;
		this.lastMessageNum = 0;
		this.nextStep = 0;
		this.complete = true;
		this.selected = 0;
		this.waiting = false;
		if(this.options.onComplete !== undefined){
			this.options.onComplete(this);
		}
	},
	reload: function(){
		this.enabled = true;
		this.complete = false;
		this.lastMessageNum = 0;
		this.nextStep = 0;
		this.selected = 0;
		this.waiting = false;
	}
};

// types of events
Event.GENERIC = "GENERIC";
Event.MESSAGE = 'MESSAGE';
Event.BATTLE = 'BATTLE';
Event.CHOICE = 'CHOICE'; // display list of options to the user?
Event.COMPLEX = "COMPLEX"; // some sort of combo of animations, battle, messages, etc

// event triggers
Event.ACTIVATE = 'ACTIVATE'; // press the ACTIVATE key near the event
Event.PROXIMITY = 'PROXIMITY'; 
