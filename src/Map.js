function Map(name, assetName, vwidth, vheight, bgColor){

	if(arguments.length == 0)
		return false;

	this.mapname = name;
	this.assetName = assetName;
	this.lower_visual = CURE.as.getAsset(assetName + "_lower");
	this.upper_visual = CURE.as.getAsset(assetName + "_upper");
	
	this.backgroundColor = bgColor;

	this.vHeight = vheight;
	this.vWidth = vwidth;
	
	if(this.vWidth > this.lower_visual.width) this.vWidth = this.lower_visual.width;
	if(this.vHeight > this.lower_visual.height) this.vHeight = this.lower_visual.height;
	
	this.x = 0;
	this.y = 0;
	
	this.events,
	//this.eventsToReload = [],
	this.walkable, // says what's walkable and not (not visual)
	//this.eventMap, // things you can interact with (NPCs?)
	this.groundMap, // the bottom visual layer
	this.overlays; // any number of visual layers that should be stacked
}

Map.prototype = {
	drawBackground: function(ctx){
		if(this.backgroundColor != ''){
			ctx.fillStyle = "rgb(13,13,13)";
			ctx.fillRect (0, 0, this.vWidth, this.vHeight);
		}
	},
	drawUnderlays: function(ctx){
		ctx.drawImage(this.lower_visual, this.x, this.y, this.vWidth, this.vHeight, 0, 0, this.vWidth, this.vHeight);
	},
	drawOverlays: function(ctx){
		ctx.drawImage(this.upper_visual, this.x, this.y, this.vWidth, this.vHeight, 0, 0, this.vWidth, this.vHeight);
	},
	scrollRight: function(inc){
		this.x += inc;
		if(this.x > this.lower_visual.width - this.vWidth) this.x = this.lower_visual.width - this.vWidth;
	},
	scrollLeft: function(inc){
		this.x -= inc;
		if(this.x < 0) this.x = 0;
	},
	scrollUp: function(inc){
		this.y -= inc;
		if(this.y < 0) this.y = 0;
	},
	scrollDown: function(inc){
		this.y += inc;
		if(this.y > this.lower_visual.height - this.vHeight) this.y = this.lower_visual.height - this.vHeight;
	},
	// scrolls to a point on the map, but attempts to place the point in the center of the canvas
	scrollToAndCenter: function(x, y){
		this.x = x - (0.5 * this.vWidth);
		this.y = y - (0.5 * this.vHeight);
		
		if(this.x < 0) this.x = 0;
		if(this.x > this.lower_visual.width - this.vWidth) this.x = this.lower_visual.width - this.vWidth;
		
		if(this.y < 0) this.y = 0;
		if(this.y > this.lower_visual.height - this.vHeight) this.y = this.lower_visual.height - this.vHeight;
	},
	getNearestPolyEdge: function(poly, pt){
		var i = 0;
		var len = poly.length;
		var min = 99999999;
		var tempLength = 0;
		var polypt = 0;
		
		for(i = 0; i < len-1; i++){
			tempLength = this.dotLineLength(pt.x, pt.y, poly[i].x, poly[i].y, poly[i+1].x, poly[i+1].y, true);
			if(tempLength < min) { 
				min = tempLength;
				polypt = i;
			}
		}
		return {start: polypt, end: polypt+1};
	},
	getSlopeOfPolyEdge: function(poly1, poly2){
		//return Util.slope(poly1.x, poly1.y, poly2);
	},
	//+ Jonas Raoni Soares Silva
	//@ http://jsfromhell.com/math/is-point-in-poly [rev. #0]
	// poly is an array of point objects: [{x: ##, y: ##}, {} ...]
	// pt is the point object
	isPointInPoly: function (poly, pt){
	    for(var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
	        ((poly[i].y <= pt.y && pt.y < poly[j].y) || (poly[j].y <= pt.y && pt.y < poly[i].y))
	        && (pt.x < (poly[j].x - poly[i].x) * (pt.y - poly[i].y) / (poly[j].y - poly[i].y) + poly[i].x)
	        && (c = !c);
	    return c;
	},
	//+ Jonas Raoni Soares Silva
	//@ http://jsfromhell.com/math/dot-line-intersection [rev. #1]
	dotLineIntersection: function(x, y, x0, y0, x1, y1){
	    if(!(x1 - x0))
	        return {x: x0, y: y};
	    else if(!(y1 - y0))
	        return {x: x, y: y0};
	    var left, tg = -1 / ((y1 - y0) / (x1 - x0));
	    return {x: left = (x1 * (x * tg - y + y0) + x0 * (x * - tg + y - y1)) / (tg * (x1 - x0) + y0 - y1), y: tg * left - tg * x + y};
	},
	//+ Jonas Raoni Soares Silva
	//@ http://jsfromhell.com/math/dot-line-length [rev. #1]
	dotLineLength: function(x, y, x0, y0, x1, y1, o){
	    function lineLength(x, y, x0, y0){
	        return Math.sqrt((x -= x0) * x + (y -= y0) * y);
	    }
	    if(o && !(o = function(x, y, x0, y0, x1, y1){
	        if(!(x1 - x0)) return {x: x0, y: y};
	        else if(!(y1 - y0)) return {x: x, y: y0};
	        var left, tg = -1 / ((y1 - y0) / (x1 - x0));
	        return {x: left = (x1 * (x * tg - y + y0) + x0 * (x * - tg + y - y1)) / (tg * (x1 - x0) + y0 - y1), y: tg * left - tg * x + y};
	    }(x, y, x0, y0, x1, y1), o.x >= Math.min(x0, x1) && o.x <= Math.max(x0, x1) && o.y >= Math.min(y0, y1) && o.y <= Math.max(y0, y1))){
	        var l1 = lineLength(x, y, x0, y0), l2 = lineLength(x, y, x1, y1);
	        return l1 > l2 ? l2 : l1;
	    }
	    else {
	        var a = y0 - y1, b = x1 - x0, c = x0 * y1 - y0 * x1;
	        return Math.abs(a * x + b * y + c) / Math.sqrt(a * a + b * b);
	    }
	}
};