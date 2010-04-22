/* Anything that needs complex user interaction, or multiple animations */

function ComplexSprite(imgName, animationMetrics){
	if(arguments.length > 0){
		SimpleSprite.call(this);
	
		this.sequences = {};
		this.active = "walk_down";
		this.lastFrame = 0;
		this.delayCounter = 0;
	
		this.tileSheet = CURE.as.getAsset(imgName);
	
		for(var i in animationMetrics){
			this.sequences[i] = animationMetrics[i];
		}
	}
}

ComplexSprite.prototype = new SimpleSprite();
ComplexSprite.prototype.constructor = ComplexSprite;

	// this doesn't do anything yet
ComplexSprite.prototype.setSequence = function(sequenceName){
	if( this.sequences[sequenceName] !== undefined ){
		this.active = sequenceName;
	}
};
// ctx: 2d context
// mapX/Y: the xy of the map, relative to the canvas
// spriteObject: this, basically
ComplexSprite.prototype.draw = function(ctx, mapX, mapY, spriteObject){
	if( spriteObject.animationMetrics[this.active] !== undefined ){
		
		this.x = this.mapX - mapX;
		this.y = this.mapY - mapY;
		
		if(this.lastFrame >= spriteObject.animationMetrics[this.active].length){
			this.lastFrame = 0;
		}
		
		ctx.globalAlpha = this.opacity;
		
		ctx.drawImage(spriteObject.tileSheet, 
			spriteObject.animationMetrics[this.active][this.lastFrame]['xStart'], 
			spriteObject.animationMetrics[this.active][this.lastFrame]['yStart'], 
			spriteObject.animationMetrics[this.active][this.lastFrame]['width'], 
			spriteObject.animationMetrics[this.active][this.lastFrame]['height'], 
				this.x - spriteObject.animationMetrics[this.active][this.lastFrame]['xHSOffset'], 
				this.y - spriteObject.animationMetrics[this.active][this.lastFrame]['yHSOffset'],
			spriteObject.animationMetrics[this.active][this.lastFrame]['width'], 
			spriteObject.animationMetrics[this.active][this.lastFrame]['height']);
		
		ctx.globalAlpha = 1;
		
		/*ctx.fillStyle = "rgb(200,0,0)";
		ctx.fillRect (this.x, this.y, 2, 2);*/

		/*ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
		ctx.fillRect (30, 30, 55, 50);*/
		
		if(this.delayCounter > spriteObject.animationMetrics[this.active][this.lastFrame]['delay']){
			this.lastFrame++;
			this.delayCounter = 0;
		} else
			this.delayCounter++;
			
		
	}
};
ComplexSprite.prototype.moveRight = function(inc){
	this.mapX += inc;
};
ComplexSprite.prototype.moveLeft = function(inc){
	this.mapX -= inc;
};
ComplexSprite.prototype.moveUp = function(inc){
	this.mapY -= inc;
};
ComplexSprite.prototype.moveDown = function(inc){
	this.mapY += inc;
};
