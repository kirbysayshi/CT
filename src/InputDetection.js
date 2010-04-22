function InputDetection(window, rpg){
	
	this.delayed = [];
	this.delayed[InputDetection.SPACE] = '300';
	this.timers = [];
	this.rpg = rpg;
	this.listeners = {};
	
	var me = this;
	
	this.pressed = [];
	this.lastkey = 0;
	this.window = window;
	this.window.addEventListener('keydown', function(e){
		me._onKeyDown(e);
		if(e.keyCode == InputDetection.CTRL && me.rpg.ref != null)
			me.rpg.stop();
		else if(e.keyCode == InputDetection.CTRL && me.rpg.ref == null)
			me.rpg.start();
	}, false);
	this.window.addEventListener('keyup', function(e){
		me._onKeyUp(e);
	}, false);
	
}

InputDetection.prototype = {
	_onKeyDown: function(e){
		this.pressed[e.keyCode] = true;
	},
	_onKeyUp: function(e){
		this.pressed[e.keyCode] = undefined;
		this.lastkey = e.keyCode;
		if(this.listeners[e.keyCode] !== undefined){
			this.listeners[e.keyCode](e.keyCode, CURE); // run callback
		}
	},
	isDown: function(key){		
		// key is registered as a delayed key
		if(this.delayed[key] !== undefined && this._isReady(key) == true && this.pressed[key] == true){
			return true;
		} else if(this.delayed[key] === undefined && this.pressed[key] == true) {
			return true; 
		} else {
			return false;
		}
	},
	isUp: function(key){
		return this.pressed[key];
	},
	last: function(){
		return this.lastkey;
	},
	_isReady: function(key){
		// if a timer exists, it's been pushed and is not ready
		if(this.timers[key] === undefined){
			return true;
		} else {
			return false;
		}
	},
	hit: function(key){
		if(this.delayed[key] !== undefined && this.timers[key] === undefined){
			this.timers[key] = new Date().getTime();
		}
	},
	setReady: function(key){
		this.timers.splice(key, 1);
	},
	ellapse: function(){
		var now = new Date().getTime();
		for(var key in this.timers){
			// remove marker from timers if key is ready
			if(now - this.timers[key] >= this.delayed[key]){
				this.timers.splice(key, 1);
				//console.log(this.timers);
				console.log(key + " ready for hit");
			}
		}
	},
	addKeyListener: function(keyConst, callback){
		this.listeners[keyConst] = callback;
	},
	removeKeyListener: function(keyConst){
		this.listeners[keyConst] = undefined;
	}
};

InputDetection.SPACE			=	32 ;
InputDetection.BACKSPACE		=	8  ;
InputDetection.TAB				=	9  ;
InputDetection.ENTER			=	13 ;
InputDetection.SHIFT			=	16 ;
InputDetection.CTRL				=	17 ;
InputDetection.ALT				=	18 ;
InputDetection.PAUSE_BREAK		=	19 ;
InputDetection.CAPS_LOCK		=	20 ;
InputDetection.ESCAPE			=	27 ;
InputDetection.PAGE_UP			=	33 ;
InputDetection.PAGE_DOWN		=	34 ;
InputDetection.END				=	35 ;
InputDetection.HOME				=	36 ;
InputDetection.LEFT_ARROW		=	37 ;
InputDetection.UP_ARROW			=	38 ;
InputDetection.RIGHT_ARROW		=	39 ;
InputDetection.DOWN_ARROW		=	40 ;
InputDetection.INSERT			=	45 ;
InputDetection.DELETE			=	46 ;

InputDetection.ZERO				=	48 ;
InputDetection.ONE				=	49 ;
InputDetection.TWO				=	50 ;
InputDetection.THREE			=	51 ;
InputDetection.FOUR				=	52 ;
InputDetection.FIVE				=	53 ;
InputDetection.SIX				=	54 ;
InputDetection.SEVEN			=	55 ;
InputDetection.EIGHT			=	56 ;
InputDetection.NINE				=	57 ;
         	       
InputDetection.A				=	65 ;
InputDetection.B				=	66 ;
InputDetection.C				=	67 ;
InputDetection.D				=	68 ;
InputDetection.E				=	69 ;
InputDetection.F				=	70 ;
InputDetection.G				=	71 ;
InputDetection.H				=	72 ;
InputDetection.I				=	73 ;
InputDetection.J				=	74 ;
InputDetection.K				=	75 ;
InputDetection.L				=	76 ;
InputDetection.M				=	77 ;
InputDetection.N				=	78 ;
InputDetection.O				=	79 ;
InputDetection.P				=	80 ;
InputDetection.Q				=	81 ;
InputDetection.R				=	82 ;
InputDetection.S				=	83 ;
InputDetection.T				=	84 ;
InputDetection.U				=	85 ;
InputDetection.V				=	86 ;
InputDetection.W				=	87 ;
InputDetection.X				=	88 ;
InputDetection.Y				=	89 ;
InputDetection.Z				=	90 ;

InputDetection.LEFT_WINDOWS		=	91 ;
InputDetection.RIGHT_WINDOWS	=	92 ;

InputDetection.NUMPAD0			=	96 ;
InputDetection.NUMPAD1			=	97 ;
InputDetection.NUMPAD2			=	98 ;
InputDetection.NUMPAD3			=	99 ;
InputDetection.NUMPAD4			=	100;
InputDetection.NUMPAD5			=	101;
InputDetection.NUMPAD6			=	102;
InputDetection.NUMPAD7			=	103;
InputDetection.NUMPAD8			=	104;
InputDetection.NUMPAD9			=	105;

InputDetection.MULTIPLY			=	106;
InputDetection.ADD				=	107;
InputDetection.SUBTRACT			=	109;
InputDetection.DECIMAL_POINT	=	110;
InputDetection.DIVIDE			=	111;

InputDetection.F1				=	112;
InputDetection.F2				=	113;
InputDetection.F3				=	114;
InputDetection.F4				=	115;
InputDetection.F5				=	116;
InputDetection.F6				=	117;
InputDetection.F7				=	118;
InputDetection.F8				=	119;
InputDetection.F9				=	120;
InputDetection.F10				=	121;
InputDetection.F11				=	122;
InputDetection.F12				=	123;
InputDetection.NUM_LOCK			=	144;
InputDetection.SCROLL_LOCK		=	145;
InputDetection.SEMICOLON		=	186;
InputDetection.EQUAL_SIGN		=	187;
InputDetection.COMMA			=	188;
InputDetection.DASH				=	189;
InputDetection.PERIOD			=	190;
InputDetection.FORWARD_SLASH	=	191;
InputDetection.GRAVE_ACCENT		=	192;
InputDetection.OPEN_BRACKET		=	219;
InputDetection.BACK_SLASH		=	220;
InputDetection.CLOSE_BRAKET		=	221;
InputDetection.SINGLE_QUOTE		=	222;