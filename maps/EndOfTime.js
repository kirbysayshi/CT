function EndOfTime(vwidth, vheight){

	this.mapname = "End of Time";
	//this.path = '../images/maps/png/eot.png';
	this.vHeight = vheight;
	this.vWidth = vwidth;
	this.backgroundColor = "#0d0d0d";

	// initialize parent..
	Map.call(this, this.mapname, 'EndOfTime', this.vWidth, this.vHeight, this.backgroundColor);

	// this should be the whole polygon...
	this.walkable = [
		{ x: 176, y: 68  }, { x: 321, y: 141 }, { x: 302, y: 173 }, { x: 302, y: 180 }, 
		{ x: 347, y: 225 }, { x: 412, y: 257 }, { x: 420, y: 254 }, { x: 432, y: 228 }, 
		{ x: 492, y: 260 }, { x: 501, y: 245 }, { x: 509, y: 249 }, { x: 510, y: 271 }, 
		{ x: 519, y: 275 }, { x: 528, y: 273 }, { x: 535, y: 282 }, { x: 537, y: 304 }, 
		{ x: 544, y: 316 }, { x: 553, y: 324 }, { x: 556, y: 336 }, { x: 620, y: 369 }, 
		{ x: 637, y: 396 }, { x: 627, y: 415 }, { x: 612, y: 389 }, { x: 552, y: 358 }, 
		{ x: 541, y: 359 }, { x: 538, y: 374 }, { x: 510, y: 432 }, { x: 402, y: 379 }, 
		{ x: 402, y: 359 }, { x: 405, y: 349 }, { x: 409, y: 319 }, { x: 402, y: 285 }, 
		{ x: 336, y: 249 }, { x: 292, y: 205 }, { x: 283, y: 208 }, { x: 255, y: 271 }, 
		{ x: 110, y: 203 }, { x: 176, y: 68 }, // repeat first point 

		{ x: 464, y: 302 }, { x: 480, y: 303 }, { x: 483, y: 335 }, { x: 472, y: 341 }, 
		{ x: 459, y: 336 }, { x: 464, y: 302 }, // repeat first point 
	];
	
	// these coordinates all all off since the map changed
	this.events = [
		// Day of Lavos, touch the bucket
		new Event(Event.CHOICE, {x: 540, y: 295}, 30, {x: 550, y: 288}, 
			Event.ACTIVATE, { 
				choices: [
					{text: "Yes", payload: function(){
						if(CURE.db.getMapFlag('bucket') == true)
							console.log("yes!"); 
						else{
							console.log('bucket');
						}
					}},
					{text: "No", payload: function(){ console.log("no"); }},
					{text: "Secret Option 3", payload: function(){ console.log('opt3') }},
					{text: "Secret Option 4", payload: function(){ console.log('opt4') }},
					{text: "Secret Option 5", payload: function(){ console.log('opt5') }},
				],
				prompt: "Go to the Day of Lavos, 1999 AD?",
				payload: [
					function(){
						//CURE.mt.message("Go to the Day of Lavos, 1999 AD?");
					}
				],
				onComplete: function(me){
					this.complete = true;
					console.log("bucket event complete");
				}
			}),
		new Event(Event.GENERIC, {x: 470, y: 333}, 20, {x: 470, y: 333},
			Event.ACTIVATE, {
				payload: [
					function(){ 
						CURE.db.setMapFlag('bucket', true);
						CURE.mt.message("Old Man: Do you dare challenge Lavos? Do you dare to change what has been set in motion?"); 
					},
					function(){ CURE.mt.message("Old Man: If so, then touch the bucket."); }
				],
				onComplete: function(me){
					console.log('old man complete');
				}
			}),
		new Event(Event.GENERIC, {x: 230, y: 135}, 8, {x: 230, y: 135}, 
			Event.ACTIVATE, {
				payload: [
					function(){ CURE.mt.message('TEST: Make sure you send the message properly, ok?'); },
					function(){ CURE.mt.message('DO YOU REALIZE: Yes, yes, I hope you do.'); },
					function(){ CURE.mt.message('Please take notice: do not step on the portals! They are highly dangerous and trans-fluxative.'); }
				],
				onComplete: function(me){
					console.log("event complete");
				}
			}),
		new Event(Event.GENERIC, {x: 502, y: 250}, 5, {x: 500, y: 260},
			Event.PROXIMITY, {
				onComplete: function(me){
					console.log("teleport to spekkio's room");
					CURE.switchMap('EndOfTimeSpekkio', 95, 217);
					//CURE.map = new EndOfTimeSpekkio(CURE.width, CURE.height);
					//CURE.hero.setPositionOnMap(82, 195);
				}
			})
		
	];
	
	this.doors = [
		new Door('EndOfTimeSpekkio', 82, 204)
	];
	
	this.children = [
		new LightPillar()
	];

	this.children[0].setPositionOnMap(216, 171);
	this.children[0].setSequence('stop_down');
	CURE.addChild(this.children[0]);
};

EndOfTime.prototype = new Map();
EndOfTime.prototype.constructor = EndOfTime;