"use strict"


//=======================
// item_links LIB REDUX |
//=======================
// by KV             |
//====================
// for QuestJS v0.3  |
//====================
// Version -1        |
//====================

/*
 * IMPORTANT!!!
 * ------------
 * 
 * Make sure you have this file loading before any files which create rooms or items! 
 * 
 *  */
//============================================================================

/**
 * TODO:
 * 
 * 1. The whole process of outputing the contents links string needs to be 
 *    altered.  Per Pixie's advice, I need to set it up so each item
 *    handles its own contents listing.
 * 
 * 2. Most of this code will be unnecessary once I've set this up differently.
 *    Warn people in the comments.
 * 
 * */


//===================================

settings.roomTemplate = [
  "{hereDesc}",
  "{objectsHere:You can see {itemsHereLinks} here.}",
  "{exitsHere:You can go {exits}.}",
];




// UPDATE THE VERB LINKS!
const itemLinks = {};
io.modulesToUpdate.push(itemLinks);
itemLinks.update = function() {
	if(settings.linksEnabled){
		if(settings.debugItemLinks) {
			console.info("running itemLinks.update() to update verbs . . .");
		}
		updateAllItemLinkVerbs();
	}
};

// Used by itemLinks
function updateAllItemLinkVerbs(){
	let verbEls = $("[link-verb]");
	Object.keys(verbEls).forEach(i => {
		let el = verbEls[i];
		let objName = $(el).attr("obj");
		if (!objName) return;
		let obj = w[objName];
		updateItemLinkVerbs(obj);
	})
}

// Used by updateAllItemLinkVerbs
function updateItemLinkVerbs(obj){
	// TODO Check if item is in scope.  If not, disable it!
	let oName = obj.name;
	if (!obj.scopeStatus) {
		disableItemLink($(`[obj="${oName}"]`));
		return;
	}
	let id = obj.alias || obj.name;
	let el = $(`[obj='${oName}-verbs-list-holder'`);
	let endangered = el.hasClass("endangered-link") ? "endangered-link" : "";
	let newVerbsEl = getVerbsLinks(obj, endangered);
	el.html(newVerbsEl);
}

// Invoked at the end of settings.setup
function setupItemLinks(){
	let allObjs = allObjects();
	allObjs.forEach(obj => {
		if (obj.getVerbs && obj != w.me && obj != w.background && obj.loc != w.nowhere.name){
			obj.linkAlias = getItemLink(obj,false,false);
			if (obj.container) {
				obj.holdingVerb = obj.contentsType === 'surface' ? 'on' : 'in';
				obj.holdingVerb += ' which you see ';
			}
			if (obj.npc) {
				obj.holdingVerb = 'carrying ';
			}
		}
	})
}

function getDisplayAliasLink(item){
	let s = lang.addIndefiniteArticle(item) + item.linkAlias;
	s = s.trim();
	return s;
}


lang.inside = "inside";
lang.on_top = "on top";

// Used by npcs and containers.  TODO: Learn about name modifiers, because this code may be reinventing the wheel.
function handleExamineHolder(params){
	let obj = parser.currentCommand.objects[0][0];
	if (!obj) return;
	if (!obj.container && !obj.npc) return;
	if (obj.container) {
		if (!obj.closed || obj.transparent) {
			let contents = obj.getContents();
			contents = contents.filter(o => !o.scenery)
			if (contents.length <= 0){
				return;
			}
			let pre = obj.contentsType === 'surface' ? lang.on_top : lang.inside;
			pre = sentenceCase(pre);
			let subjVerb = processText("{pv:pov:see}", {pov:game.player});
			pre += `, ${subjVerb} `;
			contents = settings.linksEnabled ? getAllChildrenLinks(obj) : contents;
			msg(`${pre}${contents}.`);
		}
	} else {
		let contents =  getAllChildrenLinks(obj);
		if (contents == 'nothing') return;
		let pre = processText('{pv:char:be:true} carrying', {char:obj});
		contents = formatList(contents,{modified:true,doNotSort:true,lastJoiner:'and'});
		msg(`${pre} ${contents}.`);
	}
}

