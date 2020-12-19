"use strict"

createItem("table", SURFACE(), {
	loc:"cellar",
	examine:(...params)=>{
		msg("A wooden table.");
		handleExamineHolder(params)
	}
})

createItem("Grue_Bot_5000", NPC(false), SURFACE(), CONTAINER(), TAKEABLE(), SWITCHABLE(), {
	loc:"table"
})


//findCmd("LookAt").script1 = findCmd("LookAt").script;
//findCmd("LookAt").script = function(objects,matches){
	//log("RUNNING")
	//log(objects)
	//log(matches)
	//findCmd("LookAt").script1(objects, matches)
	//return // Else this creates an infinite loop!
//}

createItem("box", TAKEABLE(), CONTAINER(true), {
	loc:"table",
	closed:false,
	examine:(...params)=>{
		msg("A cardboard box, currently {if:box:closed:closed:open}.");
		handleExamineHolder(params)
	}
})

createItem("doohickey", TAKEABLE(), {
	loc:"box"
})

// Carried by the player

createItem("cigarette",TAKEABLE(),{
	loc:"me",
	examine:"A Roll-Your-Own cigarette.",
	lit:false,
	drop:"No way!  It's your last one!{if:cigarette:lit:  Besides, you'd start a fire.}",
	light:function(){
	  if (this.lit){
		msg("It's already lit.");  
	  }else if(w.purple_lighter.broken === false && w.purple_lighter.isHeld){
		  if (w.mask.worn===true && w.mask.loc==="me"){
			  msg("You can't.  Your mask is on.");
		  }else{
			  msg("Done.");
		      if (w.Ralph.isHere()){
			      msg("\"That shit'll kill ya',\" says Ralph.");
		      }
		      this.lit = true;
		      game.score += 5;
		      msg("{b:[YOUR SCORE HAS INCREASED BY 5]}");
		 }
	  }else{
		msg("You have no flame.");  
	  }	
	},
	smoke:function(){
		if(w.mask.worn){
			msg("You've got your mask on.");
		}else if (!w.mask.worn && !w.cigarette.lit){
			msg("It isn't lit.");
		}else{
			msg("You take a drag.{once:  It's an old cigarette, and it's very harsh.}");
			game.player.hitpoints -= 20;
		}
	},
	enjoy:function(){ this.smoke(); },
});

createItem("purple_lighter", TAKEABLE(), { 
  loc:"me",
  broken:true,
  examine:"A purple lighter.",
  use:function(){
	  this.light()
  },
  light:function(){
	  if (this.broken){
		  msg ("It doesn't seem to work.");
	  }else{
		  msg ("You flick your Bic.  The flame relaxes you.");
	  }
  },
  onMove:function(toLoc, fromLoc) {
      if (toLoc === w.XanMag.name) {
		if(this.broken){
			msg("Done.<br><br>XM fiddles with the lighter, flicks it once, and it miraculously lights!\
			<br><br>\"Here you go,\" XanMag smiles, handing it back to you.");
			game.score += 4;
			msg("{b:[YOUR SCORE HAS INCREASED BY 4]}");
		    this.broken = false;
	    }else{
	      msg("XM says, \"no thanks.  I've got my own.  Here.  Have this back.\"");  
	    }
	  }
	  if (w.purple_lighter.loc===w.XanMag.name){w.purple_lighter.moveToFrom("me",w.purple_lighter.loc);}
  },
});


createItem("mask",WEARABLE(),{
	loc:"me",
	examine:"Your cloth face covering.",
});



// Cellar items

