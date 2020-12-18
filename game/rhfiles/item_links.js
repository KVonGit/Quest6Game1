"use strict"


//====================
// item_links LIB  |
//====================
// by KV             |
//====================
// for QuestJS v0.3  |
//====================
// Version 5         |
//====================

/*
 * IMPORTANT!!!
 * ------------
 * 
 * Make sure you have this file loading before any files which create rooms or items! 
 * 
 *  */


// YOU NEED TO UNCOMMENT THESE IF NOT ALREADY DECLARED!
//const log = console.log;
//const debuglog = (s) => { if(settings.playMode === 'dev' || settings.playMode === 'meta'){ log(s)} };
//const parserlog = (s) => { if(parser.debug){ log(s)} };
//const debuginfo = (s) => { console.info(s) };


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



// END OF SETTINGS


// UPDATE THE VERB LINKS!
const itemLinks = {}
io.modulesToUpdate.push(itemLinks)
itemLinks.update = function() {
	if(settings.linksEnabled){
		if(settings.debugItemLinks) {
			debuglog("running itemLinks.update() to update verbs . . .")
		}
		//updateDropdownVerblists()
		updateAllItemLinkVerbs();
	}
}

//===========================
// TEXT PROCESSOR ADDITIONS |
//===========================

tp.text_processors.objectsHereLinks = function(arr, params) {
  // Create listOfOjects array comprised of all objects listed here, with links for the objects.
  let listOfOjects = getItemsLinks(scopeHereListed(),true)
  return listOfOjects.length === 0 ? "" : formatList(listOfOjects, {article:INDEFINITE, lastJoiner:lang.list_and, modified:true, nothing:lang.list_nothing, loc:game.player.loc});
};

tp.text_processors.itemsLinks = function(arr, params, bool) {
  let objArr = getItemsLinks(arr, bool, false)
  return formatList(objArr, {article:INDEFINITE, lastJoiner:lang.list_and, modified:true, nothing:lang.list_nothing, loc:game.player.loc});
}

tp.text_processors.itemLink = function(obj, params) {
	return getItemLink(w[obj[0]],false,false)
}



//==================================
// END OF TEXT PROCESSOR ADDITIONS |
//==================================

//===========
// FUNCTIONS|
//-----------


function getItemLink(obj, disableAfterTurn=false, addArticle=true, capitalise=false){
	//if disableAfterTurn is sent true, this link will deactive with the next room description!
	if(settings.linksEnabled){
		var endangered = disableAfterTurn ? "endangered-link" : ""
		var oName = obj.name
		var id = obj.alias || obj.name;
		id = capitalise ? sentenceCase(id) : id;
		var prefix = "";
		if (obj.prefix){
			prefix = obj.prefix+" ";
		}
		var dispAlias = getDisplayAlias(obj)
		if (addArticle) {prefix = dispAlias.replace(obj.alias,'')}
		disableItemLink($(`[obj="${oName}"]`))
		
		var s = prefix+`<span class="object-link dropdown ${endangered}">`;
		s +=`<span onclick="toggleDropdown($(this).attr('obj'))" obj="${oName}" `+
		`class="droplink ${endangered}" name="${oName}-link">${id}</span>`;
		s += `<span id="${oName}" class="dropdown-content ${endangered}">`;
		s += `<span id="${oName}-verbs-list-holder" class="${endangered}">`
		s += getVerbsLinks(obj, endangered);
		s += `</span></span></span>`;
		return s;
	}else{
		var s = obj.alias || obj.name;
		return s
	}
}

function getItemsLinks(arr, turn, art){
  let objs = arr // Create array of objects here.
  let objArr = [] // Blank array to push to later in the function
  let oLink // Blank variable for the object link (used later in the function)
  if (objs.length > 0) { // If there are objects in this array . . .
	  //debuglog(objs)
	  objs.forEach(o => {
		oLink = getItemLink(o, turn, art) // Set the object link
		let oLinkAddon = getItemLinkContents(o, turn, art)
		oLink += oLinkAddon
		objArr.push(oLink)  // Add the object (with link) to the list!
	  })
  }
  return objArr
}

function getItemLinkContents(o, turn, art){
	// SHOULD THIS CHECK FOR SCENERY?
	let s = "";
	let pre = "";
	if (o.container) {
		switch (o.contentsType) {
			case "container":
				pre = "containing: ";
				break;
			case "surface":
				pre = "on which you see: ";
				break;
			default:
				// Do  nothing
		}
	}
	if (o.npc) {
		pre = "carrying: ";
	}
	if ((o.listContents && !o.closed && o.listContents().length>0) || (!o.listContents && o.npc && o.getContents.length>0)) {  // If open container or npc . . .
		let contents = "" // Create blank string variable
		if (o.container){ // If this is a container . . .
			contents  = o.listContents()  // Get a list of the contents. (I modified util.listContents in mods.js to put out object links)
		}
		if (o.npc) { // If this is an npc . . .
			contents =  o.getHolding().map(x => getItemLink(x, turn, art)) // Set the list of contents, with item links.
		}
		if (contents != "nothing" && contents != ""){ // If there are actually contents . . .
			let stuff = o.getContents()
			let stuffList = stuff.filter(ob => ob.container).map(ob => getItemLinkContents(ob))
			contents += stuffList;
		}
		if (contents != "nothing" && contents != ""){
			s += " (" + pre + contents + ")" // Add the contents to the item link.
		}
	}
	return s
}