// This does not check inside containers.
function listItemContents(obj, modified = true) {
  console.info("Running listItemContents");
  let objArr = obj.getContents(obj);
  if (settings.linksEnabled) {
	  objArr = objArr.map(o => getItemLink(o,true));
  }
  return formatList(objArr, {article:INDEFINITE, lastJoiner:lang.list_and, modified:modified, nothing:lang.list_nothing, loc:obj.name});
}

function canHold(obj){
	return ( obj.container && ( !obj.closed || obj.transparent ) ) || obj.npc;
}

function hasGrandchildren(obj){
	let grandparent = false;
	let kids = obj.getContents(obj);
	if (!kids) return false;
	kids.forEach(kid => {
		if (kid.getContents) grandparent = true;
	})
	return grandparent;
}

function getDirectChildren(item){
	if (!item.getContents) return [];
	return item.getContents(item);
}

function getAllChildren(item, isRoom=false){
	let result = [];
	let children = getDirectChildren(item);
	if (isRoom){
		children = children.filter(o =>o != game.player);
	}
	if (children.length < 1) return [];
	children.forEach(child => {
		result.push(child);
		// Added the check on the next line due to occasional errors.
		let grandchildren = child.getContents ? child.getContents(child) : [];
		if (grandchildren.length > 0){
			result.push(getAllChildren(child));
		}
	})
	return result;
}

function getRoomContents(room){
	let result = [];
	let children = getAllChildren(room, true);
	if (children.length < 1) return [];
	children.forEach(child => {
		//console.log(child);
		result.push(child);
		// Added the check on the next line due to occasional errors.
		let grandchildren = child.getContents ? child.getContents(child) : [];
		if (grandchildren.length > 0){
			result.push(getAllChildren(child));
		}
	})
	return result;
}

function createChildrenLinkString(arr){
	let string = '';
	if (arr.length < 1) return string
	arr.forEach(a => {
        if (a.name) {
			//console.log(a.name);
			string += getDisplayAliasLink(a);
			game.tempLinkItem = a;
        } else if (a.length) {
			//console.log(game.tempLinkItem);
			////console.log(a);
			string += "@";
			//console.log(game.tempLinkItem.holdingVerb);
			let verb = game.tempLinkItem.holdingVerb ? game.tempLinkItem.holdingVerb : 'CARRYING';
			//console.log(verb);
			if (verb !== 'CARRYING') {
				string = string.replace(/:@/g, ' (' + verb);
				//console.log("still going");
				let s = createChildrenLinkString(a);
				string += s + '_END_';
			}
        }
        string += ":";
    })
    string = string.replace(/:@/g, '');
    string = string.replace(/:_END_/g, ')');
    return string;
}

function linkStringer(arr){
	//console.log(arr);
	let s = "";
    s = createChildrenLinkString(arr);
    let newArr = s.split(':');
    newArr = newArr.filter(el => {
        return el != [];
    });
    let realString = formatList(newArr, {doNotSort:true, lastJoiner:'and'});
    return realString;
}


// This works as expect on items, but not rooms. For rooms, getRoomContents(room).
function getAllChildrenLinks(item){
	return linkStringer(getAllChildren(item));
}

function getItemsHereLinks() {
	let room = w[game.player.loc];
	let items = getRoomContents(room);
	return linkStringer(items);
}


function getItemLink(obj, disableAfterTurn=false, addArticle=true, capitalise=false){
	//if disableAfterTurn is sent true, this link will deactive with the next room description!
	if(!settings.linksEnabled){
		var s = obj.alias || obj.name;
		return s;
	}
	//console.info("getItemLink: " + obj.name);
	var endangered = disableAfterTurn ? "endangered-link" : "";
	var oName = obj.name;
	var id = obj.alias || obj.name;
	id = capitalise ? sentenceCase(id) : id;
	var prefix = "";
	if (obj.prefix){
		prefix = obj.prefix+" ";
	}
	var dispAlias = getDisplayAlias(obj);
	if (addArticle) {
		prefix = dispAlias.replace(obj.alias,'');
	}
	//disableItemLink($(`[obj="${oName}"]`));
	
	var s = prefix+`<span class="object-link dropdown ${endangered}">`; 

	s +=`<span onclick="toggleDropdown($(this).next())" obj="${oName}" `+
	`class="droplink ${endangered}" name="${oName}-link">${id}</span>`;

	s += `<span obj="${oName}" class="dropdown-content ${endangered}">`;

	s += `<span obj="${oName}-verbs-list-holder" class="${endangered}">`;
	s += getVerbsLinks(obj, endangered);
	s += `</span></span></span>`;
	return s;
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
    $(element).toggle();
}
 
