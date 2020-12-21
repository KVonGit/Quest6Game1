"use strict"


//=======================
// item_links LIB REDUX |
//=======================
// by KV             |
//====================
// for QuestJS v0.3  |
//====================
// Version 0.2       |
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

//settings.roomTemplate = [
  //"{hereDesc}",
  //"{objectsHere:You can see {itemsHereLinks} here.}",
  //"{exitsHere:You can go {exits}.}",
//];




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
				obj.holdingVerb = lang.contentsForData[obj.contentsType].prefix;
			}
			if (obj.npc) {
				obj.holdingVerb = lang.carrying + ' ';
			}
		}
	})
}

function getArticle(item, type){
	if (!type) return false;
	return type === DEFINITE ? lang.addDefiniteArticle(item) : lang.addIndefiniteArticle(item);
}

function getDisplayAliasLink(item, art, cap){
	let s = getArticle(item, INDEFINITE) + item.linkAlias;
	s = s.trim();
	return s;
}


lang.inside = "inside";
lang.on_top = "on top";
lang.carrying = "carrying";
lang.contentsForData.surface.prefix = 'on which you see ';
lang.contentsForData.surface.suffix = '';
//lang.open_successful = "{nv:char:open:true} {sb:container}.";
lang.open_successful = "Done.";
lang.close_successful = "Done.";
lang.inside_container = "{nv:item:be:true} inside {sb:container}.";
//lang.look_inside = "Inside {sb:container} {nv:char:can} see {param:list}.";
lang.look_inside = "Inside, {nv:char:can} see {param:list}.";
lang.take_successful = "Taken.";
lang.drop_successful = "Dropped.";

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
			contents = settings.linksEnabled ? getContentsLinkRedux(obj) : contents;
			msg(`${pre}${contents}.`);
		}
	} else {
		let contents =  getContentsLinkRedux(obj)
		if (contents == 'nothing') return;
		let pre = processText('{pv:char:be:true} ' + lang.carrying, {char:obj});
		contents = formatList(contents,{modified:true,doNotSort:true,lastJoiner:'and'});
		msg(`${pre} ${contents}.`);
	}
}

