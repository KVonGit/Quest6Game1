"use strict"

const log = console.log;
const debuglog = (s) => { if(settings.playMode === 'dev' || settings.playMode === 'meta'){ log(s)} };
const parserlog = (s) => { if(parser.debug){ log(s)} };
const debuginfo = (s) => { console.info(s) };

settings.title = "Quest 6 Adventure 1";
settings.author = "Richard Headkid";
settings.version = "0.23";
settings.warnings = "ADULT LANGUAGE | VIOLENCE | TOBACCO, DRUG, & ALCOHOL USE | TRIGGER WARNINGS: ALL";
settings.ifid = "879d6c2b-1fe5-4c78-b9f5-579de6310ec6";
settings.serialNumber = "201202";
settings.genre = "Absurdist Fiction";
settings.firstPublished = "2020-12-12";


//Set the next line to play, dev, or beta
//Default is 'play'
settings.playMode = 'dev'; //Set to "play" before release!!!


settings.subtitle = "<small style='color:gray;cursor:pointer;' onclick='clickedVersion()' title='THANKS FOR PLAYING!'><u><i>VERSION "+settings.version+"</i></u></small><hr/>"

settings.iconsFolder = false;  // false: turns off the icons in the panes

settings.linksEnabled = true;
//========================================
//Backup setting.files to filesBak variable
var filesBak = settings.files;

//Add my files to the existing file array
filesBak = filesBak.concat([
	"rhfiles/fixes03",
	"rhfiles/quest5stuff",
	"rhfiles/mods",
	//"rhfiles/youTubeAPISetup",  // Loaded at the end of page.html
	"rhfiles/youTubeLib",
	"rhfiles/objectLinksLib",
	"rhfiles/rooms",
	"rhfiles/items",
	"rhfiles/npcs",
	"rhfiles/newcmds",
	"rhfiles/rhTurnscripts",
	"rhfiles/rhfunctions",
	"rhfiles/cardGames",
	"rhfiles/versionChanges"
]);

//Set the modified array as settings.files
settings.files = filesBak;

//>>>>>>>>>>>>>>>>>>>>===<<<<<<<<<<<<<<<<<<<<<<


//settings.linksEnabled = true

settings.lookCountsAsTurn = true

settings.oxfordComma = true



//==================
// This is in objectLinksLib.js!
//
//settings.roomTemplate = [
  //"{hereDesc}",
  //"{objectsHere:You can see {objectsLinks} here.}",
  //"{exitsHere:You can go {exits}.}",
//]
var noArr = settings.libraries
//====================================================

settings.intro = "<h1 id='loading-el'>Loading . </h1>"


settings.setup = function(){
		//Set up my CSS style sheet
		$('html').append('<link rel="stylesheet" href="' + settings.folder + 'rhfiles/rhstyle.css"/>');
		
		//======================
		//Setup scoring
		
		game.score = 0;
		game.maxScore = 19;
		
		//-----------------------
		
		//=======================
		//Make a status bar! (It updates via turnscript.)
		
		$('#output').css('padding-top','14px');  //Make room for the status bar
		var div = "<div style='border:1px solid black;padding:4px;margin-bottom:4px;"+
			"color:white;background:black;position:fixed;top:0%;"+
			"box-shadow:0px 0px 12px gray;width:42%;z-index:999;' id='status'><br></div>";
		msg(div);
		var s = "Health: "+game.player.hitpoints.toString()+" | Turns taken: "+game.turnCount.toString()+
			"  | Score: "+game.score.toString()+"/"+game.maxScore.toString()+"<br>";
		$("#status").html(s);
		
		//-----------------------
		
		
		//=======================
		// Make Ralph follow me correctly from the beginning.
		
		w.Ralph.setLeader(game.player);
		
	    //Ralph's agenda doesn't seem to run until the second turn, and he is in the first room on the first turn.
	    //This makes him immediately begin to follow the player.

		//-----------------------
	
		//I don't even use this (yet).
		//setUpHelpDialog()

		//================================================
		//Set the YouTube player div
		
		settings.youTubeElem = function(){return $("#youtube")};

		//-------------------------------------------------
		
		
		//Don't spread the Rona!!!
		ronaSpread();
		
		//-------------------
		
		//BUG FIX for QJS 0.3
		io.textColour = "white" //FIXES issue with side pane color changing to black during io.disable.
		
		setTimeout(()=>{
			$("#loading-el").html($("#loading-el").html() + " . ")
			setTimeout(()=>{
				$("#loading-el").html($("#loading-el").html() + " . ")
				setTimeout(()=>{
					$("#loading-el").remove();},1000)
			}, 2000)
		}, 2000)
		wait(6)
		
		onlineCheck()

		//// Stop game if not playing in iframe from play.html!
		//if(self === top) {
			//log(top)
			 //log("NOT IFRAME!");
			 //msg("You must play the game from play.html!")
			 //setTimeout(() => {
				 //clearScreen()
				 //msg("INVALID ACCESS")
				 //msg("GAME OVER")
				 //$("#input").hide()
				 //io.finish()
			 //}, 8000)
		//}
		
		// Clone objects in this code block, if applicable.
		
		//parser.debug = true
		//settings.debugItemLinks = true

};


settings.thanks = ["<a href='https://textadventures.co.uk/user/view/_O1rjdv47U2x-bATbXE_tw/the-pixie'\
 target='_blank'>Pixie</a>, and everyone else who pitched in on <a href='https://github.com/ThePix/QuestJS/wiki'\
  target='_blank'>Quest 6 AKA QuestJS</a>!\
  <br><br>Thanks to <a href='http://textadventures.co.uk/user/view/emxhs1hs8uaib5hfblmp4a/xanmag'\
   target='_blank'>XanMag</a> for being ...well... generally just for being XanMag (and such a good sport)!\
   <br><br>Thanks to <a href='http://textadventures.co.uk/user/view/15sc1UtrKE_AtrcyYd1vOw/mrangel'>mrangel\
   </a> for all the help with the code!\
   <br><br>For a list of version changes, \
   <a id='fake-link-1' href='javascript:void(0)' onclick='printVersionChanges();$(this).parent().remove();'>CLICK HERE</a>"]
   let setNo = ()=>{noArr.push('.nowhere/.nowhere')};setNo()
const walkthroughs = {
  a:[
    "u", "u", "open fridge", "get beer", "e", "give lighter to xm", "light cig", "give beer to xan",
  ]
}


