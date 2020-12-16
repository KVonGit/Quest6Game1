"use strict"

//MOD for object links
DEFAULT_ROOM.description = function() {
    if (game.dark) {
      printOrRun(game.player, this, "darkDesc");
      return true;
    }
    if(settings.linksEnabled){
		disableExistingObjectLinks()
	}
    for (let line of settings.roomTemplate) {
      msg(line);
    }
    return true;
}
  
  
createRoom("cellar", {
  desc:"The cellar is small, dimly lit, and dingy.{once:  It sure is nice of XanMag to let you and Ralph stay here, though!}",
  up:new Exit("stairway"),
  afterEnter:function(){
	if (w.TV.switchedon){
		//msg("Ralph turns the TV off on the way out.");
		//w.TV.doSwitchoff();
		if(settings.noConnection) return
		showYouTube();
		ytPlayer.setVolume('100');
	} 
  },
  onExit:function(){
	if (w.TV.switchedon){
		//msg("Ralph turns the TV off on the way out.");
		//w.TV.doSwitchoff();
		msg("You can still hear the TV, but just barely.");
		if (!settings.noConnection) {
			hideYouTube();
			ytPlayer.setVolume('10');
			//TODO Make sure the video is playing and the volume is not 0 before printing this!
		}
		
	} 
  },
});

createRoom("stairway", {
	desc:"A narrow stair.",
	down:new Exit("cellar"),
	up:new Exit("Kitchen"),
	afterEnter:function(){
		if (w.TV.switchedon && game.player.previousLoc==="Kitchen"){
			if (!settings.noConnection){
				ytPlayer.setVolume('10');
			}
			msg("You can hear muffled sounds from the TV.");
		} 
	},
	onExit:function(){
		if (w.TV.switchedon && game.player.previousLoc === "cellar"){
			//msg("Ralph turns the TV off on the way out.");
			//w.TV.doSwitchoff();
			if (!settings.noConnection){
				ytPlayer.setVolume('0')
			}
		} 
	},
});


createRoom("Kitchen", {
	desc: "A small kitchen.",
	down: new Exit("stairway"),
	east: new Exit("living_room"),
	/*afterFirstEnter:function() {
		msg("It smells BAD in here!");
	},*/
});

createRoom("living_room", {
	desc: "A tiny living room.",
	west: new Exit("Kitchen"),
});




createRoom("inside_the_refrigerator", {
	desc: "A small fridge, at least it's a side-by-side.",
	out: new Exit("Kitchen")
})


// EXAMPLE
//createRoom ("cloneRoom",{desc:"YOU SHOULD NOT BE HERE, ADVENTURER!  YOU BETTER {cmd:UNDO}!!!"})

//createItem("grocery_sack", CONTAINER(false), {
	//loc:"cloneRoom",
	//examine: function() {
		//msg("A paper grocery sack. ")
		//let stuff = this.listContents()
		//msg("The sack currently contains: ")
		//msg(stuff)
	//}
//})
//createItem("apple", {loc:"grocery_sack"})
//createItem("orange", {loc:"grocery_sack"})
