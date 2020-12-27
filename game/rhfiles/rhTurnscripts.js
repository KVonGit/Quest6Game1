"use strict"

//TURNSCRIPTS

createItem("updateStatusBar_Turnscript", 
  {
    eventPeriod:1,
    eventActive:false,
    eventScript:function() {
		var s = "Health: "+game.player.hitpoints.toString()+" | Turns taken: "+game.turnCount.toString()+
			"  | Score: "+game.score.toString()+"/"+game.maxScore.toString()+"<br>";
		$("#status").html(s);
	}
  }
);

createItem("inTheDark",
	{
		eventPeriod:1,
		eventActive:false,
		turnsInDark: 0,
		eventScript: () => {
			if(game.dark){
				w.inTheDark.turnsInDark++;
				msg("It is pitch dark.  You are likely to be eaten by a grue.");
				if (w.inTheDark.turnsInDark >= 3){
					eatenByAGrue();
				}
			} else {
				w.inTheDark.turnsInDark = 0;
			}
		}
	}
)

createItem("spreaderEvent",
  {
	  eventPeriod:1,
	  eventActive:true,
	  eventScript:function(){ ronaSpread(); }
  }
);

createItem("smokingKills_turnscript",
	{
		eventPeriod:1,
		eventActive:true,
		eventScript:function(){
			if(w.cigarette.lit){
				
				if(!w.cigarette.litTurns){
					w.cigarette.litTurns = 0;
				}
				
				if (!w.XanMag.subjectedToSmoke){
					w.XanMag.subjectedToSmoke = 0;
				}
				
				if (w.XanMag.isHere()){
					w.XanMag.subjectedToSmoke++;
				}
				
				switch(w.cigarette.litTurns){
					case 3:
						if (w.Ralph.isHere()){
							msg("Ralph coughs.");
						}
					break;
					case 5:
						if(w.Ralph.isHere()){msg("Ralph falls over dead.");}
						w.Ralph.shadowingPlayer = false;
						w.dead_Ralph.loc = w.Ralph.loc
						w.Ralph.loc = null;
						w.Ralph.agenda = [];
						array.remove(game.player.followers,w.Ralph)
					break;
					case 12:
						msg("The cigarette has burned away.");
						w.cigarette.loc = null;
						w.cigarette.lit = false;
					break;
				}
				
				switch(w.XanMag.subjectedToSmoke){
					case 6:
						msg ("XM coughs.");
						break;
					case 8:
						msg ("XanMag coughs, falls over dead, and is erased from existence.");
						w.XanMag.loc = null;
				}
				if(w.cigarette.lit){
					if (w.mask.worn==undefined||w.mask.worn===false){
						game.player.hitpoints -= 10;
					}else if (!w.mask.loc==="me"){
						game.player.hitpoints -= 10;
					}
					++w.cigarette.litTurns;
				}

				if(game.player.hitpoints<0){
					msg("YOU HAVE DIED DUE TO SMOKE INHALATION.");
					msg("<br>Turns taken: {game.turnCount}<br>Score: {game.score} out of a possible {game.maxScore}<br>");
					msg("THANKS FOR PLAYING!")
					msg("<input type=\"button\" style='color:white;background-color:black' value=\"CLICK HERE TO TRY AGAIN!\" onClick=\"window.location.reload(true)\">");
					io.finish();
				}
			}
		}
	}
);


//END OF TURNSCRIPTS
