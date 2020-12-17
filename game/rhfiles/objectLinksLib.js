"use strict"


//====================
// OBJECT LINKS LIB  |
//====================
// by KV             |
//====================
// for QuestJS v 0.3 |
//====================
// Version 2         |
//====================

/*
 * IMPORTANT!!!
 * ------------
 * 
 * Make sure you have this loading before any files which create rooms or items! 
 * 
 *  */


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
  
//============================================================================


//Capture clicks for the objects links
settings.clickEvents = [{one0:`<span>_PLACEHOLDER_</span>`}]
window.onclick = function(event) {
	if (!event.target.matches('.droplink')) {
		$(".dropdown-content").hide();
	}else{
		settings.clickEvents.unshift(event.target)
		if (typeof(settings.clickEvents[1].nextSibling)!=='undefined' &&  settings.clickEvents[1].nextSibling!==null){
			if (settings.clickEvents[1] !== event.target && settings.clickEvents[1].nextSibling.style.display==="inline" && event.target.matches('.droplink')){
				$(".dropdown-content").hide();
				event.target.nextSibling.style.display="inline"
			}
		}
	}
}


//===================================

// SETTINGS

settings.roomTemplate = [
  "{hereDesc}",
  "{objectsHere:You can see {objectsHereLinks} here.}",
  "{exitsHere:You can go {exits}.}",
]

// MODDED for item links
util.listContents = function(situation, modified = true) {
  let objArr = this.getContents(situation)
  if (settings.linksEnabled) {
	  objArr = objArr.map(o => getObjectLink(o,true))
	  debuglog(objArr)
  }
  return formatList(objArr, {article:INDEFINITE, lastJoiner:lang.list_and, modified:modified, nothing:lang.list_nothing, loc:this.name})
}


// Make it easy to find a command's opposite
settings.cmdOpps = {
	"Switch on":"Switch off",
	"Switch off":"Switch on",
	"Take":"Drop",
	"Drop":"Take",
	"Wear":"Remove",
	"Remove":"Wear",
	"Open":"Close",
	"Close":"Open",
}

// END OF SETTINGS


// TURNSCRIPT

createItem("updateDropdownVerblists_Turnscript",{
	eventPeriod:1,
	eventActive:true,
	eventScript:()=>{
		if(settings.linksEnabled){
			if(settings.debugItemLinks) {
				debuglog("running turnscript to update verbs . . .")
			}
			updateDropdownVerblists()
		}else{
			w.updateDropdownVerblists_Turnscript.eventActive = false
		}
	},
})



//===========================
// TEXT PROCESSOR ADDITIONS |
//===========================

tp.text_processors.objectsHereLinks = function(arr, params) {
  // Create listOfOjects array comprised of all objects listed here, with links for the objects.
  let listOfOjects = getObjectsLinks(scopeHereListed(),true)
  return listOfOjects.length === 0 ? "" : formatList(listOfOjects, {article:INDEFINITE, lastJoiner:lang.list_and, modified:true, nothing:lang.list_nothing, loc:game.player.loc});
};

tp.text_processors.objectsLinks = function(arr, params, bool) {
  let objArr = getObjectsLinks(arr, bool, false)
  return formatList(objArr, {article:INDEFINITE, lastJoiner:lang.list_and, modified:true, nothing:lang.list_nothing, loc:game.player.loc});
}

tp.text_processors.objectLink = function(obj, params) {
	return getObjectLink(w[obj[0]],false,false)
}



//=================================
// END OF TEXT PROCESSOR ADDITIONS |
//==================================

//MOD -- Moved this to settings.js so it loads before creating items!
//util.listContents = function(situation, modified = true) {
  //let objArr = this.getContents(situation).map(o => getObjectLink(o,true))
  //log(objArr)
  //return formatList(objArr, {article:INDEFINITE, lastJoiner:lang.list_and, modified:modified, nothing:lang.list_nothing, loc:this.name})
//}


// FUNCTIONS
// ---------

function capFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}


function getDisplayAlias(obj,art=INDEFINITE){
	return lang.getName(obj,{article:art})
}


// NOTE: getAlias is not used by any function in this library.
function getAlias(obj){
	return obj.alias || obj.name
};

function enterButtonPress(cmd){
	//Calling this function with no arg will cause s to default to the text in the textbox.
	if(cmd) $('#textbox').val(cmd)
	const s = $('#textbox').val();
    io.msgInputText(s); //This emulates printing the echo of the player's command
    if (s) {
		if (io.savedCommands[io.savedCommands.length - 1] !== s) {
			io.savedCommands.push(s);
        }
        io.savedCommandsPos = io.savedCommands.length;
        parser.parse(s);
        $('#textbox').val('');
	}
};

function clickedCmdLink(s){
	if (s) {
		if (io.savedCommands[io.savedCommands.length - 1] !== s) {
		  io.savedCommands.push(s);
		}
		io.savedCommandsPos = io.savedCommands.length;
	}
}