createItem("TV", SWITCHABLE(false), {
	loc:"cellar",
	examine:"An ordinary TV, currently{if:TV:switchedon: tuned to Quest TV: switched off}.<br><br>The remote is not here.\
	  So, all you can do is switch it on or off.",
	onSwitchOn:function(){
		onlineCheck()
		w.TV.switchedOnTimes++;
		msg("XM has it on Quest TV, and he has hidden the remote.");
		if (settings.noConnection){
			return
		}
		let vid = getYouTubeIdByTitle("It is pitch dark")
		if (!w.TV.switchedOnTimes){
			w.TV.loadingSave = false
			w.TV.switchedOnTimes = 0;
			createYouTube(vid,390,640,{ 'playlist': [vid, '7vIi0U4rSX4'],
									'autoplay': 1,
									'loop':1,
									'rel':0 });
		}else{
			var cvid;
			cvid  = getYouTubeCurrentId();
			if (cvid !== vid ){
				loadYouTubeVideoById(vid);
				//playYouTube()
			}else{
				playYouTube();
				showYouTube();
			}
		}
		
		showYouTube();
		
		if (w.TV.switchedOffTimes===1){
			//msg ("The video starts over every time you turn it off and back on.");
		}
	},
	onSwitchOff:function(){
		if (!w.TV.switchedOffTimes){
			w.TV.switchedOffTimes = 0;
			msg ("{b:{i:[SYSTEM MESSAGE:  THANK YOU!]}}");
		}
		w.TV.switchedOffTimes++;
		if (!settings.noConnection){
			pauseYouTube();
			hideYouTube();
		}
	},
	preSave:()=>{
		//debuginfo("preSave running.")
		if (ytPlayer) {  // Is a video loaded in this TV?
			w.TV.ytStyle = $("#youtube").attr("style")  // Copy the style, to check if it was visible on load.
			w.TV.ytPlayerInfo = JSON.stringify(ytPlayer.playerInfo) // Save the object as a string, so it works with Save/Load.
			//debuginfo("Saving ytPlayer.playerInfo to w.TV.ytPlayerInfo.")
			//debuglog(w.TV.ytPlayerInfo)
			//debuglog(w.TV.ytStyle)
		}
	},
	postLoad:()=>{
		//debuginfo("Running postLoad on TV . . .")
		onlineCheck()
		if (settings.noConnection) {
			// No internet connection.  Abort.
			debuginfo( "There is no internet connection.  YouTube will be bypassed during this session.")
			return
		}
		w.TV.loadingSave = true // This is to make sure the sound works when there were no saved settings.
		if (w.TV.ytPlayerInfo){  // Was the TV playing a video?
			//debuginfo("Found ytPlayerInfo")
			let newInfo = JSON.parse(w.TV.ytPlayerInfo)  // Convert into a real JS object.
			let id = newInfo.videoData.video_id  // Get the video ID.
			//debuglog("Checking if ytPlayer exists . . .")
			if (!ytPlayer) {  // Just making sure there's not already a player.
				//debuglog("Creating youtube . . .")
				//debuglog(id)
				//alert("CLEARING CONSOLE")
				//console.clear()  // Too many warnings about YouTube's cookies and such.
				//console.time()  // Start timing from here, just for kicks.
				// Now. to create the youtube element, with the old video (which was playing during saving) loaded.
				// NOTE: This will invoke onGameLoadYouTubeSetup in youTubeLib!
				createYouTube(id,390,640,{ 'playlist': [id, '7vIi0U4rSX4'],
									'autoplay': 1,
									'loop':1,
									'rel':0 });
				//debuginfo("Youtube created")
			}
			 if (!w.TV.ytStyle) {  // If there IS a style, that means it's "display: none". So . . .
				$("#youtube").show() // Show the video.
			 }else{  // There's something setup in the CSS (probably "display: none").
				$("#youtube").attr("style", w.TV.ytStyle)  // Copy old CSS to the existing element.
			}
		}
		//debuginfo("TV postLoaded.")
	}
});


// Kitchen items

createItem("refrigerator", CONTAINER(true), {
  loc:"Kitchen",
  examine:"An old, grimy fridge.",
  regex:/^(refrigerator|fridge)$/,
  enter: "HA!",
  isEnterable: true,
});


createItem("beer",TAKEABLE(), {
	loc:"refrigerator",
	examine:"A bottle of Frotz Beer.",
	drop:"Dropping the bottle of beer would be unwise.  It might break.",
	onMove:function(toLoc, fromLoc) {
      handleBeerMove(toLoc, fromLoc)
    },
    heldVerbs: ['Give'],
});

function handleBeerMove(toLoc,fromLoc){
	if (toLoc === w.XanMag.name) {
		game.score += 10;
		var endingText = "OK in my book";
		if (game.score === 19) {
			endingText = "the greatest adventurer ever";
		}
		var s = "XanMag flashes you a big smile, pops the cap off of the bottle, and takes a big swig of the beer.<br><br>";
		s += "\"You, my friend,\" he says, \"are "+endingText+"!\"";
		msg (s);
		msg("{b:[YOUR SCORE HAS INCREASED BY 10]}");
		msg("YOU HAVE WON!<br><br>Turns taken: {game.turnCount}<br>Score: {game.score} out of a possible\
		 {game.maxScore}<br><br>THANKS FOR PLAYING!");
		 msg("<input type=\"button\" style='color:white;background-color:black'\
		  value=\"CLICK HERE TO PLAY AGAIN!\" onClick=\"window.location.reload(true)\">");
		io.finish();
	  }
}


// Living room items

createItem("Big_TV", {
	loc:"living_room",
	examine:"XM is watching <a href='https://www.youtube.com/watch?v=OXNLWy7rwH4'\
	 target='_blank'>the INFOCOM documentary</a>.",
});



//createItem("unReal", {
	//alias:"TV",
	//loc:"cellar",
	//examine:"This is actually not a TV.  It is an object named 'unReal'.  Its alias is 'TV', though.  This is an attempt to confuse the code.",
	//enjoy:()=>{
		//if(!w.unReal.enjoyedTimes) {
			//w.unReal.enjoyedTimes = 0
		//}
		//if(localStorage.getItem("test1") === "Enjoyed unReal!" && w.unReal.enjoyedTimes === 0){
			//msg("Didn't you do that last time you played this game?")
		//}else if(localStorage.getItem("test1") === "Enjoyed unReal!" && w.unReal.enjoyedTimes > 0){
			//msg("You enjoy the fake TV again.")
		//}else{
			//localStorage.setItem("test1","Enjoyed unReal!")
			//msg("You enjoy the fake TV.")
		//}
		//w.unReal.enjoyedTimes++
	//},
//})
