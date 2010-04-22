function LightPillar(){
	this.animationMetrics = {
		stop_down: [
			//{xStart:   0, yStart: 0 , width: 16, height: 32, xHSOffset:  8, yHSOffset: 25, delay: 15},
			{xStart:  16, yStart: 0 , width: 16, height: 32, xHSOffset:  8, yHSOffset: 25, delay: 2},
			{xStart:  32, yStart: 0 , width: 16, height: 32, xHSOffset:  8, yHSOffset: 25, delay: 2},
			{xStart:  48, yStart: 0 , width: 16, height: 32, xHSOffset:  8, yHSOffset: 25, delay: 2},
			{xStart:  64, yStart: 0 , width: 16, height: 32, xHSOffset:  8, yHSOffset: 25, delay: 2},
			{xStart:  80, yStart: 0 , width: 16, height: 32, xHSOffset:  8, yHSOffset: 25, delay: 2},
			{xStart:  96, yStart: 0 , width: 16, height: 32, xHSOffset:  8, yHSOffset: 25, delay: 2},
			{xStart: 112, yStart: 0 , width: 16, height: 32, xHSOffset:  8, yHSOffset: 25, delay: 2},
			{xStart: 128, yStart: 0 , width: 16, height: 32, xHSOffset:  8, yHSOffset: 25, delay: 2},
			{xStart: 144, yStart: 0 , width: 16, height: 32, xHSOffset:  8, yHSOffset: 25, delay: 2},
			{xStart: 160, yStart: 0 , width: 16, height: 32, xHSOffset:  8, yHSOffset: 25, delay: 2},
			{xStart: 176, yStart: 0 , width: 16, height: 32, xHSOffset:  8, yHSOffset: 25, delay: 2},
		]
	}
	this.sheetSrc = 'LightPillar';
	// call parent constructor
	ComplexSprite.call(this, this.sheetSrc, this.animationMetrics);
	this.opacity = 0.5;
}

LightPillar.prototype = new ComplexSprite();
LightPillar.prototype.constructor = LightPillar;