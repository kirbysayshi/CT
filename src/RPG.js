// framerate is in frames per second...

function RPG(window, canvas, frameRate, width, height){
	this.window = window;
	this.window.CURE = this;
	this.canvas = canvas;
	this.ctx = canvas.getContext('2d');
	this.frameRate = frameRate;
	this.frameInterval = 1000 / this.frameRate;
	this.ref = null;
	this.width = width;
	this.height = height;

	this.messageMaxLines = 4;

	// populated by dev
	this.assetList = {};
	this.as = new AssetLoader(function(){
		CURE.onPreloadComplete();
	});
	
	this.key = new InputDetection(this.window, this);
	this.key.addKeyListener(InputDetection.DOWN_ARROW, CURE.checkMenuEvents);
	this.key.addKeyListener(InputDetection.UP_ARROW, CURE.checkMenuEvents);
	this.key.addKeyListener(InputDetection.LEFT_ARROW, CURE.checkMenuEvents);
	this.key.addKeyListener(InputDetection.RIGHT_ARROW, CURE.checkMenuEvents);
	
	this.mt = new MonoText('ct_en_mono', this.canvas, 256, 224, true, 8, 9, 0);
	
	this.renderObjects = Array();
	this.addedObjects = Array();
	
	this.backBuffer = document.createElement('canvas');
	this.backBuffer.width = this.canvas.width;
	this.backBuffer.height = this.canvas.height;
	this.backCtx = this.backBuffer.getContext('2d');
	
	this.currentEvent = 0;
	
	this.db = new Database();
}

