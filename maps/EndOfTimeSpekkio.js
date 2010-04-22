function EndOfTimeSpekkio(vwidth, vheight){
	
	this.mapname = "Spekkio's Room";
	this.vHeight = vheight;
	this.vWidth = vwidth;

	// initialize parent..
	Map.call(this, this.mapname, 'EndOfTimeSpekkio', this.vWidth, this.vHeight);

	// this should be the whole polygon...
	this.walkable = [
		{ x: 15, y: 184 }, { x: 81, y: 55 }, { x: 223, y: 124 }, { x: 157, y: 253 }, 
		{ x: 100, y: 225 }, { x: 92, y: 241 }, { x: 84, y: 237 }, { x: 83, y: 217 }, 
		{ x: 15, y: 184 }, // repeat first point 
	];
	
	this.events = [
		new Event(Event.GENERIC, {x: 89, y: 232}, 6, {x: 88, y: 235},
			Event.PROXIMITY, {
				onComplete: function(me){
					console.log("teleport to end of time room");
					CURE.switchMap('EndOfTime', 500, 264);
					//CURE.map = new EndOfTime(CURE.width, CURE.height);
					//CURE.hero.setPositionOnMap(500, 264);
					//CURE.map.x = 268;
					//CURE.map.y = 126;
				}
			})
	];
}

EndOfTimeSpekkio.prototype = new Map();
EndOfTimeSpekkio.prototype.constructor = EndOfTimeSpekkio;