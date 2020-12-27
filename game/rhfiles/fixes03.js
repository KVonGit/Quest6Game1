"use strict"

// BUG FIXES for Quest 6 v 0.3

//============================================================================
//BUG FIX for QJS 0.3 - no message printed when player's command is 'X'
// Also didn't print anything when object not recognized.  (This may have been due to the EXAMINE fix?)

  parser.convertInputTextToCommandCandidate = function(inputText) {
    //let s = inputText.toLowerCase().split(' ').filter(function(el) { return !IGnored_words.includes(el); }).join(' ');
    
    // remove multiple spaces, and any from the ends
    let cmdString = inputText.toLowerCase().trim().replace(/\s+/g, ' ');
    
    // convert numbers in weords to digits
    if (settings.convertNumbersInParser) {
      cmdString = lang.convertNumbers(cmdString);
    }
    
    // Get a list of candidate commands that match the regex
    const candidates = commands.filter(function(el) {
      if (!Array.isArray(el.regexes)) console.log(el)  // it will crash in the next line!
      for (let regex of el.regexes) {
        if (regex.test(cmdString)) {return true}
      }
    });
    if (candidates.length === 0) {
      parser.msg("There were no candidates.") //KV added this
      msg(lang.not_known_msg)  //KV added this
      return lang.not_known_msg;
    }
    parser.msg("Number of commands that have a regex match:" + candidates.length)

    // We now want to match potential objects
    // This will help us narrow down the candidates (maybe)
    // matchedCandidates is an array of dictionaries,
    // each one containing a command and some matched objects if applicable
    let error = lang.general_obj_error;
    const matchedCandidates = [];
    candidates.forEach(function(el) {
      // matchItemsToCmd will attempt to fit the objects, returns a dictionary if successful
      // or an error message otherwise. Could have more than one object,
      // either because multiple were specified or because it was ambiguous (or both)
      // We just keep the last error message as hopefully the most relevant.
      // NB: Inside function so cannot use 'this'
      parser.msg("* Looking at candidate: " + el.name);
      const res = parser.matchItemsToCmd(cmdString, el);
      if (!res) {
        parser.msg("No result!");
        error = "Res is " + res;
      }
      parser.msg("Result score is: " + res.score);
      if (res.score === -1) {
        error = res.error;
      }
      else {
        parser.msg("Candidate accepted!");
        matchedCandidates.push(res);
      }
    });
    parser.msg("Number of candidates accepted: " + matchedCandidates.length);
    if (matchedCandidates.length === 0) {
      parser.msg("No matches, returning error: " + error);
      msg(error) // KV added this line.  It didn't print anything in-game.
      return error;
    }
    // pick between matchedCandidates based on score
    let command = matchedCandidates[0];
    if (matchedCandidates.length > 1) {
      parser.msg("Need to pick just one; start with the first (score " + command.score + ").");
      for (let candidate of matchedCandidates) {
        // give preference to earlier commands
        if (command.score < candidate.score) {
          parser.msg("This one is better:" + command.cmd.name + " (score " + candidate.score + ")");
          command = candidate;
        }
      }
    }
    if (!command) console.log(inputText)
    command.string = inputText;
    command.cmdString = cmdString;
    parser.msg("This is the one:" + command.cmd.name);
    return command;
  };


//================================================
//BUG FIX NPC 'following' agenda issue in QuestJS v0.3

world.enterRoomAfterScripts =function() {
    game.room.description();
    for (let follower of game.player.followers) {
      //debugmsg("here1") // KV commented this line out
      if (follower.loc !== game.room.name){ // KV added this IF statement to stop erratic behaviour with followers 
		   follower.moveWithDescription(game.room.name)  //  This line was here, but not inside of an IF statement!  
	  }  // KV added this IF statement to stop erratic behaviour with followers 
      //debugmsg("here2") // KV commented this line out
    }
    game.room.afterEnter();
    if (game.room.visited === 0) { game.room.afterFirstEnter(); }
    for (let key in game.room.afterEnterIf) {
      // if already done, skip
      if (game.room.afterEnterIfFlags.split(" ").includes(key)) continue;
      if (game.room.afterEnterIf[key].test()) {
        game.room.afterEnterIf[key].action()
        game.room.afterEnterIfFlags += " " + key
      }
    }
    game.room.visited++;
};