function getObjectsLinks(arr, turn, art){
  let objs = arr // Create array of objects here.
  let objArr = [] // Blank array to push to later in the function
  let oLink // Blank variable for the object link (used later in the function)
  if (objs.length > 0) { // If there are objects in this array . . .
	  //debuglog(objs)
	  objs.forEach(o => {
		oLink = getObjectLink(o, turn, art) // Set the object link
		if ((o.listContents && !o.closed && o.listContents().length>0) || (!o.listContents && o.npc && o.getContents.length>0)) {  // If open container or npc . . .
			let contents = "" // Create blank string variable
			if (o.container){ // If this is a container . . .
				contents  = o.listContents()  // Get a list of the contents. (I modified util.listContents in mods.js to put out object links)
				if (contents != ""){ // If there are actually contents . . .
					oLink = oLink + " (containing: " + contents + ")" // Add the contents to the item link.
				}
			}
			if (o.npc) { // If this is an npc . . .
				contents =  o.getHolding().map(x => getObjectLink(x, turn, art)) // Set the list of contents, with item links.
				if (contents != ""){ // If there are actually contents . . .
					oLink = oLink + " (carrying: " + contents + ")" // Add the contents to the item link.
				}
			}
		}
		objArr.push(oLink)  // Add the object (with link) to the list!
	  })
  }
  return objArr
}
function getObjectLink(obj,isScopeHere=false,addArticle=true){
	//if isScopeHere is sent true, this is for a room description!
	if(settings.linksEnabled){
		var roomClass = isScopeHere ? "room-desc" : ""
		var oName = obj.name
		var id = obj.alias || obj.name;
		var prefix = "";
		if (obj.prefix){
			prefix = obj.prefix+" ";
		}
		var dispAlias = getDisplayAlias(obj)
		if (addArticle) {prefix = dispAlias.replace(obj.alias,'')}
		disableObjectLink($(`[obj="${oName}"]`))
		var s = prefix+`<span class="object-link dropdown ${roomClass}">`;
		s +=`<span onclick="toggleDropdown($(this).attr('obj'))" obj="${oName}" class="droplink ${roomClass}" name="${oName}-link">${id}</span>`;
		s += `<span id="${oName}" class="dropdown-content ${roomClass}">`;
		let verbArr = obj.getVerbs()
		if (verbArr.length>0){
			verbArr.forEach (o=>{
				o = capFirst(o)
				s += `<span style="white-space:nowrap" class="${roomClass}" onclick="$(this).parent().toggle();handleObjLnkClick('${o} '+$(this).attr('obj-alias'),this,'${o}','${id}');" link-verb="${o}" obj-alias="${id}" obj="${oName}">${o}</span>`;
			})
		}
		s += "</span></span>";
		return s;
	}else{
		var s = obj.alias || obj.name;
		return s
	}
};

function toggleDropdown(element) {
    $("#"+element+"").toggle();
}
 
function handleObjLnkClick(cmd,el,verb,objAlias){
	if(settings.debugItemLinks) {
		debuginfo("handleObjLnkClick:  Handling object link click . . .")
		debuginfo("cmd: "+cmd)
		debuginfo("verb: "+verb)
		debuginfo("objAlias: "+objAlias)
		debuginfo("Sending to enterButtonPress . . .")
	}
	enterButtonPress(cmd)
}

function updateDropdownVerblists(){
	//settings.debugItemLinks = true
	let verbEls = $("[link-verb]")
	Object.keys(verbEls).forEach(i => {
		let el = verbEls[i]
		if(settings.debugItemLinks) {
			debuglog("verbEls"); 
			debuglog(typeof(verbEls));
			debuglog(verbEls);
			debuglog("verbEls[i]");
			debuglog(verbEls[i])
			debuglog("el");
			debuglog(typeof(el));
			debuglog(el);
			debuglog(el[0]);
			debuglog(typeof(el[0]));
		}
		let verb = $(el).attr("link-verb")
		if(!verb) return
		if(settings.debugItemLinks) { debuglog("verb:"); debuglog(verb); }
		let verbOpp = settings.cmdOpps[verb] || null
		if(!verbOpp) {
			if(settings.debugItemLinks) {console.log("NO opposite for " + verb)}
			return
		}
		if(settings.debugItemLinks) {console.log("i:");console.log(i);console.log("el:");console.log(el);console.log("verb:");console.log(verb);console.log("verbOpp");console.log(verbOpp);}
		let objName = $(el).attr("obj")
		if(settings.debugItemLinks) {console.log("objName:");console.log(objName);console.log("obj:");}
		let obj = w[objName]
		if(settings.debugItemLinks) {console.log(obj);var hr = "=======================================";console.log(hr);console.log("Do the verbs match the getVerbs? . . .");console.log(hr);}
		if(!obj.getVerbs) return
		var objGetVerbs = obj.getVerbs()
	if(settings.debugItemLinks) {console.log("objGetVerbs:");console.log(objGetVerbs);}
		objGetVerbs.forEach(newVerb => {
			if(settings.debugItemLinks) {console.log("Checking getVerbs() for " + objName + " . . .");console.log(newVerb);}
			if (verbOpp != newVerb) return
			if(settings.debugItemLinks) {console.log("Found one!");console.log(objName + " needs " + verb  + " changed to " + newVerb + "!");}
			if(!el.parentElement){
				if(settings.debugItemLinks){ console.log("No element parent element.  QUITTING!");} 
				return
			}
			//Change the verb to its opposite!
			switchDropdownVerb(el,newVerb,objName)
			if(settings.debugItemLinks) {console.log("DONE!")}
			return true
			
		})
	})
}

