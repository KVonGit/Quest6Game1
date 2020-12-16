"use strict"

//COMMANDS


//NOTE:  The OOPS command is created in mods.js


commands.push(new Cmd('Love', {
  regex:/^(?:love) (.+)$/,
  objects:[
    {scope:parser.isPresent},
  ],
  default:function(item) {
    msg("You declare your love for {nm:item}.", {item:item});
    return false;
  },
}));

commands.push(new Cmd('Enter', {
  regexes:[ /^(?:enter) (.+)$/, /^(?:go|get|step|walk) (?:in|into|inside) (.+)$/ ],
  objects:[
    {scope:parser.isPresent},
  ],
  default:function(item) {
    msg("You can't enter {nm:item:the}.", {item:item});
    return false;
  },
}));

commands.push(new Cmd('Give', {
  regex:/^(?:give) (.+)$/,
  objects:[
    {scope:parser.isHeld},
  ],
  default:function(item) {
    var npcs = scopeAllNpcHere(false)
    if(!npcs.length){ msg("No one around to take anything.");return;}
	//var proceed = confirm("Would you like to choose from a list of possible recipients?")
	var proceed = showMenu("Would you like to choose from a list of possible recipients?", ["Yes","No"], (result) => {
		if(result === "No") {
			msg("The game continues . . .")
			return
		}else{
			showDropDown("To whom would you like to give " + getDisplayAlias(item) + "?", npcs, function(result){
				msg("You chose " + getDisplayAlias(result) + ".")
				$("#textbox").val("give " + getDisplayAlias(item) + " to " + result.alias)
				enterButtonPress()
			})
		}
	})
	
	
	//var choices = ""
	//var a = '<ul id="npc-menu">'+
	//'<li class="ui-state-disabled"><div>Grues (n/a)</div></li>'+
	//'<li><div>NPCs</div>'+
	//'<ul>'+
	//'<li class="ui-state-disabled"><div>NPCs</div></li>'
	//npcs.forEach(npc=>{
		//choices+="<li><div>"+npc.alias+"</div></li>"
	//})
	
	//a+=choices
	//a+='</ul>'+
	//'</li>'+
	//'<li class="ui-state-disabled"><div>Swimsuit models (n/a)</div></li>'+
	//'</ul>'
	//msg("To whom would you like to give {nm:item}?",{item:item})
	//msg(a)
	//$(".ui-menu").attr("width","150px")
	//$( function() {
		//$("#npc-menu" ).menu();
	//} );
	//$( "#npc-menu" ).menu({
		//select: function( event, ui ) {
			////console.log(event);
			//console.log(ui)
			//console.log(ui[0])
			//var result  = ui.item[0].innerText
			//var obj = w[result]
			//console.log(obj)
			//var result = confirm("You picked: " + obj.name + ".")
			//if(!result){metamsg("Cancelled.");}
			//else{
				//msg("You chose Ralph.")
				//$("#textbox").val("give it to " + obj.alias)
				//enterButtonPress()
				////setTimeout(()=>{$("#npc-menu").remove();},2000)
			//}
			//$("#npc-menu").remove()
		//}
	//});
  },
}));

//ADD the GIVE  verb to the lighter!!!

commands.push(new Cmd('Hug', {
  regex:/^(?:hug) (.+)$/,
  objects:[
    {scope:parser.isPresent},
  ],
  default:function(item) {
	  //I am using JS ternary operator for if/else (just for fun)
		var isNpc = (item.npc) ? "{nm:item} might not like that." : "{pv:item:'be:true} not something you should hug.";
		msg (isNpc, {item:item});
    return false;
  },
}));


commands.push(new Cmd('Light', {
  regex:/^(?:light|burn) (.+)$/,
  objects:[
    {scope:parser.isHeld},
  ],
  default:function(item) {
	  msg("You can't do that.");
    return false;
  },
}));



//Homage to the Hitchhiker's game!
commands.push(new Cmd('Enjoy', {
  regex:/^(?:enjoy) (.+)$/,
  objects:[
    {scope:parser.isPresent},
  ],
  default:function(item) {
    if (item.name === "me"){
		msg ("You enjoy yourself.");
	}else{
		msg("You enjoy {nm:item:the}.", {item:item});
	}
    return false;
  },
}));

commands.push(new Cmd('Smoke', {
  regex:/^(?:smoke) (.+)$/,
  objects:[
    {scope:parser.isHeld},
  ],
  default:function(item) {
    msg("You can't do that.");
    return false;
  },
}));


//END OF COMMANDS


//METACOMMANDS

//UPDATED 2020.12.08
commands.push(new Cmd('MetaRestart', {
  regex:/^restart$/,
  script:function() {
    //NOTE:  This command is for everyone accustomed to INFOCOM and/or Inform games.
  
      var result = window.confirm("Do you really want to restart the game?")
      if (result) {
  	    location.reload()
      }
      else{
  		  msg("Wise decision.  Game on!");
      }
      return world.SUCCESS_NO_TURNSCRIPTS;
  },
}));


