"use strict"


//Check jQuery version (for no good reason)
function jQueryVersion(){
	return jQuery.fn.jquery;
}

//FOR fun
//This is what happens when clicking the version number in the game's subtitle
function clickedVersion(){
	var s
	var randClicks = ["Stop clicking that.","Clicky McClickerton!","This game sucks; right?",
	"How many times will you click that?","Clicking that won't help you."
	]
	s = "{random:" + randClicks.join(':') + "}<br><br>For a list of version changes, \
	<a id='fake-link-1' href='javascript:void(0)' onclick='printVersionChanges();$(this).parent().remove();''>CLICK HERE</a>"
	metamsg(s)
}

function printVersionChanges(){
	let s = ''
	settings.versionChanges.forEach(ver =>{s+='<hr>'+ver})
	msg("<iframe style='width:75%' class='helpDiv'/>");
	setTimeout(function(){
		$('.helpDiv:last-child').contents().find('body').html(`<u>VERSION CHANGES</u><br><br>`+s);
	}, 500);
}
//END of version printing stuff
//-----------------------------


function disableShowMenuLinks(){
	$(".menu-option").attr('onclick','').attr('style','color:black')
}

//==================
//BUTTON PRESS SIMS|
//==================

function upArrowButtonPress(){
        // up arrow MODIFIED BY KV
        io.savedCommandsPos -= 1;
        if (io.savedCommandsPos < 0) { io.savedCommandsPos = 0; }
        $('#textbox').val(io.savedCommands[io.savedCommandsPos-1]); // KV subtracted 1 from Pos to exclude the current 'g' or 'again'
        // Get cursor to end of text
        const el = $('#textbox')[0]
        if (el.setSelectionRange) {
          setTimeout(function() {el.setSelectionRange(9999, 9999); }, 0);  
        }
        else if (typeof el.selectionStart == "number") {
          el.selectionStart = el.selectionEnd = el.value.length;
        }
        else if (typeof el.createTextRange != "undefined") {
          el.focus();
          var range = el.createTextRange();
          range.collapse(false);
          range.select();
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



//=======================
//END BUTTON PRESS SIMS |
//=======================

//lang.getName=function(item, options) {
    //let alias = item.alias || item.name
    //if (!options) options = {}
    ////if (!item.alias) item.alias = item.name
    //let s = ''
    //let count = options[item.name + '_count'] ? options[item.name + '_count'] : false
    //if (!count && options.loc && item.countable) count = item.countAtLoc(options.loc)

    //if (item.pronouns === lang.pronouns.firstperson || item.pronouns === lang.pronouns.secondperson) {
      //s = options.possessive ? item.pronouns.poss_adj : item.pronouns.subjective;
    //}

    //else {    
      //if (count && count > 1) {
        //s += lang.toWords(count) + ' '
      //}
      //else if (options.article === DEFINITE) {
        //s += lang.addDefiniteArticle(item)
      //}
      //else if (options.article === INDEFINITE) {
        //s += lang.addIndefiniteArticle(item, count)
      //}
      //if (item.getAdjective) {
        //s += item.getAdjective()
      //}
      //if (!count || count === 1) {
        //s += item.alias
      //}
      //else if (item.pluralAlias) {
        //s += item.pluralAlias
      //}
      //else {
        //s += alias + "s"
      //}
      //if (options.possessive) {
        //if (s.endsWith('s')) {
          //s += "'"
        //}
        //else { 
          //s += "'s"
        //}
      //}
    //}
    //s += util.getNameModifiers(item, options)

    //return (options && options.capital ? sentenceCase(s) : s)
  //}



//Created to help someone on the forum.
function listItemAtts(obj){
	var keys = Object.keys(obj);
	var txt = '';
	var a = 0;
	for (var key in keys) {
		txt+=a.toString() + ": " + keys[a]+"<br/>";
		a++;
	}
	metamsg(obj.name + " PROPERTIES:");
	metamsg(txt);
	return keys;	
};


function isWearing(char,obj){
	var objs = char.getWearing();
	var isw = false;
	for (var key in objs){
		var worn = objs[key];
		if(worn===obj){
			isw = true;
		}
	}
	return isw;
};


function ronaSpread(){
	if(isWearing(w.me,w.mask)){
	}else{
		var objs = scopeReachable();
		for (var key in objs){
			var obj = objs[key];
			if(obj.name !== "me"){
				if(typeof(obj.pInfected)==="undefined"){
					obj.pInfected = 0;
				}
				obj.pInfected++;
			}
		}
	}
};

//Returns a list of all world (w) objects' names.
function allObjectsNamesList(){
	return Object.keys(w).filter(x => (x !== "game" && typeof(w[x]["eventScript"])!=='function'))
}





function setPronoun(item){
	var { subjective : pronoun } = item.pronouns
	parser.pronouns[pronoun] = item
	return pronoun
}

function waitAndCall(delay, callback) {
  if (test.testing) return
  //io.outputSuspended = true
  if (delay === undefined) {
    io.addToOutputQueue({action:'wait', disable:true, text:text, cssClass:'continue'})
  }
  else {
    io.addToOutputQueue({action:'delay', disable:true, delay:delay, fn:callback})
  }
}

// I don't think anything uses this function.
function findObjByParser(s){
	if(parser.debug) {
		log("Running findObjByParser")
		log("DATA: "+s)
	}
	s = lang.article_filter_regex.exec(s)[1]
	if(parser.debug){log("After article filter regexp exec:");log(s);}
	var scr = w[s] || parser.findInList(s,allObjects(),{})
	if(parser.debug){log("scr: ");log(scr)}
	if (scr.length>1) {
		if(parser.debug){log("scr.length is > 1!");log(scr)}
		scr = findObjByParser(s,scr)
	}
	scr = scr[0]
	if(parser.debug) log(scr)
	return scr
}

function setUpHelpDialog(){
	var dia = `<div id="dialog_window_1" class="dialog_window" `+
	`title="Help" style="display:none;"><p id="page0" style="display:none">Welcome to <i>UI Example</i> help system. Click the buttons at the bottom`+
	` to see different stuff!</p><p id="page1" style="display:none;">Click on an object or person in the lists`+
	` on the right to see what actions you can perform with them.<br/><br/>If you are reading this, you probably`+
	` already found the <i>HELP</i> command, with <i>LOOK</i> and <i>WAIT</i>.</p><p id="page2" `+
	`style="display:none;">Just try clicking stuff. Seriously, how hard can it be?</p>`+
	`<p id="page3" style="display:none;">Created by The Pixie.<br/><br/>Thanks to Alex Warren for creating Quest,`+
	` and to members of the forum for various bits of code, in particular The Pixie for this interface stuff `+
	`(bits of which originate with Jay Nabonne).<br/><br/>Feel free to use and abuse this in your own games!`+
	`</p></div><script>function setPage(page) {$('#page0').css('display', 'none');`+
	`$('#page1').css('display', 'none');$('#page2').css('display', 'none');`+
	`$('#page3').css('display', 'none');`+
	`$('#page' + page).css('display', 'block');};`+
	`$(document).ready(function () {`+
	`$('#dialog_window_1').dialog({`+
	`autoOpen: false,height: 400,width: 640,buttons: {"Intro": function() { setPage(0);}`+
	`,"Commands": function() { setPage(1);}, `+
	`"Hints": function() { setPage(2);}, "Credits": function() { setPage(3);}, "Done": `+
	`function() { $(this).dialog("close");} }});});</script>`
	$("body").append(dia)
	$("#page0").show()
}

function openHelpDialog(){
	$("#dialog_window_1").dialog("open")
}

function closeHelpDialog(){
	$("#dialog_window_1").dialog("close")
}

function setHelpPageZero(s){
	$("#page0").text(s)
}


function setHelpPageOne(s){
	$("#page1").text(s)
}

function setHelpPageTwo(s){
	$("#page2").text(s)
}
function setHelpPageThree(s){
	$("#page3").text(s)
}




function toBase64(txt){
	return btoa(txt)
}

function fromBase64(txt){
	atob(txt)
}

function getEl(id){
	return document.getElementById(id)
}

function getNav(){
	return window.navigator
}

function getElByAttVal(att,val){
	return $(`[${att}=${val}]`)
}

function setElAttVal(att,val,newVal){
	var el = $(`[${att}=${val}]`)
	el.attr(att,newVal)
	return el
}



function logTest(){
	log("SAY SOMETHING!")
	var response = readline()
	log(response)
}


//function showMenu(title, options, fn) {
  //setTimeout(()=>{$("#input").hide();}, 500)
  //const opts = {article:DEFINITE, capital:true}
  ////parser.overrideWith(fn) // KV added this line so the player can type the answer if that's preferable. // This breaks disambiguation!
  //io.input(title, options, fn, function(options) {
    //for (let i = 0; i < options.length; i++) {
      //let s = '<a class="menu-option" onclick="disableShowMenuLinks();io.menuResponse(' + i + ');$(\'#input\').show();">' //KV added to onclick to hide the menu
      //s += (typeof options[i] === 'string' ? options[i] : lang.getName(options[i], opts))
      //s += '</a>';
      //msg(s);
    //}
  //})
//}

function promptForName(holder="Adventurer") {
  var myName = prompt("Please enter your name", holder)
  if (myName != null) {
    msg("Hello, " + myName + "!")
    game.player.preferredName = myName
  }
}
settings.noConnection = false

function onlineCheck(){
	let el = `<image style="display:none;" class="online-check" src="https://i.imgur.com/WUGXS8yb.png" onerror="setNoConnection();"/>`
	$(el).insertAfter($("#main"))
}

function setNoConnection(){
	settings.noConnection = true
	$(".online-check").remove()
	$("#youtube").remove()
	log("SYSTEM MESSAGE:\nThere is no internet connection. YouTube functionality has been deactivated.")
}

//const isIE = () => {
    //const ua = navigator.userAgent;
    //return ua.indexOf('MSIE') > -1 || ua.indexOf('Trident') > -1;
//};

//For if the game is in an iframe.
//function getGame(){
	//return game
//}

//function getSettings(){
	//return settings
//}

//function getIo(){
	//return io
//}

//function getParser(){
	//return parser
//}

//function getLang(){
	//return lang
//}

//function getWorld(){
	//return world
//}
// END OF maybe the game is in an iframe



// From a different system - untried
//var soundCount = 0;
//function addSound(src,autoplay,sync,loop,controls,callback,id){
	//if (sync && loop){
		//throw ("Attempted to sync and loop the same sound: "+src);
		//return false;
	//}
	//var snd = document.createElement('audio');
	//snd.src = src;
	//if(typeof(id) != "string"){
		//soundCount++;
		//id = "sound-div"+soundCount;
	//}
	//snd.id = id;
	//if(autoplay){
		//snd.autoplay = true;
	//}
	//if(sync){
		//game.syncing = true;
	//}
	//if(loop){
		//snd.loop = true;
	//}
	//snd.load();
	//$("#output").append(snd);
	//if(typeof(callback) == "function"){
		//$("#"+snd.id+"").on("ended",callback);
	//}
	//if (typeof(callback) == "string"){
		//if (callback.startsWith("function::")){
			//$("#"+snd.id+"").on("ended",function(){eval(callback.replace(/function::/,""));});
		//}else{
			//$("#"+snd.id+"").on("ended",function(){msg(callback);});
		//}
	//}
	//if(controls){
		//snd.controls = true;
	//}
//};








// NOTES AND TIPS

//localStorage.setItem("name","Walter")
//localStorage.getItem("name")
//localStorage.removeItem("name")

//sessionStorage has the same functions, but is all deleted when the tab is closed.

//document.cookie = 'name=Walter expires=' + new Date(2022, 0, 1).toUTCString()
//document.cookie = 'name=Walter expires=' + new Date(9999, 0, 1).toUTCString() //never expires




//=====================
//showMenu('What is your favourite color?', ['Blue', 'Red', 'Yellow', 'Pink'], function(result) {
	//msg("You picked " + result + ".");
//});
 
 
//showDropDown('What is your favourite color?', ['Blue', 'Red', 'Yellow', 'Pink'], function(result) {
	//msg("You picked " + result + ".");
//});

