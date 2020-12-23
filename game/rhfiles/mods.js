"use strict"
	
lang.turn_on_successful = "<span class='switchon'>{nv:char:switch:true} {nm:item:the} on.</span>";
//lang.turn_off_successful = "{nv:char:switch:true} {sb:item} off.";
lang.inside = "inside";
lang.on_top = "on top";
lang.carrying = "carrying";
lang.contentsForData.surface.prefix = 'on which you see ';
lang.contentsForData.surface.suffix = '';
//lang.open_successful = "{nv:char:open:true} {sb:container}.";
//lang.open_successful = "Done.";
//lang.close_successful = "Done.";
lang.look_inside = "Inside {nm:container:the}, {nv:char:can} see {param:list}.";
//lang.look_inside = "Inside, {nv:char:can} see {param:list}.";
//lang.take_successful = "Taken.";
//lang.drop_successful = "Dropped.";


findCmd("LookInside").regex = /^(?:x in|x inside|examine in|examine inside|look in|look inside) (.+)$/;

findCmd("MetaCredits").script = function(){lang.aboutScript()};
lang.aboutScript = function() {
	let s = "{b:{param:settings:title}}<br/>"+
	//"{param:settings:subtitle}"+
	" by {param:settings:author}"+
	"<small><br/>Release {param:settings:version} / Quest 6 build {param:settings:questVersion}"+
	"<br/>Identification number: {param:settings:ifid}</small>";
    metamsg(s, {settings:settings});
    if (settings.thanks && settings.thanks.length > 0) {
      var thanks = "Thanks to " + formatList(settings.thanks, {lastJoiner:lang.list_and}) + ".";
	  msg(thanks);
    }
    if (settings.additionalAbout !== undefined) {
      for (let s of settings.additionalAbout) metamsg(s)
    }
    return world.SUCCESS_NO_TURNSCRIPTS;
};


//MODIFY 'ABOUT' COMMAND (add 'info' and 'information')
findCmd("MetaCredits").regexes = [/^info$|^information$|^about$|^credits?$|^version$/];

//Put HELP in an iframe
findCmd("MetaHelp").script = function(){
	msg("<iframe style='width:75%' class='helpDiv'/>");
	setTimeout(function(){
		$('.helpDiv:last-child').contents().find('body').html(processText(settings.helpMsg));
	}, 500);
};


settings.helpMsg = "Type commands in the command bar to interact with the world. Using the arrow\
 keys you can scroll up and down though your previous commands."+     
"<br><br>{b:Movement:} To move, use the eight compass directions (or just 'n', 'ne', etc.).\
Up/down and in/out may be options too. When \"Num Lock\" is on, you can use the number pad for\
all eight compass directions, - and + for UP and DOWN, / and * for IN and OUT."+
"<br><br>{b:Other commands:} You can also LOOK (or just L or 5 on the number pad), HELP (or ?)\
or WAIT (or Z or the dot on the number pad). Other commands are generally of the form GET HAT or\
PUT THE BLUE TEAPOT IN THE ANCIENT CHEST. Experiment and see what you can do!"+
"<br><br>{b:Using items: }You can use ALL and ALL BUT with some commands, for example TAKE ALL,\
and PUT ALL BUT SWORD IN SACK. You can also use pronouns, so LOOK AT MARY, then TALK TO HER.\
The pronoun will refer to the last subject in the last successful command,\
 so after PUT HAT AND FUNNY STICK IN THE DRAWER, 'IT' will refer to the funny stick\
  (the hat and the stick are subjects of the sentence, the drawer was the object)."+
"<br><br>{b:Characters: }If you come across another character, you can ask him or her to do something.\
Try things like MARY,PUT THE HAT INTHE BOX, or TELL MARY TO GET ALL BUT THE KNIFE.\
Depending on the game you may be able to TALK TO a character, to ASK or TELL a character ABOUT a topic,\
 or just SAY something and they will respond.."+
