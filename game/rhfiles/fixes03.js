"use strict"

// BUG FIXES for Quest 6 v 0.3

//============================================================================
//BUG FIX for QJS 0.3 - no message printed when player's command is 'X'

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

//------------
//END OF fix |
//------------


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

//END of FOLLOWING fix
//---------------------


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
		//-----------------------------------------------------------
		//END OF FIX OPENABLE adding duplicate verbs onto pane items|
		//-----------------------------------------------------------
