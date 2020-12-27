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
	msg("<iframe style='width:75%' class='versionDiv'/>");
	setTimeout(function(){
		$('.versionDiv:last-child').contents().find('body').html(`<u>VERSION CHANGES</u><br><br>`+s);
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

// NOTE: getAlias is not used by any function in this library.
function getAlias(obj){
	return obj.alias || obj.name
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

// Currently unused
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

// Unused
function promptForName(holder="Adventurer") {
  var myName = prompt("Please enter your name", holder)
  if (myName != null) {
    msg("Hello, " + myName + "!")
    game.player.preferredName = myName
  }
}
settings.noConnection = false

// For YouTube
function onlineCheck(){
	let el = `<image style="display:none;" class="online-check" src="https://docs.textadventures.co.uk/quest/images/logo.png" onerror="setNoConnection();" onload="$(this).remove();"/>`
	$(el).insertAfter($("#main"))
}

// For YouTube
function setNoConnection(){
	settings.noConnection = true
	$(".online-check").remove()
	$("#youtube").remove()
	console.log("SYSTEM MESSAGE:\nThere is no internet connection. YouTube functionality has been deactivated.")
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

// UNUSED
function hasGrandchildren(obj){
	let grandparent = false;
	let kids = obj.getContents(obj);
	if (!kids) return false;
	kids.forEach(kid => {
		if (kid.getContents) grandparent = true;
	})
	return grandparent;
}

function eatenByAGrue(){
	clearScreen();
	// disable all links!
	msg (`You have been eaten by a grue.<br><br>
	<h3>YOU ARE DEAD.</h3>`)
	io.finish()
}

function reportBug(s){
	let urlLink = `https://github.com/KVonGit/Quest6Game1/issues/new?title=Found%20a%20bug&body=bar`;
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

const quIco = `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`;