"<br><br>{b:Meta-commands:} Type ABOUT to find out about the author, SCRIPT to learn about transcripts or SAVE\
to learn about saving games. Use WARNINGS to see any applicable sex, violence or trigger warnings."+
"<br><br>You can also use BRIEF/TERSE/VERBOSE to control room descriptions.\
Type DARK to toggle dark mode or SILENT to toggle sounds and music (if implemented)."+
"<br><br> Use MAP to toggle/show the map."+
"<br><br> Use IMAGES to toggle/show the image pane."+
"<br><br>{b:Shortcuts:}You can often just type the first few characters of an item's name\
and Quest will guess what you mean.  If fact, if you are in a room with Brian,\
who is holding a ball, and a box,\
 Quest should be able to work out that B,PUT B IN B mean you want Brian to put the ball in the box."+
"<br><br>You can use the up and down arrows to scroll back though your previous commands - \
especially useful if you realise you spelled something wrong."+
"<br><br>{b:User Interface:} To interact with an object, click on its name in the side pane,\
and a set of possible actions will appear under it. Click on the appropriate action."+
"<br><br>You can also use the compass rose at the top to move around.\
Click 'Lk' to look at you current location, 'Z' to wait or '?' for help.";


//MODIFIED FUNCTIONS SECTION!!!


//For QJS 0.3
//Make parser understand the Oxford comma!
lang.joiner_regex = /\b\, and\b|\,|\band\b/;


//Make clicked commands add to list history (to fix AGAIN cmd)
io.cmdlink = function(command, str) {
  return `<a class="cmd-link" onclick="parser.parse('${command}');clickedCmdLink('${command}');">${str}</a>`;
};

//Make clicked "exits" add to list history (to fix AGAIN cmd)
io.clickExit = function(dir) {
  if (io.inputIsDisabled) return;

  let failed = false;
  $("#textbox").val(dir);
  enterButtonPress();
};


//Make clicked "actions using side pane items" add to list history (to fix AGAIN cmd)
io.clickItemAction = function(itemName, action) {
  if (io.inputIsDisabled) return;

  const item = w[itemName];
  action = action.split(' ').map(el => sentenceCase(el)).join('');
  const cmd = io.getCommand(action);
    $("#textbox").val(findCmd(action).name.replace(/([A-Z])/g, ' $1').trim() + " " + item.alias);
    enterButtonPress();
};




//KV MODDED TAKE for TAKE ALL

findCmd('Take').script2 = findCmd('Take').script;

findCmd('Take').script = function(objects,matches){
	let success = false;
	if (objects[0].length < 1 && parser.currentCommand.all) {
		//Tried to TAKE ALL when there is nothing to take!
		var verbUsed = parser.currentCommand.cmdString.replace(/ .*/,'').toLowerCase();
		metamsg("There is no ALL to "+verbUsed+"!");
		success =  false;
	}else{
		success = findCmd('Take').script2(objects,matches);
	}
	return success ? world.SUCCESS : world.FAILED;
};

//===========
// Add OOPS |
//===========

parser.commandHistory = []; //KV added for modded parser functions
parser.enteredCmdArr = []; //KV added for modded parser functions


