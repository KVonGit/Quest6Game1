"use strict"

createRoom("nowhere", {
	desc:"You definitely shouldn't be in here.  You need to {cmd:UNDO}",
})

createRoom ("cave_one", {
	alias: "cave",
	desc: "A dark cave.",
	darkDesc:"You can't see anything in here.",
	lightSource:function() {
		return w.switch_for_cave.switchedon ? world.LIGHT_FULL : world.LIGHT_NONE;
	},
	up: new Exit("cellar", {
		isHidden:function() { 
			return false; 
		}
	}),
	down: new Exit("cave_one"),
	north: new Exit("cave_one"),
	south: new Exit("cave_one"),
	east: new Exit("cave_one"),
	west: new Exit("cave_one"),
	afterEnter:function(){
		if (w.TV.switchedon && game.player.previousLoc==="cellar"){
			if (!settings.noConnection){
				ytPlayer.setVolume('10');
			}
			msg("You can hear muffled sounds from the TV.");
		}
	},
})

createItem ("switch_for_cave", SWITCHABLE(false), {
	alias: "light switch",
	loc: "cellar",
	timesSwitchedOn: 0,
	examine: () => {
		w.switch_for_cave.timesExamined++
		msg("A light switch, currently switched {if:switch_for_cave:switchedon:on:off}.")
	},
	timesExamined: 0,
	onSwitchOn: () => {
		w.switch_for_cave.timesSwitchedOn++
		if (w.switch_for_cave.timesSwitchedOn === 2){
			var el = $(".switchon")
			$(el[el.length-1]).html($(el[el.length-1]).html().replace('.', ', again.'))
			msg ("It doesn't seem to do anything.")
		}
	}
})

function fakeFunct(...args){
	var [ a="a", b="b", c="c", d="d", e="e" , ...rest ] = args
	log(`a: ${a}`)
	log(`b: ${b}`)
	log(`c: ${c}`)
	log(`d: ${d}`)
	log(`e: ${e}`)
	log("...rest:")
	log(rest)
}

createItem("takeme", TAKEABLE(), {
	loc:"nowhere"
})

createItem("switchme", SWITCHABLE(false), {
	loc:"nowhere"
})

createItem("takemeswitchme", TAKEABLE(), SWITCHABLE(true), {
	loc: "nowhere"
})

createItem("fillme", CONTAINER(false),{
	loc:"nowhere"
})

createItem("openme", OPENABLE(false), {
	loc:"nowhere"
})

createItem("openmefillme", CONTAINER(true), {
	loc: "nowhere"
})

createItem("takemeopenme", TAKEABLE(), OPENABLE(false), {
	loc: "nowhere"
})

createItem("takemeopenmefillme", TAKEABLE(),CONTAINER(true), {
	loc: "nowhere"
})
