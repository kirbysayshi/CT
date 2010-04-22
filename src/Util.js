function Util(){
	
}

Util.distance = function(sx, sy, ex, ey){
	return Math.sqrt((sx - ex) * (sx - ex) + (sy - ey) * (sy - ey));
};

Util.slope = function(start, end){
	if(start.x != end.x){
		return (end.y - start.y) / (end.x - start.x);
	} else
		return false;
};

Util.magnitude = function(slope){
	return Math.pow( ((1*1) + (slope * slope)), 0.5);
};

Util.normalize = function(slope, magnitude){
	return {x: 1 / magnitude, y: slope / magnitude};
};

Util.addVector = function(u, v){
	
};

Util.multiplyVector = function(u, v){
	
};

Util.multiplyVectorScalar = function(v, s){
	return {x: v.x*s, y: v.y*s};
};

Util.addPointToVector = function(v, p){
	return { x: v.x + p.x, y: v.y + p.y };
};