function handleObjLnkClick(cmd,el,verb,objAlias){
	enterButtonPress(cmd);
}

function disableExistingItemLinks(bool=false){
	//if bool is false, this only disables existing object links printed using the endangered-link class.
	//if bool is true, this disables ALL existing object links
	//parser.msg("running disableExistingItemLinks!");
	//Checks that this doesn't remove "good" links.
	if (bool){
		$(".droplink").removeClass("droplink").css("cursor","default").attr("name","dead-droplink");
		$(".object-link").removeClass("dropdown");
		$(".dropdown").removeClass("dropdown");
		$(".dropdown-content").remove();
	} else {
		$(".endangered-link.droplink").removeClass("droplink").css("cursor","default").attr("name","dead-droplink");
		$(".endangered-link.object-link").removeClass("dropdown");
		$(".endangered-link.dropdown").removeClass("dropdown");
		$(".endangered-link.dropdown-content").remove();
	}
}

function disableItemLink(el){
	let objName = $(el).attr("obj");
	$(el).removeClass("droplink").css("cursor","default").attr("name","dead-droplink");
	$(el).removeClass("dropdown");
	$(el).removeClass("dropdown");
	$(`#${objName}`).remove();
}

function enterButtonPress(cmd){
	//Calling this function with no arg will cause s to default to the text in the textbox.
	if(cmd) $('#textbox').val(cmd);
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
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getDisplayAlias(obj,art=INDEFINITE){
	return lang.getName(obj,{article:art});
}



// MODS

// MODDED for item links
util.listContents = function(situation, modified = true) {
  console.info(`util.listContents running. this`)
  console.log(this)
  console.info(` situation: `)
  console.log(situation)
  let objArr = getAllChildrenLinks(this)
  //let objArr = this.getContents(situation);
  //if (settings.linksEnabled) {
	 // objArr = objArr.map(o => getItemLink(o));
	  //debuglog(objArr)
 // }
 return objArr
 // return formatList(objArr, {article:INDEFINITE, lastJoiner:lang.list_and, modified:modified, nothing:lang.list_nothing, loc:this.name});
};

// MOD!!!
findCmd('Inv').script = function() {
  let listOfOjects = game.player.getContents(world.INVENTORY);
  if (settings.linksEnabled) {
	  listOfOjects = listOfOjects.map(o => getDisplayAliasLink(o))
  }
  msg(lang.inventoryPreamble + " " + formatList(listOfOjects, {lastJoiner:lang.list_and, modified:true, nothing:lang.list_nothing, loc:game.player.name}) + ".");
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


// END OF MODS
//----------------

//===========================
// TEXT PROCESSOR ADDITIONS |
//===========================

tp.text_processors.itemsHereLinks = function(arr, params) {
	return getItemsHereLinks();
  };

tp.text_processors.itemsLinks = function(arr, params, bool) {
  alert("tp.text_processors.itemsLinks running!");  // I don't think this is ever invoked.
  //console.log(arr)
  let links = linkStringer(arr);
  return links;
  //let objArr = getItemsLinks(arr, bool, false)
  //return formatList(objArr, {article:INDEFINITE, lastJoiner:lang.list_and, modified:true, nothing:lang.list_nothing, loc:game.player.loc});
};

tp.text_processors.itemLink = function(obj, params) {
	return getItemLink(w[obj[0]],false,false);
};



//==================================
// END OF TEXT PROCESSOR ADDITIONS |
//==================================


//Capture clicks for the objects links
settings.clickEvents = [{one0:`<span>_PLACEHOLDER_</span>`}];
window.onclick = function(event) {
	if (!event.target.matches('.droplink')) {
		$(".dropdown-content").hide();
	}else{
		settings.clickEvents.unshift(event.target);
		if (typeof(settings.clickEvents[1].nextSibling)!=='undefined' &&  settings.clickEvents[1].nextSibling!==null){
			if (settings.clickEvents[1] !== event.target && settings.clickEvents[1].nextSibling.style.display==="inline" && event.target.matches('.droplink')){
				$(".dropdown-content").hide();
				event.target.nextSibling.style.display="inline";
			}
		}
	}
}



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
</style>`);

