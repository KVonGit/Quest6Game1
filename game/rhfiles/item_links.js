"use strict"

//=======================
// item_links LIB REDUX |
//=======================
// by KV             |
//====================
// for QuestJS v0.3  |
//====================
// Version 0.4       |
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
 * 1. I need to set it up so each item handles its own contents listing,
 *    but I can't figure out how to do that without messing with lang.getName.
 *  
 * */

// =======

// lang additions & mods
// (NOTE: These first three NEED to be set up in settings.js, or any other file which loads before this one.)


// New ones NECESSARY for this library!  

//lang.inside = "inside";
//lang.on_top = "on top";
//lang.carrying = "carrying";

//-----------------

// My mods.  (Not necessary for the library.)
//lang.contentsForData.surface.prefix = 'on which you see ';
//lang.contentsForData.surface.suffix = '';
//lang.open_successful = "Done.";
//lang.close_successful = "Done.";
//lang.inside_container = "{nv:item:be:true} inside {sb:container}.";
//lang.look_inside = "Inside, {nv:char:can} see {param:list}.";
//lang.take_successful = "Taken.";
//lang.drop_successful = "Dropped.";

//===================================


// THIS UPDATES THE VERB LINKS!
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

// Used by getDisplayAliasLink
function getArticle(item, type){
	if (!type) return false;
	return type === DEFINITE ? lang.addDefiniteArticle(item) : lang.addIndefiniteArticle(item);
}

function getDisplayAliasLink(item, options, cap){
	let art = false;
	if (options) art = options.article
	let article = getArticle(item, art)
	if (!article) {
		article = '';
	}
	let s = article + getItemLink(item);
	s = s.trim();
	return s;
}

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
			contents = settings.linksEnabled ? getContentsLink(obj) : contents;
			msg(`${pre}${contents}.`);
		}
	} else {
		let contents =  getAllChildrenLinks(obj)
		if (contents == 'nothing') return;
		let pre = processText('{pv:char:be:true} ' + lang.carrying, {char:obj});
		//contents = formatList(contents,{modified:true,doNotSort:true,lastJoiner:'and'});
		msg(`${pre} ${contents}.`);
	}
}

function getContentsLink(o) {
  let s = '';
  const contents = o.getContents(world.LOOK);
  if (contents.length > 0 && (!o.closed || o.transparent)) {
    if (!o.listContents) {
		return getAllChildrenLinks(o);
	}
	s = o.listContents(world.LOOK);
  }
  return s
}

function canHold(obj){
	return ( obj.container && ( !obj.closed || obj.transparent ) ) || obj.npc;
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

function getAllChildrenLinks(item){
	let kids = getDirectChildren(item);
	kids = kids.map(o => lang.getName(o,{modified:true,article:INDEFINITE}));
	return formatList(kids,{doNotSort:true, lastJoiner:lang.list_and, nothing:lang.list_nothing});
}

function getItemLink(obj, capitalise=false){
	if(!settings.linksEnabled){
		var s = obj.alias || obj.name;
		return s;
	}
	var oName = obj.name;
	var id = obj.alias || obj.name;
	id = capitalise ? sentenceCase(id) : id;
	var dispAlias = lang.getNameOG(obj);
	var s = `<span class="object-link dropdown">`; 

	s +=`<span onclick="toggleDropdown($(this).next())" obj="${oName}" `+
	`class="droplink" name="${oName}-link">${id}</span>`;

	s += `<span obj="${oName}" class="dropdown-content">`;

	s += `<span obj="${oName}-verbs-list-holder">`;
	s += getVerbsLinks(obj);
	s += `</span></span></span>`;
	return s;
}

function getVerbsLinks(obj){
	let verbArr = obj.getVerbs();
	let oName = obj.name;
	let id = obj.alias || obj.name;
	let s = ``;
	if (verbArr.length>0){
		verbArr.forEach (o=>{
			o = sentenceCase(o);
			s += `<span class="list-link-verb" `+
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


//------
// MODS
//------

// MODDED for item links
util.listContents = function(situation, modified = true) {
  let objArr = getAllChildrenLinks(this);
 return objArr
};

// MOD!!!
findCmd('Inv').script = function() {
  let listOfOjects = game.player.getContents(world.INVENTORY);
  if (settings.linksEnabled) {
	  listOfOjects = listOfOjects.map(o => getDisplayAliasLink(o, {article:INDEFINITE}))
  }
  msg(lang.inventoryPreamble + " " + formatList(listOfOjects, {lastJoiner:lang.list_and, modified:true, nothing:lang.list_nothing, loc:game.player.name}) + ".");
  return settings.lookCountsAsTurn ? world.SUCCESS : world.SUCCESS_NO_TURNSCRIPTS;
};

// MOD!!!
lang.getName = (item, options) => {
    if (!settings.linksEnabled) {
		return lang.getNameOG(item, options);
	}
	if (!options) options = {}
    if (!item.alias) item.alias = item.name
    let s = ''
    let count = options[item.name + '_count'] ? options[item.name + '_count'] : false
    if (!count && options.loc && item.countable) count = item.countAtLoc(options.loc)

    if (item.pronouns === lang.pronouns.firstperson || item.pronouns === lang.pronouns.secondperson) {
      s = options.possessive ? item.pronouns.poss_adj : item.pronouns.subjective;
      s += util.getNameModifiers(item, options); // ADDED by KV
      return s; // ADDED by KV
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
    if (!item.room) s = getItemLink(item, cap);
    s = art + s;
    s += util.getNameModifiers(item, options);
    return s;
};

// The original lang.getName
lang.getNameOG = (item, options) => {
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


//----------------
// END OF MODS
//----------------


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

