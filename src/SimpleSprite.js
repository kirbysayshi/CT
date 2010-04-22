function SimpleSprite(){
	this.name = "ss_" + Math.floor(Math.random() * 256000000);
	
	this.image = new Image();
	
	// location of the sprite relative to the upper left corner of the canvas/drawing area
	this.x = 0;
	this.y = 0;
	this.z = 0;
	
	// location of the sprite relative to the upper left corner of the map
	this.mapX = 0;
	this.mapY = 0;
	
	this.opacity = 1;
	this.addedObjects = [];
	this.children = [];
}

SimpleSprite.prototype = {
	// ctx: 2d drawing context
	// x,y: the map x/y offset
	draw: function(ctx, x, y){
		ctx.globalAlpha = this.opacity;
		ctx.drawImage(this.image, x, y);
		ctx.globalAlpha = 1;
	},
	drawChildren: function(ctx, mapX, mapY, spriteObject){
		this._processNewChildren();
		for(var i = 0; i < this.children.length; i++){
			this.children[i].draw(ctx, mapX, mapY, spriteObject);
			this.children[i].drawChildren(ctx, mapX, mapY, spriteObject);
		}
	},
	setPositionOnMap: function(x, y){
		this.mapX = x;
		this.mapY = y;
	},
	addChild: function(obj){
		this.addedObjects.push(obj);
	},
	_processNewChildren: function(){
		if( this.addedObjects.length != 0){
			for(var i = 0; i < this.addedObjects.length; i++){
				this.children.push(this.addedObjects[i]);
			}
			this.addedObjects = new Array();
			this._zSort();
		}
	},
	_zSort: function(){
		this.children.sort(function(a,b){return a.z - b.z;});
		return this;
	},
};