commands.push(new Cmd('MetaQuit', {
  regex:/^quit$/,
  script:function() {
    //NOTE:  This command is for everyone accustomed to INFOCOM and/or Inform games.
  
      askQuestion('Do you really want to quit the game? {b:[Y/N]}', function(result) {
      if (result.match(/^(y|yes)$/i)) {
			msg("<br>Turns taken: {game.turnCount}<br>Score: {game.score} out of a possible {game.maxScore}<br>");
			msg("THANKS FOR PLAYING!")
			msg("<input type=\"button\" style='color:white;background-color:black'\
			 value=\"CLICK HERE TO PLAY AGAIN!\" onClick=\"window.location.reload(true)\">");
		    io.finish();
	  }else if (result.match(/^(n|no)$/i)){
			msg("Wise decision.  Game on!");
	  }else{
			msg("That wasn't a 'Yes' or a 'No'. So, the game continues!");
	  }
    });
  return world.SUCCESS_NO_TURNSCRIPTS;;
  },
}));


commands.push(new Cmd('MetaPronouns', {
	regex:/^pronouns$/,
	script:function() {
		//NOTE:  This command is for everyone accustomed to INFOCOM and/or Inform games.
		var { it = "is unset", him = "is unset", her = "is unset", them = "is unset", ...leftovers } = parser.pronouns
		it.name ? it = "means " + getDisplayAlias(it, DEFINITE) : it = it
		him.name ? him = "means " + getDisplayAlias(him, DEFINITE) : him = him
		her.name ? her = "means " + getDisplayAlias(her, DEFINITE) : her = her
		them.name ? them = "means " + getDisplayAlias(them, DEFINITE) : them = them
		var s = `{random:At the moment:Right now:Currently:As of this turn}, "it" ${it}, "him" ${him}, "her" ${her}, and "them" ${them}.`
		msg (s)
		// DEBUGGING
		//I don't think "them" is included (as of v 0.3), but I am including this catch anyway.
		if (leftovers.length) {debugmsg("There seem to be unlisted pronouns! Check the console log!");log(leftovers)}
		// END OF DEBUGGING
		return world.SUCCESS_NO_TURNSCRIPTS;;
	},
}));


function msgRestartCmdLink(){
	var lnk = `<a href='javascript:void(0)' onclick='parser.quickCmd(findCmd("MetaRestart"))'>RESTART!</a>`
	msg(lnk)
}

function msgRestartCmdBtn(){
	var lnk = `<button href='javascript:void(0)' onclick='parser.quickCmd(findCmd("MetaRestart"))'>RESTART!</button>`
	msg(lnk)
}

commands.push(new Cmd('GiveNpcStuff', {
	regex:/(?!.* to )^give (\w+?) (.+)$/i,
	rules:[cmdRules.canManipulate, cmdRules.isHeld],
    objects:[
      
      {scope:parser.isPresent, attName: "npc"},  //This one has to go first, or it throws the multiple error.  I don't really know why.
      {scope:parser.isHeld, multiple:true},
    ],
    defmsg:(char,item)=>{return "Char: "+char+" / item: "+item},
	script: function(objects) {
		return handleGiveNpcStuff(game.player, objects)
	},
	default:function(item, isMultiple, char) { 
		if (typeof this.defmsg === "string") {
			failedmsg(prefix(item, isMultiple) + this.defmsg, {char:char, item:item});
		}
		else if (typeof this.defmsg === "function") {
			failedmsg(prefix(item, isMultiple) + this.defmsg(char, item), {char:char, item:item});
		}
		else {
			errormsg("No default set for command '" + this.name + "'.");
		}
		return false;
	},
}))

function handleGiveNpcStuff(char, objects) {
  let success = false;
  const npc = objects[0][0];
  const multiple = objects[1].length > 1 || parser.currentCommand.all;
  if (!npc.npc && npc !== game.player) {
    failedmsg(lang.not_npc_for_give, {char:char, item:npc});
    return world.FAILED; 
  }
  for (let obj of objects[1]) {
    let flag = true;
    if (!char.getAgreement("Give", obj)) {
      // The getAgreement should give the response
    }
    if (npc.testRestrictions) {
      flag = npc.testRestrictions(obj);
    }
    if (!npc.canManipulate(obj, "give")) {
      return world.FAILED;
    }
    if (flag) {
      if (!obj.isAtLoc(char.name)) {
        failedmsg(prefix(obj, multiple) + lang.not_carrying, {char:char, item:obj});
      }
      else {
        if (npc.giveReaction) {
          npc.giveReaction(obj, multiple, char);
        }
        else {
          msg(prefix(obj, multiple) + lang.done_msg);
          obj.moveToFrom(npc.name, char.name);
        }
        success = true;
      }
    }
  }
  if (success === world.SUCCESS) char.pause();
  return success ? world.SUCCESS : world.FAILED;
}
