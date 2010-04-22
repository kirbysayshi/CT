function Crono(){
	// this is not used yet... or ever?
	this.tileSize = 8;
	
	this.animationMetrics = {
		stop_down: [
			{xStart: 126, yStart: 0  , width: 16, height: 35, xHSOffset:  7, yHSOffset: 35, delay: 10}
		],
		stop_left: [
			{xStart: 167, yStart: 1  , width: 14, height: 34, xHSOffset:  7, yHSOffset: 34, delay: 10}
		],
		stop_up: [
			{xStart: 206, yStart: 1  , width: 16, height: 33, xHSOffset:  7, yHSOffset: 33, delay: 10}
		],
		stop_right: [
			{xStart: 247, yStart: 1  , width: 14, height: 34, xHSOffset:  7, yHSOffset: 34, delay: 10}
		],
		walk_down: [
			{xStart: 125, yStart: 600, width: 18, height: 35, xHSOffset:  9, yHSOffset: 35, delay: 2.3},
			{xStart: 126, yStart: 641, width: 16, height: 34, xHSOffset:  8, yHSOffset: 34, delay: 2.3},
			{xStart: 125, yStart: 682, width: 17, height: 32, xHSOffset:  8, yHSOffset: 32, delay: 2.3},
			{xStart: 125, yStart: 720, width: 18, height: 35, xHSOffset:  8, yHSOffset: 35, delay: 2.3},
			{xStart: 126, yStart: 761, width: 16, height: 34, xHSOffset:  7, yHSOffset: 34, delay: 2.3},
			{xStart: 125, yStart: 802, width: 17, height: 32, xHSOffset:  8, yHSOffset: 32, delay: 2.3},
		],                                                                              
		walk_left: [                                                                    
			{xStart: 166, yStart: 601, width: 15, height: 34, xHSOffset:  7, yHSOffset: 34, delay: 2.3},
			{xStart: 163, yStart: 642, width: 21, height: 32, xHSOffset:  9, yHSOffset: 32, delay: 2.3},
			{xStart: 166, yStart: 681, width: 14, height: 33, xHSOffset:  7, yHSOffset: 33, delay: 2.3},
			{xStart: 167, yStart: 721, width: 14, height: 34, xHSOffset:  7, yHSOffset: 34, delay: 2.3},
			{xStart: 163, yStart: 762, width: 22, height: 32, xHSOffset: 10, yHSOffset: 32, delay: 2.3},
			{xStart: 167, yStart: 801, width: 14, height: 33, xHSOffset:  7, yHSOffset: 33, delay: 2.3}
		],
		walk_up: [
			{xStart: 205, yStart: 601, width: 18, height: 33, xHSOffset:  8, yHSOffset: 33, delay: 2.3},
			{xStart: 206, yStart: 640, width: 16, height: 35, xHSOffset:  6, yHSOffset: 36, delay: 2.3},
			{xStart: 205, yStart: 682, width: 18, height: 32, xHSOffset:  8, yHSOffset: 32, delay: 2.3},
			{xStart: 205, yStart: 721, width: 18, height: 33, xHSOffset:  8, yHSOffset: 33, delay: 2.3},
			{xStart: 206, yStart: 760, width: 16, height: 35, xHSOffset:  8, yHSOffset: 36, delay: 2.3},
			{xStart: 205, yStart: 802, width: 18, height: 32, xHSOffset:  8, yHSOffset: 32, delay: 2.3}
		],
		walk_right: [
			{xStart: 246, yStart: 601, width: 15, height: 34, xHSOffset:  8, yHSOffset: 34, delay: 2.3},
			{xStart: 243, yStart: 642, width: 21, height: 32, xHSOffset: 11, yHSOffset: 32, delay: 2.3},
			{xStart: 247, yStart: 681, width: 14, height: 33, xHSOffset:  7, yHSOffset: 33, delay: 2.3},
			{xStart: 247, yStart: 721, width: 14, height: 34, xHSOffset:  7, yHSOffset: 34, delay: 2.3},
			{xStart: 243, yStart: 762, width: 22, height: 32, xHSOffset: 11, yHSOffset: 32, delay: 2.3},
			{xStart: 247, yStart: 801, width: 14, height: 33, xHSOffset:  7, yHSOffset: 33, delay: 2.3}
		],
		
		run_down : [
			{xStart: 125, yStart: 600, width: 18, height: 35, xHSOffset:  9, yHSOffset: 35, delay: 2.3},
			{xStart: 125, yStart: 841, width: 18, height: 35, xHSOffset:  9, yHSOffset: 35, delay: 2.3}, //
			{xStart: 125, yStart: 682, width: 17, height: 32, xHSOffset:  8, yHSOffset: 32, delay: 2.3},
			{xStart: 125, yStart: 720, width: 18, height: 35, xHSOffset:  8, yHSOffset: 35, delay: 2.3},
			{xStart: 125, yStart: 881, width: 18, height: 35, xHSOffset:  7, yHSOffset: 35, delay: 2.3}, //
			{xStart: 125, yStart: 802, width: 17, height: 32, xHSOffset:  8, yHSOffset: 32, delay: 2.3},
		],
		run_left: [                                                                    
			{xStart: 166, yStart: 601, width: 15, height: 34, xHSOffset:  7, yHSOffset: 34, delay: 2.3},
			{xStart: 160, yStart: 882, width: 28, height: 32, xHSOffset: 11, yHSOffset: 32, delay: 2.3}, //
			{xStart: 166, yStart: 681, width: 14, height: 33, xHSOffset:  7, yHSOffset: 33, delay: 2.3},
			{xStart: 167, yStart: 721, width: 14, height: 34, xHSOffset:  7, yHSOffset: 34, delay: 2.3},
			{xStart: 160, yStart: 842, width: 28, height: 32, xHSOffset: 11, yHSOffset: 32, delay: 2.3}, //
			{xStart: 167, yStart: 801, width: 14, height: 33, xHSOffset:  7, yHSOffset: 33, delay: 2.3}
		],
		run_up: [
			{xStart: 205, yStart: 601, width: 18, height: 33, xHSOffset:  8, yHSOffset: 33, delay: 2.3},
			{xStart: 205, yStart: 839, width: 17, height: 38, xHSOffset:  6, yHSOffset: 36, delay: 2.3}, //
			{xStart: 205, yStart: 682, width: 18, height: 32, xHSOffset:  8, yHSOffset: 32, delay: 2.3},
			{xStart: 205, yStart: 721, width: 18, height: 33, xHSOffset:  8, yHSOffset: 33, delay: 2.3},
			{xStart: 205, yStart: 879, width: 17, height: 38, xHSOffset:  9, yHSOffset: 36, delay: 2.3}, //
			{xStart: 205, yStart: 802, width: 18, height: 32, xHSOffset:  8, yHSOffset: 32, delay: 2.3}
		],
		run_right: [
			{xStart: 246, yStart: 601, width: 15, height: 34, xHSOffset:  8, yHSOffset: 34, delay: 2.3},
			{xStart: 240, yStart: 882, width: 28, height: 32, xHSOffset: 17, yHSOffset: 32, delay: 2.3}, //
			{xStart: 247, yStart: 681, width: 14, height: 33, xHSOffset:  7, yHSOffset: 33, delay: 2.3},
			{xStart: 247, yStart: 721, width: 14, height: 34, xHSOffset:  7, yHSOffset: 34, delay: 2.3},
			{xStart: 240, yStart: 842, width: 28, height: 32, xHSOffset: 17, yHSOffset: 32, delay: 2.3}, //
			{xStart: 247, yStart: 801, width: 14, height: 33, xHSOffset:  7, yHSOffset: 33, delay: 2.3}
		],
	};
	
	//this.sheetSrc = "../sprites/Crono-Horizontal.png";
	this.sheetSrc = 'Crono';
	
	this.walkSpeed = 2;
	this.runSpeed = 4;
	
	this.isRunning = false;
	
	// call parent constructor
	ComplexSprite.call(this, this.sheetSrc, this.animationMetrics);
}

Crono.prototype = new ComplexSprite();
Crono.prototype.constructor = Crono;
Crono.prototype.getSpeed = function(){
	if(this.isRunning === true)
		return this.runSpeed;
	else
		return this.walkSpeed;
}