function getVerbsLinks(obj, endangered){
	let verbArr = obj.getVerbs();
	let oName = obj.name;
	let id = obj.alias || obj.name;
	let s = ``;
	if (verbArr.length>0){
		verbArr.forEach (o=>{
			o = capFirst(o);
			s += `<span class="${endangered} list-link-verb" `+
			`onclick="$(this).parent().parent().toggle();handleObjLnkClick('${o} '+$(this).attr('obj-alias'),this,'${o}','${id}');" `+
			`link-verb="${o}" obj-alias="${id}" obj="${oName}">${o}</span>`;
		})
	}
	return s;
}

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

function updateAllItemLinkVerbs(){
	let verbEls = $("[link-verb]")
	Object.keys(verbEls).forEach(i => {
		let el = verbEls[i]
		let objName = $(el).attr("obj")
		if (!objName) return
		let obj = w[objName]
		updateItemLinkVerbs(obj)
	})
}

function updateItemLinkVerbs(obj){
	// TODO Check if item is in scope.  If not, disable it!
	let oName = obj.name;
	if (!obj.scopeStatus) {
		disableItemLink($(`[obj="${oName}"]`))
		return
	}
	let id = obj.alias || obj.name;
	let el = $(`#${oName}-verbs-list-holder`);
	let endangered = el.hasClass("endangered-link") ? "endangered-link" : "";
	let newVerbsEl = getVerbsLinks(obj, endangered)
	el.html(newVerbsEl)
}

function disableExistingItemLinks(bool=false){
	//if bool is false, this only disables existing object links printed using the endangered-link class.
	//if bool is true, this disables ALL existing object links
	//parser.msg("running disableExistingItemLinks!")
	//Checks that this doesn't remove "good" links.
	if (bool){
		$(".droplink").removeClass("droplink").css("cursor","default").attr("name","dead-droplink")
		$(".object-link").removeClass("dropdown")
		$(".dropdown").removeClass("dropdown")
		$(".dropdown-content").remove()
	} else {
		$(".endangered-link.droplink").removeClass("droplink").css("cursor","default").attr("name","dead-droplink")
		$(".endangered-link.object-link").removeClass("dropdown")
		$(".endangered-link.dropdown").removeClass("dropdown")
		$(".endangered-link.dropdown-content").remove()
	}
}

function disableItemLink(el){
	let objName = $(el).attr("obj")
	$(el).removeClass("droplink").css("cursor","default").attr("name","dead-droplink")
	$(el).removeClass("dropdown")
	$(el).removeClass("dropdown")
	$(`#${objName}`).remove()
}

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
}


function capFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}


function getDisplayAlias(obj,art=INDEFINITE){
	return lang.getName(obj,{article:art})
}


// NOTE: getAlias is not used by any function in this library.
function getAlias(obj){
	return obj.alias || obj.name
}


// END OF FUNCTIONS


// MODS _________________

// MODDED for item links
util.listContents = function(situation, modified = true) {
  let objArr = this.getContents(situation);
  if (settings.linksEnabled) {
	  objArr = objArr.map(o => getItemLink(o,true));
	  //debuglog(objArr)
  }
  return formatList(objArr, {article:INDEFINITE, lastJoiner:lang.list_and, modified:modified, nothing:lang.list_nothing, loc:this.name});
};

// MOD!!!
findCmd('Inv').script = function() {
  let listOfOjects = game.player.getContents(world.INVENTORY);
  if (settings.linksEnabled) {
	  listOfOjects = getItemsLinks(listOfOjects)
  }
  msg(lang.inventoryPreamble + " " + formatList(listOfOjects, {article:INDEFINITE, lastJoiner:lang.list_and, modified:true, nothing:lang.list_nothing, loc:game.player.name}) + ".");
  return settings.lookCountsAsTurn ? world.SUCCESS : world.SUCCESS_NO_TURNSCRIPTS;
};



// MOD!!!
  // the NPC has already been moved, so npc.loc is the destination
  lang.npcEnteringMsg = function(npc, origin) {
    let s = "";
    let flag = false;

	let npcLink = getItemLink(npc,true)

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
  };


// MOD!!!
tp.text_processors.nm = function(arr, params) {
  const subject = tp.findSubject(arr, params);
  if (!subject) return false;
  const opt = {};
  let article = ''
  if (arr[1] === 'the') opt.article = DEFINITE;
  if (arr[1] === 'a') opt.article = INDEFINITE;
  let count = params[subject.name + '_count'] ? params[subject.name + '_count'] : false
  if (opt.article === DEFINITE) {
	article = lang.addDefiniteArticle(subject)
  }
  else if (opt.article === INDEFINITE) {
	article = lang.addIndefiniteArticle(subject, count)
  }
  if (params[subject.name + '_count']) opt[subject.name + '_count'] = params[subject.name + '_count']
  let oName = lang.getName(subject, opt)
  article = arr[2] === 'true' ? sentenceCase(article) : article;
  if (settings.linksEnabled){
	  oName = getItemLink(subject,false,false, (!article=='' && arr[2] === 'true'))
  }
  return article + " " + oName;
};

// Not hacked yet
//tp.text_processors.nms = function(arr, params) {
  //const subject = tp.findSubject(arr, params);
  //if (!subject) return false;
  //const opt = {possessive:true};
  //if (arr[1] === 'the') opt.article = DEFINITE;
  //if (arr[1] === 'a') opt.article = INDEFINITE;
  //return arr[2] === 'true' ? sentenceCase(lang.getName(subject, opt)) : lang.getName(subject, opt)
//};




/************
 * 
 * CSS STUFF
 * 
 */
 
 
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

.show {display:block;

}
.list-link-verb {
	white-space:nowrap;
}
</style>`)