function getContentsLinkRedux(o) {
  let s = '';
  const contents = o.getContents(world.LOOK);
  if (contents.length > 0 && (!o.closed || o.transparent)) {
    s = o.listContents(world.LOOK);
  }
  return s
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

function hasChildren(item){
	return item.getContents(item).length > 0;
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

// TODO: This needs to go!
function createChildrenLinkString(arr,options){
	
    let string = '';
	if (arr.length < 1) return string
	arr.forEach(a => {
        if (a.name) {
			//console.log(a.name);
			string += getDisplayAliasLink(a,{article:INDEFINITE});
			let art = '';
			let count = options && options[a.name + '_count'] ? options[a.name + '_count'] : false
		    if (options && !count && options.loc && a.countable) count = a.countAtLoc(options.loc)
		    if (options && options.article && options.article === DEFINITE) {
		        art = lang.addDefiniteArticle(a)
		      }
		      else if (options && options.article && options.article === INDEFINITE) {
		        art = lang.addIndefiniteArticle(a, count)
		      }
			//string = art + ' ' + string;
			//string = string.trim();
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

// TODO: This needs to go!
function linkStringer(arr,options){
	//console.log(arr);
	let s = "";
    s = createChildrenLinkString(arr,options);
    let newArr = s.split(':');
    newArr = newArr.filter(el => {
        return el != [];
    });
    let realString = formatList(newArr, {doNotSort:true, lastJoiner:'and'});
    return realString;
}


// This works as expect on items, but not rooms. For rooms, getRoomContents(room).
function getAllChildrenLinks(item,options){
	if (!options) {
		options = {};
		options.article = INDEFINITE
	}
	return linkStringer(getAllChildren(item), options);
}

function getAllChildrenLinksRedux(item){
	let kids = getDirectChildren(item);
	kids = kids.map(o => lang.getName(o,{modified:true,article:INDEFINITE})); // TODO: This needs its own getName function, I think.
	return formatList(kids,{lastJoiner:lang.list_and, nothing:lang.list_nothing});
}

function getItemsHereLinks() {
	let room = w[game.player.loc];
	let items = getRoomContents(room);
	let options = {};
	options.article = INDEFINITE;
	return linkStringer(items,options);
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
	//disableItemLink($(`[obj="${oName}"]`));  // Commented out because fixed duplicate dropdown issue.
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

function getDisplayAlias(item, options) {
    if (!options) options = {}
    if (!item.alias) item.alias = item.name
    let s = ''
    let count = options[item.name + '_count'] ? options[item.name + '_count'] : false
    if (!count && options.loc && item.countable) count = item.countAtLoc(options.loc)

    if (item.pronouns === lang.pronouns.firstperson || item.pronouns === lang.pronouns.secondperson) {
      s = options.possessive ? item.pronouns.poss_adj : item.pronouns.subjective;
    }

    else {    
      if (count && count > 1) {
        s += lang.toWords(count) + ' '
      }
      else if (!settings.linksEnabled && options.article === DEFINITE) {
        s += lang.addDefiniteArticle(item)
      }
      else if (!settings.linksEnabled && options.article === INDEFINITE) {
        s += lang.addIndefiniteArticle(item, count)
      }
      if (item.getAdjective) {
        s += item.getAdjective()
      }
      if (!count || count === 1) {
        s += item.alias
      }
      else if (item.pluralAlias) {
        s += item.pluralAlias
      }
      else {
        s += item.alias + "s"
      }
      if (options.possessive) {
        if (s.endsWith('s')) {
          s += "'"
        }
        else { 
          s += "'s"
        }
      }
    }
    return s
}



// MODS

// MODDED for item links
util.listContents = function(situation, modified = true) {
  let objArr = getAllChildrenLinks(this); // TODO: This needs to work like the name modifier for containers!
 return objArr
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

lang.getName = (item, options) => {
    if (!options) options = {}
    if (!item.alias) item.alias = item.name
    let s = ''
    let count = options[item.name + '_count'] ? options[item.name + '_count'] : false
    if (!count && options.loc && item.countable) count = item.countAtLoc(options.loc)

    if (item.pronouns === lang.pronouns.firstperson || item.pronouns === lang.pronouns.secondperson) {
      s = options.possessive ? item.pronouns.poss_adj : item.pronouns.subjective;
      return s;
    }

    else {    
      if (count && count > 1) {
        s += lang.toWords(count) + ' '
      }
      else if (!settings.linksEnabled && options.article === DEFINITE) {
        s += lang.addDefiniteArticle(item)
      }
      else if (!settings.linksEnabled && options.article === INDEFINITE) {
        s += lang.addIndefiniteArticle(item, count)
      }
      if (item.getAdjective) {
        s += item.getAdjective()
      }
      if (!count || count === 1) {
        s += item.alias
      }
      else if (item.pluralAlias) {
        s += item.pluralAlias
      }
      else {
        s += item.alias + "s"
      }
      if (options.possessive) {
        if (s.endsWith('s')) {
          s += "'"
        }
        else { 
          s += "'s"
        }
      }
    }
    let art = getArticle(item, options.article);
    if (!art) art = '';
    let cap = options && options.capital;
    //log (art)
    //log (cap)
   // log (options)
    if (!item.room) s = getItemLink(item, false, false, cap);
    s = art + s;
    s += util.getNameModifiers(item, options);
    return s;
};

lang.getNameNoLink = (item, options) => {
    if (!options) options = {}
    if (!item.alias) item.alias = item.name
    let s = ''
    let count = options[item.name + '_count'] ? options[item.name + '_count'] : false
    if (!count && options.loc && item.countable) count = item.countAtLoc(options.loc)

    if (item.pronouns === lang.pronouns.firstperson || item.pronouns === lang.pronouns.secondperson) {
      s = options.possessive ? item.pronouns.poss_adj : item.pronouns.subjective;
    }

    else {    
      if (count && count > 1) {
        s += lang.toWords(count) + ' '
      }
      else if (!settings.linksEnabled && options.article === DEFINITE) {
        s += lang.addDefiniteArticle(item)
      }
      else if (!settings.linksEnabled && options.article === INDEFINITE) {
        s += lang.addIndefiniteArticle(item, count)
      }
      if (item.getAdjective) {
        s += item.getAdjective()
      }
      if (!count || count === 1) {
        s += item.alias
      }
      else if (item.pluralAlias) {
        s += item.pluralAlias
      }
      else {
        s += item.alias + "s"
      }
      if (options.possessive) {
        if (s.endsWith('s')) {
          s += "'"
        }
        else { 
          s += "'s"
        }
      }
    }
    s += util.getNameModifiers(item, options)
    return s
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
	  //oName = getItemLink(subject,false,false, (!article=='' && arr[2] === 'true'))
	  oName = lang.getName(subject,{modified:true})
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
    padding: 2px;
    text-decoration: none;
    display: block;
    border: 1px solid black;
}

.dropdown  a:hover {background-color: #ddd}

.list-link-verb:hover {background-color: #ddd}

.show {display:block;

}
.list-link-verb {
	white-space:nowrap;
}
</style>`);

