"use strict"

createItem("Ralph", NPC(false), {
  loc:"cellar",
  examine: (...params) => {
	  msg("Your trusty sidekick.");
	  handleExamineHolderRedux(params);
  },
  regex: /^(R|r)alph$/,
  parserAltNames:["ralph","rp"],
  shadowingPlayer:true,
  properName:true,
  talkto:"Ralph waves you off.",
  getAgreementGo:function(dir) {
	  msg("Ralph never voluntarily leaves your side in this game.");
	  return false;
  },
  hug:"\"Whoa, whoa, whoa,\" says Ralph.  \"Social distancing!  Remember?!?\"",
  love:"This is not that kind of game!",
  multiple:true,
  hereVerbs:["Talk to","Hug"],
  nameModifierFunction: (list) => {
	  if (w.Ralph.getContents().length>0){
		  list.push(getAllChildrenLinks(this, {article:INDEFINITE}));
		 }
  }
});

createItem("dead_Ralph", NPC(false),{
	alt:"Ralph (deceased)",
	examine:"Deader than a doornail.",
	parserAltNames:["ralph","rp"],
	take:()=>{metamsg("This is NOT that kind of game!")},
	talkto:"You waste 1 turn talking to a dead NPC." ,
	hug:()=>{metamsg("That's not happening.")},
	love:"If you loved Ralph, you shouldn't have subjected him to second-hand smoke."
})

createItem("iPhone_XM", {
	loc:"XanMag",
	parserAltNames:["phone"],
	examine:"XM covers the screen of his shiny, new iPhone XM.",
	take:"XanMag wouldn't like that.",
	excludeFromAll:true
}),

createItem("laptop", {
	loc:"XanMag",
	parserAltNames:["computer","pc"],
	examine:"XM is holding it very close to his chest.",
	take:"XanMag wouldn't like that.",
	excludeFromAll:true,
	smell:()=>{
		msg("You take a big whiff, breathing in XanMag's beer-sweat scent.")
		msg("You begin to feel woozy.")
		msg("XM is looking at you like you're not OK . . .")
		msg("{blur:The room is . . .}")
		wait()
		msg("TODO: Finish writing this part!") //go to different game.
	},
}),


createItem("XanMag", NPC(false), {
	loc:"living_room",
	examineFirst:"XanMag is a pretty normal fellow upon inspection.  \
	His shirt is old and adorned with two Bells - apparently a beer logo - \
	and his jeans are old and snug around his frumpy waist.  He is bouncing between \
	activities as you would expect an over-caffeinated teenager with A.D.D. would despite \
	the fact that he is not over-caffeinated, not a teenager, and has never been diagnosed \
	as having attention deficit disorder.  Currently he \
	{random:is scouring through the forum posts.:is fiddling with his iPhone."+
	//":is taking a long 'sip' from his fancy beer."+
	":is flipping between browser tabs.:is listening to music \
	streaming out of his laptop.:appears to be daydreaming.}",
	examineDefault:"XanMag is easily distracted by all the stimuli around him.  \
	Currently his focus is on \
	{random:scouring through the forum posts.:fiddling with his iPhone.:flipping between browser tabs.\
	:listening to music streaming out of his laptop.:the enthralling daydream he is having.}",
	examine:(...params)=>{
		msg(processText("{once:"+w.XanMag.examineFirst+"}{notOnce:"+w.XanMag.examineDefault+"}"));
		handleExamineHolder(params);
	},
	regex:/^(xm|xanmag|kevin)$/,
	properName:true,
	parserAltNames:["xm","kevin"],
	talkto:"{random:\"I {random:like beer:can light any {objectLink:purple_lighter:lighter} on the first attempt},\"\
	 says Xan{random:, with a nod at the end for emphasis:}:XanMag nods, whilst not listening at all}.",
	love:"Everyone loves XanMag!",
	hugAttempts:0,
	hug:function(){
		w.XanMag.hugAttempts++;
		var xMHA = w.XanMag.hugAttempts;
		if (xMHA<3){
			msg("XM takes a{ifMoreThan:XanMag:hugAttempts:1:nother} step back, shaking his head.");
		}else if (xMHA===3){
			msg("XM takes another step away from you, his hands held out.  \"Please, keep your distance,\" he says.\
			  \"Are you trying to run me out of the game?\"");
		}else{
			msg("XM takes another step away from you, and doing so causes him to move outside of the game world.");
			w.XanMag.loc=null;
		}
	},
	hereVerbs:["Talk to","Hug"],
	reactions:{
		beer: { 
			test:function(){return w.beer.loc==="me"||w.beer.loc==="Ralph";},
			action:function(){
				var blah = "";
				if (w.beer.loc==="Ralph"){
					blah = " Ralph,";
				}else if (w.beer.loc==="me") {
					blah = " you know,";
				}
				msg("\"I'm like Brett Kavanaugh in one way,"+blah+"\" says XM.  \"I like beer!\"");
			},
		},
	},
	giveReaction:function(obj, multiple, char){
	  if(obj==w.cigarette){
		  msg ("Xan shakes his head.  \"No thanks.  I don't smoke cigarettes.\"");
	  }else if(obj==w.purple_lighter){
		  if (w.purple_lighter.broken){
		    w.purple_lighter.onMove(w.XanMag.name, w.purple_lighter.loc);
		  }else{
			msg("\"Nah.  I've got my own,\" says Xan, waving the lighter away.");  
		  }
	  }else{
		  msg(prefix(obj, multiple) + lang.done_msg);
          obj.moveToFrom(this.name, char.name);
	  }
    },
});