RPG.prototype = {
	preload: function(){
		for(var a in this.assetList){
			console.log(a);
			this.as.queue( this.assetList[a][0], {src: this.assetList[a][1], name: a} );
		}
	},
	onPreloadComplete: function(){
		
		this.hero = new Crono();
		this.hero.setPositionOnMap(215, 168);
		this.hero.setSequence('stop_down');
		this.addChild(this.hero);
		
		this.map = new EndOfTime(this.width, this.height);
		this.map.scrollRight(75);
		this.map.scrollDown(80);
		
		this.start();
	},
	start: function(){
		var me = this;
		me.ref = setInterval(function(){
			me.main();
		}, this.frameInterval);
	},
	stop: function(){
		clearInterval(this.ref);
		this.ref = null;
	},
	main: function(){
		// default, will probably be overriden by developer
		this.render();
		this.checkInput();
		this.key.ellapse();
		this.checkProximityEvents();
	},
	addChild: function(obj){
		this.addedObjects.push(obj);
	},
	_processNewChildren: function(){
		if( this.addedObjects.length != 0){
			for(var i = 0; i < this.addedObjects.length; i++){
				this.renderObjects.push(this.addedObjects[i]);
			}
			this.addedObjects = new Array();
			this._zSort();
		}
	},
	_zSort: function(){
		this.renderObjects.sort(function(a,b){return a.z - b.z;});
		return this;
	},
	render: function(){
		this.backCtx.clearRect(0, 0, this.backBuffer.width, this.backBuffer.height);
		// process current map layers
		this.map.drawBackground(this.backCtx);
		this.map.drawUnderlays(this.backCtx);
		
		// process display list
		this._processNewChildren();
		for(var i = 0; i < this.renderObjects.length; i++){
			this.renderObjects[i].draw(this.backCtx, this.map.x, this.map.y, this.renderObjects[i]);
			for(var c = 0; c < this.renderObjects[i].children.length; c++){
				this.renderObjects[i].children[i].draw(this.backCtx, this.map.x, this.map.y, this.renderObjects[i].children[i]);
			}
		}
		
		this.map.drawOverlays(this.backCtx);
		this.mt.draw(this.backCtx);
		
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.ctx.drawImage(this.backBuffer, 0, 0);
	},
	// x,y: position of main char relative to VIEWPORT
	scrollNeeded: function(direction, x, y){
		//console.log(x - (this.map.vWidth * 0.5));
		//console.log(y - (this.map.vHeight * 0.5));
		var right = x - (this.map.vWidth * 0.5) > 0.1;
		var left  = x - (this.map.vWidth * 0.5) < -0.1;
		var up 	  = y - (this.map.vHeight * 0.5) < -0.1;
		var down  = y - (this.map.vHeight * 0.5) > 0.1;
		
		if(direction == 'lowerright' && right && down){
			return true;
		} else if(direction == 'upperright' && right && up){
			return true;
		} else if(direction == 'lowerleft' && left && down){
			return true;
		} else if(direction == 'upperleft' && left && up){
			return true;
		} else if(direction == 'right' && right){
			return true;
		} else if(direction == 'left' && left){
			return true;
		} else if(direction == 'up' && up){
			return true;
		} else if(direction == 'down' && down){
			return true;
		} else
			return false;
	},
	checkInput: function(){

		// disable movement while a message is showing
		if(this.mt.messageShowing == false){
					
			if(this.key.lastkey == InputDetection.RIGHT_ARROW)
				this.hero.setSequence('stop_right');
			else if(this.key.lastkey == InputDetection.LEFT_ARROW)
				this.hero.setSequence('stop_left');
			else if(this.key.lastkey == InputDetection.UP_ARROW)
				this.hero.setSequence('stop_up');
			else if(this.key.lastkey == InputDetection.DOWN_ARROW)
				this.hero.setSequence('stop_down');
			
		
			var right = this.map.isPointInPoly(this.map.walkable, {
				x: this.hero.mapX + this.hero.getSpeed(), 
				y: this.hero.mapY });
		
			var left  =	this.map.isPointInPoly(this.map.walkable, {
				x: this.hero.mapX - this.hero.getSpeed(), 
				y: this.hero.mapY });
		
			var up    =	this.map.isPointInPoly(this.map.walkable, {
				x: this.hero.mapX, 
				y: this.hero.mapY - this.hero.getSpeed()});
			
			var down  =	this.map.isPointInPoly(this.map.walkable, {
				x: this.hero.mapX, 
				y: this.hero.mapY + this.hero.getSpeed()});
			
		
			var upperRight = this.map.isPointInPoly(this.map.walkable, {
				x: this.hero.mapX + this.hero.getSpeed(), 
				y: this.hero.mapY - this.hero.getSpeed()});
		
			var lowerRight = this.map.isPointInPoly(this.map.walkable, {
				x: this.hero.mapX + this.hero.getSpeed(), 
				y: this.hero.mapY + this.hero.getSpeed()});
		
			var upperLeft  = this.map.isPointInPoly(this.map.walkable, {
				x: this.hero.mapX - this.hero.getSpeed(), 
				y: this.hero.mapY - this.hero.getSpeed()});
			
			var lowerLeft  = this.map.isPointInPoly(this.map.walkable, {
				x: this.hero.mapX - this.hero.getSpeed(), 
				y: this.hero.mapY + this.hero.getSpeed()});
		
			// specific to if against a wall
			var pt = this.map.getNearestPolyEdge(this.map.walkable, {x: this.hero.mapX, y: this.hero.mapY});
			var slope = Util.slope( this.map.walkable[pt.start], this.map.walkable[pt.end] );
			var mag = Util.magnitude(slope);
			var A = {x: this.hero.mapX, y: this.hero.mapY};
			var N = Util.normalize(slope, mag);
			var posDestination = Util.addPointToVector(Util.multiplyVectorScalar(N, this.hero.getSpeed()), A);
			posDestination.x = Math.round(posDestination.x);
			posDestination.y = Math.round(posDestination.y);
			var negDestination = Util.addPointToVector(Util.multiplyVectorScalar(N, -this.hero.getSpeed()), A);
			negDestination.x = Math.round(negDestination.x);
			negDestination.y = Math.round(negDestination.y);
			var incPos = {x: Math.abs(posDestination.x - this.hero.mapX), y: Math.abs(posDestination.y - this.hero.mapY)};
			var incNeg = {x: Math.abs(negDestination.x - this.hero.mapX), y: Math.abs(negDestination.y - this.hero.mapY)};
			var incPosValid = this.map.isPointInPoly(this.map.walkable, posDestination);
			var incNegValid = this.map.isPointInPoly(this.map.walkable, negDestination);
		

			// MOVE RIGHT
			if( this.key.isDown(InputDetection.RIGHT_ARROW) ) {
				
				if(this.hero.isRunning == true)
					this.hero.setSequence('run_right');
				else
					this.hero.setSequence('walk_right');
				
				if(right){
					this.hero.moveRight(this.hero.getSpeed());
					if(this.scrollNeeded('right', this.hero.x, this.hero.y))
						this.map.scrollRight(this.hero.getSpeed());
						
				} else if(incPosValid){//if(lowerRight){
					
					this.hero.setPositionOnMap(posDestination.x, posDestination.y);
					if(this.scrollNeeded('lowerright', this.hero.x, this.hero.y)){
						this.map.scrollRight(incPos.x);
						this.map.scrollDown(incPos.y);
					}
					if(this.scrollNeeded('upperright', this.hero.x, this.hero.y)){
						this.map.scrollRight(incPos.x);
						this.map.scrollUp(incPos.y);
					}
				} else
					this.hero.setSequence('stop_right');
			}
			// MOVE LEFT
			if( this.key.isDown(InputDetection.LEFT_ARROW) ) {
				//map.scrollLeft();
				
				if(this.hero.isRunning == true)
					this.hero.setSequence('run_left');
				else
					this.hero.setSequence('walk_left');
				
				if(left){
					this.hero.moveLeft(this.hero.getSpeed());
				} else if(incNegValid){//if(lowerRight){

					this.hero.setPositionOnMap(negDestination.x, negDestination.y);
					if(this.scrollNeeded('lowerleft', this.hero.x, this.hero.y)){
						this.map.scrollLeft(incNeg.x);
						this.map.scrollDown(incNeg.y);
					}
					if(this.scrollNeeded('upperleft', this.hero.x, this.hero.y)){
						this.map.scrollLeft(incNeg.x);
						this.map.scrollUp(incNeg.y);
					}
				} else
					this.hero.setSequence('stop_left');
				if(this.scrollNeeded('left', this.hero.x, this.hero.y))
					this.map.scrollLeft(this.hero.getSpeed());
			}
			// MOVE UP
			if( this.key.isDown(InputDetection.UP_ARROW) ) {
				//map.scrollUp();
				
				if(this.hero.isRunning == true)
					this.hero.setSequence('run_up');
				else
					this.hero.setSequence('walk_up');
				
				if(up){
					this.hero.moveUp(this.hero.getSpeed());
				} else if(incNegValid){
					if(slope > 0)
						this.hero.setPositionOnMap(negDestination.x, negDestination.y);
					if(slope < 0)
						this.hero.setPositionOnMap(posDestination.x, posDestination.y);
					
					if(this.scrollNeeded('upperright', this.hero.x, this.hero.y)){
						this.map.scrollRight(incPos.x);
						this.map.scrollUp(incPos.y);
					}
					if(this.scrollNeeded('upperleft', this.hero.x, this.hero.y)){
						this.map.scrollLeft(incNeg.x);
						this.map.scrollUp(incNeg.y);
					}
				} else
					this.hero.setSequence('stop_up');
				if(this.scrollNeeded('up', this.hero.x, this.hero.y))
					this.map.scrollUp(this.hero.getSpeed());
			}
			// MOVE DOWN
			if( this.key.isDown(InputDetection.DOWN_ARROW) ) {
				//map.scrollDown();
				
				if(this.hero.isRunning == true)
					this.hero.setSequence('run_down');
				else
					this.hero.setSequence('walk_down');
					
				if(down){
					this.hero.moveDown(this.hero.getSpeed());
				} else if(incPosValid){
					
					if(slope > 0)
						this.hero.setPositionOnMap(posDestination.x, posDestination.y);
					if(slope < 0)
						this.hero.setPositionOnMap(negDestination.x, negDestination.y);
					if(this.scrollNeeded('lowerleft', this.hero.x, this.hero.y)){
						this.map.scrollLeft(incNeg.x);
						this.map.scrollDown(incNeg.y);
					}
					if(this.scrollNeeded('lowerright', this.hero.x, this.hero.y)){
						this.map.scrollRight(incPos.x);
						this.map.scrollDown(incPos.y);
					}
				} else
					this.hero.setSequence('stop_down');
				if(this.scrollNeeded('down', this.hero.x, this.hero.y))
					this.map.scrollDown(this.hero.getSpeed());
			}
		}
		
		// ACTIVATE
		if( this.key.isDown(InputDetection.SPACE) ){
			this.key.hit(InputDetection.SPACE); // this key is a toggle
			console.log("space is down");
			this.checkActivateEvents();
			this.checkCurrentEvent();
			if(this.currentEvent.waiting == false){
				this.mt.printNextMessage();
			} else {
				// menu event has ended?!
				if(this.currentEvent.complete == false){
		
					this.currentEvent.options.choices[this.currentEvent.selected].payload();
					this.currentEvent.unload();
					
					if(this.currentEvent.repeatable == true){
						this.currentEvent.reload();
					}
					this.currentEvent = 0;
					
				}
				this.mt.printNextMessage();
			}
		}
		
		// Holding shift activates running
		if( this.key.isDown(InputDetection.SHIFT) ){
			this.hero.isRunning = true;
		} else
			this.hero.isRunning = false;
	},
	checkProximityEvents: function(){
		for(var e = 0; e < this.map.events.length; e++){
			var event = this.map.events[e];
		
			if(event.trigger == Event.PROXIMITY){
				var d = Util.distance(this.hero.mapX, this.hero.mapY, event.mapX, event.mapY);
				if(d < event.radius){
					if(event.type == Event.MESSAGE || event.type == Event.GENERIC){
						if(this.currentEvent == 0 && event.enabled == true){
							this.currentEvent = this.map.events[e];
							console.log("proximity event");
							this.checkCurrentEvent();
						} 
					}
				}
			}
		}
	},
	checkActivateEvents: function(){
		if(this.currentEvent == 0){	
			for(var e = 0; e < this.map.events.length; e++){
				var event = this.map.events[e];
		
				if(event.trigger == Event.ACTIVATE){
					var d = Util.distance(this.hero.mapX, this.hero.mapY, event.mapX, event.mapY);
					if(d < event.radius){
						if(event.type == Event.MESSAGE || event.type == Event.GENERIC || event.type == Event.CHOICE){
							if(this.currentEvent == 0 && event.enabled == true){
								this.currentEvent = this.map.events[e];		
							} 
						}
					}
				}
			}
		}
	},
	checkCurrentEvent: function(){
		if(this.currentEvent != 0){
			if(this.currentEvent.trigger == Event.ACTIVATE){
				if(this.currentEvent.type == Event.MESSAGE){
					if(this.currentEvent.lastMessageNum < this.currentEvent.options.text.length){
						this.mt.message( this.currentEvent.options.text[this.currentEvent.lastMessageNum] );
						this.currentEvent.lastMessageNum++;
					} else {
						this.currentEvent.unload();
						if(this.currentEvent.repeatable == true){
							this.currentEvent.reload();
						}
						this.currentEvent = 0;
					}
				} else if(this.currentEvent.type == Event.GENERIC){
					if(this.currentEvent.nextStep < this.currentEvent.options.payload.length){
						console.log('step:' + this.currentEvent.nextStep);
						this.currentEvent.options.payload[this.currentEvent.nextStep]();
						this.currentEvent.nextStep++;
					} else {
						this.currentEvent.unload();
						if(this.currentEvent.repeatable == true){
							this.currentEvent.reload();
						}
						this.currentEvent = 0;
					}
				} else if(this.currentEvent.type == Event.CHOICE){
					var display = this.currentEvent.options.prompt + " <> ";
					for(var c = this.currentEvent.nextStep; c < this.currentEvent.options.choices.length; c++){
						if(c < this.currentEvent.nextStep + this.messageMaxLines - 1){
							if(c == this.currentEvent.selected){
								display += " POINTRIGHT ";
							} else{
								display += " POINTBLANK ";
							}
							display += this.currentEvent.options.choices[c].text + " <> ";
						}
					}
					if(this.mt.messageShowing == false){
						this.mt.message(display);
					} else {
						this.currentEvent.waiting = true;
						this.mt.previousMessage = display;
					}
					
				}
			} else if(this.currentEvent.trigger == Event.PROXIMITY){
				if(this.currentEvent.type == Event.GENERIC){
					if(this.currentEvent.complete == false){
						this.currentEvent.unload();
						
						if(this.currentEvent.repeatable == true){
							this.currentEvent.reload();
						}
						this.currentEvent = 0;
					}
				}
			}
		}
	},
	checkMenuEvents: function(keyCode, scope){
		if(scope.currentEvent != 0){
			if(scope.currentEvent.type == Event.CHOICE){
				switch(keyCode){
					case InputDetection.DOWN_ARROW:
						if(scope.currentEvent.selected + 1 < scope.currentEvent.options.choices.length){
							scope.currentEvent.selected++;
							scope.checkCurrentEvent();
						}
						if(scope.currentEvent.nextStep + scope.currentEvent.selected > 1 
						&& scope.currentEvent.selected != scope.currentEvent.options.choices.length - 1){
							scope.currentEvent.nextStep++;
							if(scope.currentEvent.nextStep >= scope.currentEvent.options.choices.length){
								scope.currentEvent.nextStep = scope.currentEvent.options.choices.length - 1;
							}
							scope.checkCurrentEvent();
						}
						break;
					case InputDetection.UP_ARROW:
						if(scope.currentEvent.selected - 1 >= 0){
							scope.currentEvent.selected--;
							scope.checkCurrentEvent();
						}
						if(scope.currentEvent.nextStep - 1 == scope.currentEvent.selected - 1){
							scope.currentEvent.nextStep--;
							if(scope.currentEvent.nextStep <= 0) scope.currentEvent.nextStep = 0;
							scope.checkCurrentEvent();
						}
						break;
				}
			}
		}
	},
	printDebugInfo: function(el){
		el.innerHTML = "Map X Offset: "+this.map.x
			+" <br />Map Y Offset: "+this.map.y+" <br />Hero MapX: "+this.hero.mapX
			+" <br />Hero MapY: "+this.hero.mapY+" <br />Hero ScreenX: "+this.hero.x
			+" <br />Hero ScreenY: "+this.hero.y;
	},
	switchMap: function(nameOfMap, heroX, heroY){
		var MapClass = eval(nameOfMap);
		this.map = new MapClass(this.width, this.height);
		this.hero.setPositionOnMap(heroX, heroY);
		this.map.scrollToAndCenter(heroX, heroY);
	}
};