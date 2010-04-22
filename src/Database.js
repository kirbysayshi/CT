/* this should be used as a catch-all db for mostly temporary
 information, like event flags? */
function Database(){
	this._localToMap = {};
	this._global = {};
}

Database.prototype = {
	getMapFlag: function(key){
		if(this._localToMap[key] !== undefined){
			return this._localToMap[key];
		} else {
			return false;
		}
	},
	setMapFlag: function(key, value){
		this._localToMap[key] = value;
	},
	setGlobalFlag: function(key, value){
		this._global.key = value;
	},
	getGlobalFlag: function(key){
		if(this._global[key] !== undefined){
			return this_global[key];
		} else {
			return false;
		}
	}
};