//  KV MODIFIED this function to allow OOPS (and to generally keep histories of commands)
  parser.parse = function(inputText) {
    parser.msg("Input string: " + inputText);
    parser.enteredCmdArr.push(inputText); //KV added to keep entered command history
    // This allows the command system to be temporarily overriden,
    // say if the game asks a question
    if (parser.override) {
      parser.msg("Parser overriden");
      parser.override(inputText);
      delete parser.override;
      return;
    }
    
    if (inputText) {
      const res = parser.convertInputTextToCommandCandidate(inputText);
      if (typeof res === "string") {
        parser.msg(res);
        world.endTurn(world.PARSER_FAILURE);
        return;
      }
      parser.commandHistory.push(parser.currentCommand); //KV added to keep command history
      parser.currentCommand = res;
    }
    
    // Need to disambiguate, until each of the lowest level lists has exactly one member
    let flag = false;
    for (let i = 0; i < parser.currentCommand.objects.length; i++) {
      for (let j = 0; j < parser.currentCommand.objects[i].length; j++) {
        if (parser.currentCommand.objects[i][j] instanceof Array) {
          if (parser.currentCommand.objects[i][j].length === 1) {
            parser.currentCommand.objects[i][j] = parser.currentCommand.objects[i][j][0];
          }
          else {
            flag = true;
            parser.currentCommand.disambiguate1 = i;
            parser.currentCommand.disambiguate2 = j;
            showMenu(lang.disambig_msg, parser.currentCommand.objects[i][j], function(result) {
              parser.currentCommand.objects[parser.currentCommand.disambiguate1][parser.currentCommand.disambiguate2] = result;
              parser.parse(null);
            });
          }
        }
      }
    }
    if (!flag) {
		
      parser.execute();
 
		parser.lastCmdWasExecuted = true; //KV added for OOPS
		parser.Unfound = false; //KV added for OOPS
		parser.failedCmd = false; //KV added for OOPS
    }
  };
 
//  KV MODIFIED this function to allow OOPS (and to generally keep histories of commands)
  parser.matchItemsToCmd = function(s, cmd) {
    const res = {cmd:cmd, objectTexts:[], objects:[], matches:[]};
    res.score = cmd.score ? cmd.score : 0;
    
    const arr = cmd.regexes.find(el => el.test(s)).exec(s);
    //for (let regex of el.regexes) {
    //  if (regex.test(cmdString)) arr = regex.exec(s)
    //}
    //console.log(arr)
    
    const fallbackScope = parser.scope(parser.isVisible);
        //if(arr.length>1) {
		//console.log(arr)
		parser.msg("Testing...");
		
		//}
    arr.shift();  // first element is the whole match, so discard
	//console.log(arr)
    parser.msg("..Base score: " + res.score);

    for (let i = 0; i < arr.length; i++) {
      if (!cmd.objects[i]) {
        //console.log(cmd)
        //console.log(cmd.objects)
        errormsg("That command seems to have an error. It has more capture groups than there are elements in the 'objects' attribute.");
        return false;
      }
      if (cmd.objects[i].ignore) {
        // this capture group has been flagged to be ignored
        continue;
      }
      let objectNames, score = 0;
      res.objectTexts.push(arr[i]);
      if (cmd.objects[i].text) {
        // this capture group has been flagged to be text
        res.objects.push(arr[i]);
        score = 1;
      }
      
      else if (lang.all_regex.test(arr[i]) || lang.all_exclude_regex.test(arr[i])) {
        // Handle ALL and ALL BUT
        if (!cmd.objects[i].scope) console.log("WARNING: Command without scope - " + cmd.name)
        let list = cmd.objects[i].scope ? parser.scope(cmd.objects[i].scope) : fallbackScope;
        let exclude = [game.player];
        
        // anything flagged as scenery should be excluded
        for (let item of list) {
          if (item.scenery || item.excludeFromAll) {
            exclude.push(item);
          }
        }
        
        if (list.length === 0) {
          res.error = cmd.nothingForAll ? cmd.nothingForAll : lang.nothing_msg;
          res.score = -1;
          return res;
        }
        if (lang.all_exclude_regex.test(arr[i])) {
          // if this is ALL BUT we need to remove some things from the list
          // excludes must be in isVisible
          // if it is ambiguous or not recognised it does not get added to the list
          let s = arr[i].replace(all_exclude_regex, "").trim();
          objectNames = s.split(joiner_regex).map(function(el){ return el.trim(); });
          for (let s in objectNames) {
            items = parser.findInList(s, fallbackScope);
            if (items.length === 1) {
              exclude.push(items[0]);
            }
          }
        }
        list = list.filter(function(el) { return !exclude.includes(el); });
        //KV removed next block because this seems to want the NPC to have multiple setup by default?
        //TODO  maybe this affects CONTAINERS ???
        if (list.length > 1 && !cmd.objects[i].multiple) {
          //console.log(list)
          //console.log(cmd)
          //console.log(cmd.objects[i]) //This is the npc.
          res.error = lang.no_multiples_msg;
          res.score = -1;
          return res;
        }
        score = 2;
        res.objects.push(list.map(function(el) { return [el]; }));
        res.matches.push(arr[i]);
        res.all = true;
      }
      
      else {
        objectNames = arr[i].split(lang.joiner_regex).map(function(el){ return el.trim() });
        //KV removed next block because this seems to want the NPC to have multiple setup by default?
        //TODO  maybe this affects CONTAINERS ???
        if (objectNames.length > 1 && !cmd.objects[i].multiple) {
          //console.log(cmd)
          //console.log(cmd.objects[i]) //This is the npc
          res.error = lang.no_multiples_msg;
          res.score = -1;
          return res;
        }
        if (!cmd.objects[i].scope) console.log("WARNING: No scope (or scope not found) in command " + cmd.name)
        let scopes = cmd.objects[i].scope ? [parser.scope(cmd.objects[i].scope), fallbackScope] : [fallbackScope];
        //console.log(scopes)
        
        let objs = [], matches = [];
        let objs2, n;
        for (let s of objectNames) {
          const objNameMatch = lang.article_filter_regex.exec(s);
          if (objNameMatch === null) {
            errormsg("Failed to match to article_filter_regex with '" + s + "', - probably an error in article_filter_regex!");
            return null;
          }
          [objs2, n] = this.findInScope(objNameMatch[1], scopes, cmd.objects[i]);
          if (n === 0) {
			  //console.log("KV says: unfound object (s) set to parser.unFound!") //KV added for OOPS
			  parser.unFound = s; // KV added for OOPS
			  parser.lastCmdWasExecuted = false; //KV added for OOPS
			  parser.failedCmd = cmd;  //KV added for OOPS
            res.error = cmd.noobjecterror(s);
            res.score = -1;
            return res;
          }
          else {
            if (n > score) { score = n; }
            objs.push(objs2);
            matches.push(s);
          }
        }
        res.objects.push(objs);
        res.matches.push(matches);
      }
      parser.msg("...Adding to the score: " + score);
      res.score += score;
    }
    return res;
  };