function switchDropdownVerb(el, newVerb, objName){
	if (!objName) {let objName = $(el).attr("obj")}
	let oldVerb = $(el).attr("link-verb")
	if (!newVerb) {let newVerb = settings.cmdOpps[oldVerb]}
	let str = el.parentElement.innerHTML
	let regexp = new RegExp(oldVerb,'g')
	let repl = str.replace(regexp,newVerb);
	el.parentElement.innerHTML = repl
	$(el).attr("link-verb",newVerb)
	parser.msg(`Replaced '${oldVerb}' on ${objName} with '${newVerb}'.`)
}

function disableExistingObjectLinks(bool=false){
	//if bool is false, this only disables existing object links printed using the room description function
	//if bool is true, this disables ALL existing object links
	//parser.msg("running disableExistingObjectLinks!")
	//Checks that this doesn't remove "good" links.
	if (bool){
		$(".droplink").removeClass("droplink").css("cursor","default").attr("name","dead-droplink")
		$(".object-link").removeClass("dropdown")
		$(".dropdown").removeClass("dropdown")
		$(".dropdown-content").remove()
	} else {
		$(".room-desc.droplink").removeClass("droplink").css("cursor","default").attr("name","dead-droplink")
		$(".room-desc.object-link").removeClass("dropdown")
		$(".room-desc.dropdown").removeClass("dropdown")
		$(".room-desc.dropdown-content").remove()
	}
}

function disableObjectLink(el){
	let objName = $(el).attr("obj")
	$(el).removeClass("droplink").css("cursor","default").attr("name","dead-droplink")
	$(el).removeClass("dropdown")
	$(el).removeClass("dropdown")
	$(`#${objName}`).remove()
}

// MOD!!!
findCmd('Inv').script = function() {
  let listOfOjects = game.player.getContents(world.INVENTORY);
  if (settings.linksEnabled) {
	  listOfOjects = listOfOjects.map(o => getObjectLink(o,true))
  }
  msg(lang.inventoryPreamble + " " + formatList(listOfOjects, {article:INDEFINITE, lastJoiner:lang.list_and, modified:true, nothing:lang.list_nothing, loc:game.player.name}) + ".");
  return settings.lookCountsAsTurn ? world.SUCCESS : world.SUCCESS_NO_TURNSCRIPTS;
}
// MOD!!!
  // the NPC has already been moved, so npc.loc is the destination
  lang.npcEnteringMsg = function(npc, origin) {
    let s = "";
    let flag = false;

	let npcLink = getObjectLink(npc,true)

    if (w[game.player.loc].canViewLocs && w[game.player.loc].canViewLocs.includes(npc.loc)) {
      // Can the player see the location the NPC enters, from another location?
      s = w[game.player.loc].canViewPrefix;
      flag = true;
    }
    if (flag || npc.inSight()) {
		
      s += lang.nounVerb(npc, "enter", !flag).replace(npc.alias,npcLink) + " " + lang.getName(w[npc.loc], {article:DEFINITE});
      const exit = w[npc.loc].findExit(origin);
      if (exit) s += " from " + util.niceDirection(exit.dir);
      s += ".";
      msg(s);
    }
  }


// Add some CSS settings.
$("head").append(`<style>
.droplink{
	color:blue;
}
.droplink:not(.disabled) {
    /*background-color: #3498DB;
    color: blue;
    padding: 16px;
    font-size: 16px;
    border: none;*/
    cursor: pointer;
}

.droplink:hover:not(.disabled), .droplink:focus:not(.disabled), .exit-link:hover:not(.disabled) {
    color: blue;
}

.dropdown {
    position: relative;
    display: inline-block;
}

.dropdown-content {
    display: none;
    position: absolute;
    background-color: #f1f1f1;
    overflow: auto;
	border: 1px solid black;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
}

.dropdown-content span {
    color: black;
    padding: 6px;
    text-decoration: none;
    display: block;
}

.dropdown a:hover {background-color: #ddd}

.show {display:block;}
</style>`)
