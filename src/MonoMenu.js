function MonoMenu(vWidth, vHeight){
	this.mt = new MonoText('ct_en_mono', 8, 9, 0);
	this.vWidth = vWidth;
	this.vHeight = vHeight;
	
	this.choices = [
		"Yes", "No"
	];
	
	this.children = [];
}

MonoMenu.prototype = {
	showMenu: function(something){
		var a = this.children[0] || this.createMenuCanvas(0, 0, this.vWidth * 2, this.vHeight * 2);
		this.printTextAt(a.getContext('2d'), 5, 5, 100, 20, "This is text!!!! WE continue on the trek to infinite sanity. " + something);
	},
	printTextAt: function(ctx, x, y, width, height, text){
		this.mt.print(ctx, text, x, y, width, height);
	},
	clearAt: function(x, y, width, height){
		
	},
	setBackground: function(resource){
		
	},
	createMenuCanvas: function(x, y, width, height){
		var c = document.createElement('canvas');
		c.width = width;
		c.height = height;
		c.x = x;
		x.y = y;
		c.style.border = "1px solid black";
		c.style.position = "absolute";
		c.style.left = "0px";
		c.style.top = "0px";
		//c.getContext('2d').scale(2, 2);
		document.getElementById('controlWrap').appendChild(c);
		this.children.push(c);
		return c;
	}
	
};

