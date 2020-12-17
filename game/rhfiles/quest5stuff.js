"use strict"

// Adding old school Quest 5 stuff.

function getObject(name){
	return w[name]
}

function moveHere(item){
	item.moveToFrom(game.player.loc,item.loc)
}

function moveTo(item, loc){
	item.moveToFrom(loc.name, item.loc)
}

//Returns a list of objects comprised of all world (w) objects.
//Code by mrangel
function allObjects(){
  return Object.keys(w).filter(x => (x !== "game" && typeof(w[x]["eventScript"])!=='function')).map(x => w[x]);
};

