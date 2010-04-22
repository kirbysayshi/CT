function AssetLoader(onCompleteCallback){
	
	this._db = {
		images: [],
		callbacks: {}
	};
	this.nLoaded = 0;
	this.nTotal = 0;
	this.callback = onCompleteCallback;
}

AssetLoader.prototype.queue = function(type, options){
	if(type == 'image'){
		this.nTotal++;
		if(options.src !== undefined){
			var i = new Image();
			var me = this;
			i.onload = function(e){ 
				me.onLoad(e, me) 
			};
			i.onerror = function(e){
				me.onError(e, me);
			}
			//i.onabort =  me.onAbort();
			i.src = options.src;
			
			if(options.name === undefined)
				this._db.images['img_'+Math.random()] = i;
			else
				this._db.images[options.name] = i;
		}
		if(options.callback !== undefined){
			this._db.callbacks[i] = callback;
		}
	}
};

AssetLoader.prototype.onLoad = function(e, me){
	this.nLoaded++;
	if(this._db.callbacks[me] !== undefined){
		this._db.callbacks[me](); // this is completely untested
	}
	if(this.nLoaded == this.nTotal){
		this.onComplete();
	}
}

AssetLoader.prototype.onError = function(e, me){
	console.log("ERROR: ", e);
}

AssetLoader.prototype.onComplete = function(){
	this.callback();
	console.log("all assets loaded");
	console.log(this);
}

AssetLoader.prototype.getStatus = function(){
	if(this._db.images.length > 0)
		return { percent: this.nLoaded / this.nTotal, count: this.nLoaded +"/"+ this.nTotal };
	else
		return { percent: '0', count: '0/0'};
}

AssetLoader.prototype.getAsset = function(name){
	if( this._db.images[name] !== undefined ){
		return this._db.images[name];
	}
}