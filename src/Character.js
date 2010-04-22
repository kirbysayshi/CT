function Character(){
	
}

Character.prototype = new ComplexSprite();
Character.prototype.constructor = Character;