//=============
// OOPS command 
//-------------
//  Added by KV
// 
//  I believe an  OOPS command is essential.
//
//  Even if the player is not using a mobile browser,
//  it's still nice to be able to enter OOPS RALPH after
//  accidentally entering GIVE GREEN LASER SWORD TO ALPH.
//
//  Even with a full keyboard and the up arrow, the player
//  would still have to edit existing text.  OOPS is much easier.
//
//  TODO:  Should OOPS handle commands with no objects?
//
//
//  REQUIREMENTS!
//  -------------
//
//  My modded 'parser.matchItemsToCmd' and 'parser.parse' functions.
//
//  A new array: parser.commandHistory
//  Another new array:  parser.enteredCmdArr
//
//==========================================

commands.push(new Cmd('Oops', {
  regex:/^(?:oops) (.+)$/,
  objects:[
    {scope:parser.isPresent},
  ],
  default:function(item) {
	if (parser.lastCmdWasExecuted) {
		metamsg("There is nothing to correct.");
		return false;
	}
	parser.quickCmd(parser.failedCmd,item);
	return true;
  },
}));

//==================
// END OF Add OOPS    |
//==================

//KV added this function to make life simple.
function getLastCmd(){
	return parser.commandHistory[parser.commandHistory.length - 1];
}

function getCurrentCmd(){
	return parser.currentCmd;
}

//KV added this function to make life simple.
function getLastEnteredCmd(){
	return parser.enteredCmdArr[parser.enteredCmdArr.length-2];
}


//END OF MODIFIED FUNCTIONS