lang.conjugations.it = [
      { name:"be", value:"is"},
      { name:"is", value:"is"}, // Added by KV
      { name:"have", value:"has"},
      { name:"can", value:"can"},
      { name:"mould", value:"moulds"},
      { name:"*ould", value:"ould"},
      { name:"must", value:"must"},
      { name:"don't", value:"doesn't"},
      { name:"can't", value:"can't"},
      { name:"won't", value:"won't"},
      { name:"cannot", value:"cannot"},
      { name:"@n't", value:"n't"},
      { name:"'ve", value:"'s"},
      { name:"'be", value:"'s"},
      { name:"*ay", value:"ays"},
      { name:"*uy", value:"uys"},
      { name:"*oy", value:"oys"},
      { name:"*ey", value:"eys"},
      { name:"*y", value:"ies"},
      { name:"*ss", value:"sses"},
      { name:"*s", value:"sses"},
      { name:"*sh", value:"shes"},
      { name:"*ch", value:"ches"},
      { name:"*o", value:"oes"},
      { name:"*x", value:"xes"},
      { name:"*z", value:"zes"},
      { name:"*", value:"s"},
    ];

  
function handlePutInContainer(char, objects) {
  let success = false;
  const container = objects[1][0];
  const multiple = objects[0].length > 1 || parser.currentCommand.all;
  const tpParams = {char:char, container:container}
  if (!container.container) {
    failedmsg(lang.not_container, {char, container}); // Altered by KV
    return world.FAILED; 
  }
  if (container.closed) {
    failedmsg(lang.container_closed, tpParams);
    return world.FAILED; 
  }
  if (!char.canManipulate(objects[0], "put")) {
    return world.FAILED;
  }
  for (let obj of objects[0]) {
    let flag = true;
    if (!char.getAgreement("Put/in", obj)) {
      // The getAgreement should give the response
      continue;
    }
    if (!container.testForRecursion(char, obj)) {
      flag = false;
    }
    if (container.testRestrictions) {
      flag = container.testRestrictions(obj, char);
    }
    if (flag) {
      if (!obj.isAtLoc(char.name)) {
        failedmsg(prefix(obj, multiple) + lang.not_carrying, {char:char, item:obj});
      }
      else {
        obj.moveToFrom(container.name, char.name);
        msg(prefix(obj, multiple) + lang.done_msg);
        success = true;
      }
    }
  }
  if (success === world.SUCCESS) char.pause();
  return success ? world.SUCCESS : world.FAILED;
}


//-------------------------------------------------------------------
// BUG FIX QJS 0.3 - OPENABLE adding duplicate verbs onto pane items|
//-------------------------------------------------------------------
		
		OPENABLE_DICTIONARY.close = function(isMultiple, char) {
		    const tpParams = {char:char, container:this}
		    if (!this.openable) {
		      msg(prefix(this, isMultiple) + lang.cannot_close, tpParams);
		      return false;
		    }
		    else if (this.closed) {
		      msg(prefix(this, isMultiple) + lang.already, {item:this});
		      return false;
		    }
		    //this.hereVerbs = ['Examine', 'Open']; //KV commented out to fix bug.
		    this.closed = true;
		    this.closeMsg(isMultiple, tpParams);
		    if (this.onClose) this.onClose(char)
		    return true;
	    };

      //MOD 2020.12.23
      lang.npcEnteringMsg = function(npc, origin) {
        if (game.dark) return; // ADDED BY KV
        let s = "";
        let flag = false;
        if (w[game.player.loc].canViewLocs && w[game.player.loc].canViewLocs.includes(npc.loc)) {
          // Can the player see the location the NPC enters, from another location?
          s = w[game.player.loc].canViewPrefix;
          flag = true;
        }
        if (flag || npc.inSight()) {
          s += lang.nounVerb(npc, "enter", !flag) + " " + lang.getName(w[npc.loc], {article:DEFINITE});
          const exit = w[npc.loc].findExit(origin);
          if (exit) s += " from " + util.niceDirection(exit.dir);
          s += ".";
          msg(s);
        }
      };