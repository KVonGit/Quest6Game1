"use strict"



var desc = "In this small text adventure, you and your trusty sidekick (Ralph) "+
    "need to look around and interact with things (and XanMag) until you figure out what to do."+
    "<br/><br/>It's pretty straightforward.  It's really just to test out the new version of Quest."+
    "<br/><br/><center>(Click on CREDITS at the bottom of this page for more info!)</center>";
    

(function(){
	$("#game-desc").html(desc);
	$("#contact-link").attr("href","http://textadventures.co.uk/user/view/gudejtsx9komagj-tffyfg/richard-headkid")
	$("#title").html(settings.title)
	$("#version").html("by " + settings.author)
	$("#version").html("Version " + settings.version)
	$("#ifid").html("Identification number: " + settings.ifid)
})();

    
function myFunction() {
    $("#demo").html(thxTxt);
}

let thxTxt = "<big><b>CREDITS</b></big><br /><br />"+
	"The main game was created with <a href='https://github.com/ThePix/QuestJS/wiki' target='_blank'>"+
	"Quest 6 AKA QuestJS</a>."+
	//"<br /><br />The HINTS & CLUES menu was "+
	//"created with <a href='https://twinery.org' target='_blank'>Twine</a>."+
	"<br />I learned how to code this "+
	"page by studying up at <a href='https://www.w3schools.com' target='_blank'>www.w3schools.com</a>."+
	"<br /><br/>"+
	"Don't forget those who make these games available to the public AT NO CHARGE:<br />"+
	"<a href='http://textadventures.co.uk/' target='_blank'>TEXTADVENTURES.CO.UK</a><br />"+
	"<a href='http://ifdb.tads.org/' target='_blank'>IFDB</a><br />"+
	"<a href='http://ifarchive.org/' target='_blank'>IFArchive</a><br /><br />"+
	"This game is a work of fiction.<br />Any names, characters, businesses, places, events,"+
	" incidents, products, spells, weapons, talking animals, magikal things, and non-magikal things"+
	" are purely fictitious. Any resemblance to actual persons, living or dead, or actual businesses,"+
	" places, events, incidents, products, spells, weapons, talking animals, magikal things, or non-magikal"+
	" things is purely coincidental.<br /><br />Ralph the penguin was created by an author friend of mine,"+
	" and appears in this game with his consent.<br /><br />"+
	"<strong>SPECIAL THANKS TO:</strong><br /><br />LUKE A. JONES, ANDREW PLOTKIN (AND ASSOCIATES),"+
	" EMILY SHORT (AND ASSOCIATES), THE PIXIE, MRANGEL, XANMAG, AND EVERYONE AT TEXTADVENTURES.CO.UK "+
	"(EXTRA SPECIAL THANKS TO LUIS FELIPE MORALES), CHRIS KLIMAS (AND ASSOCIATES), "+
	"STEVE MERETZKY (AND ASSOCIATES, AND EVERYONE WHO EVER WORKED FOR INFOCOM), EVERYONE AT IFDB, "+
	"EVERYONE AT IFARCHIVE (EXTRA SPECIAL THANKS TO DOUG),<br /><br />"+
	"<big>AND AN ESPECIALLY BIG THANKS TO: PLAYERS LIKE YOU!</big></p>"+
	"<a href='#thetopofthepage'><br />BACK TO TOP</a>";
