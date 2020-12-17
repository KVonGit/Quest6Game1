"use strict"

settings.versionChanges = [
	"0.2: Minor fixes/additions.",
	
	"0.3: Added mobile browser functionality.",
	
	"0.4: Improved mobile browser functionality.  "+
	"Included 'images/favicon.png' to satisfy Chromium.",
	
	"0.5: Minor CSS changes and other insignificant things.",
	
	"0.6: Added THANKS to settings.",
	
	"0.7: Actually started keeping up with version changes. Fixed issue with UNDO. "+
	"Added a working title: 'A Quest 6 Serial Adventure: ACT I (GAME 1)'  "+
	"Updated RESTART command. "+
	"Added QUIT command. "+
	"Modified HELP command (puts the text in an iframe now).",
	
	"0.8: Switched to QuestJS v0.3.  "+
	"Created my own sub-file-system to easily drop into the default folder(s).  "+
	"Pixie fixed UNDO.  So, I removed my hack.  "+
	"Added functions to make the AGAIN command work to my liking. "+
	"Added a main page (index.html). "+
	"Pixie fixed the icon settings in v0.3 of QuestJS.  So, I removed the hacks to turn them off.  "+
	"Removed the Newsmax TV live YouTube stream from the game.  (Realized some might not get the joke.)",
	
	"0.9: Changed title to 'Quest 6 Adventure 1'.  Added YouTubeAPI",
	
	"0.10: Modified filesystem.",
	
	"0.11: Added fix for OPENABLE_DICTIONARY.close.  (It added extra 'Examine' and 'Open' options to the pane.)",
	
	"0.12: Fixed bug when trying to drop lighter.  "+
	"Added OOPS command.  "+
	"Fixed TAKE ALL's 'nothing to take' response (or lack thereof).  Fixed YouTube display settings for mobile.",
	
	"0.13: Added settings.subtitle, which prints the version number under the title.  "+
	"Added GIVE [npc] [objects] command (GiveNpcStuff).  "+
	"Much thanks to mrangel and Pixie!  "+
	"<br><a href='http://textadventures.co.uk/forum/questkit/topic/y9ky21eopeinmgzuj1tl_g/"+
	"quest-6-messing-around-with-js-regex-group-capture-code' target='_blank'>View the thread on the forum.</a> <br> "+
	"Changed the joiner regex to allow for the Oxford comma. (Check 'settings.joiner_regex'.)",
	
	"0.14: Added dialog element with the id 'dialog_window_1'."+
	"Set TV to play YouTube after first switch on, hopefully to autoplay on mobile.",
	
	"0.15: Changed the way YouTube is created.  "+
	"Added call to play the video on video load (hopefully fixes autoplay in mobile."+
	"Added dumb messages sent via metamsg() if player clicks the version number in the subtitle.",
	
	"0.16: Added objectlink dropdown menu stuff.",
	
	"0.17: Fine-tuned object link stuff.",
	
	"0.18: Moved YouTubeAPI functions from page.html to youTubeAPISetup.js.<br><br>"+
	"Made more changes to object links.",
	
	"0.19: Cleaned up the formatting.  Moved YouTube stuff to its own files.",
	
	"0.20: Added 'no word wrap' to drop down verbs in object links (thanks to Pertex!).<br><br>"+
	"Added onlineCheck, so YouTube will be bypassed if not online.<br><br>"+
	"Added a PRONOUNS command and a setPronouns function.<br><br>"+
	"Added settings.ifid, and changed the way the version info prints.<br><br>"+
	"Removed the RegExp name capture group from the GiveNpcStuff command (for browser compatibility).<br><br>"+
	"Much thanks to Pixie, mrangel, and Pertex for all the help with things fixed in this version!<br><br>"+
	"Moved some files around.",
	
	"0.21: Numerous changes to YouTube functions, to make Save/Load work correctly (or at least to try).",
	
	"0.22: Numerous bug fixes.<br><br>Added online check to postLoad on the TV.<br><br>"+
	"Made item links work for objects in containers and held by npcs."+
	"Moved files around again.",
	
	"0.23: Tweaked objects list stuff.<br><br>Began adding semicolons to my JS.<br><br>"+
	"Switched from turnscript to <code>io.modulesToUpdate</code> to update item-links' verbs.  (Thanks to Pixie!)"
];
