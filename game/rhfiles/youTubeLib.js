"use strict"


// NOTE to you (yes, you!): If you don't have these set up, uncomment the next 4 lines!
//const log = console.log 
//const debuglog = (s) => { if(settings.playMode === 'dev' || settings.playMode === 'meta'){ log(s)} }
//const parserlog = (s) => { if(parser.debug){ log(s)} }
//const debuginfo = (s) => { console.info(s) }

// Add CSS settings for mobile.
$("head").append(`<style>@media only screen and (max-width: 956px) {
	iframe#youtube {
		width:auto;
		height:auto;
	}
}</style>`)



//==================
//YouTube functions|
//==================



function isYouTubeMuted(){
	if (!ytPlayer) {
		debuginfo("TODO: Handle lack of ytPlayer.")
		return true
	}
	return ytPlayer.isMuted()
}

function getYouTubeVolume(){
	if (!ytPlayer) {
		debuginfo("TODO: Handle lack of ytPlayer.")
		return null
	}
	return ytPlayer.getVolume()
}

function getYouTubeSoundOn(){
	return isYouTubeMuted() && getYouTubeVolume()
}

function setYouTubeVolume(vol){
	if (!ytPlayer) return 0
	ytPlayer.setVolume(vol)
	return vol
}

function muteYouTube(){
	var ytp = $("#youtube")
	if (!ytp.length || !ytPlayer) return 0
	ytPlayer.mute()
	return 1
}

function unmuteYouTube(){
	if (!ytPlayer) return 2
	var ytp = $("#youtube")
	if (ytp.length && ytPlayer.isMuted()){
		ytPlayer.unMute()
		return 1
	}
	return 0
}

function pauseYouTube(){
	if (ytPlayer) ytPlayer.pauseVideo()
}

function playYouTube(){
	if (!ytPlayer) return "TODO: handle lack of ytPlayer"
	ytPlayer.playVideo()
}

function stopYouTube(){
	if (ytPlayer) ytPlayer.stopVideo()
}

function hideYouTube(){
	var ytp = $("#youtube")
	if (ytp) ytp.hide()
}

function showYouTube(){
	var ytp = $("#youtube")
	if (!ytp) return "TODO"
	ytp.show()
}

function loadYouTubeVideoById(vid){
	// This sets it to loop.  Set loop to 0 if loop is unwanted.  Also, remove the 2nd video ID from the playlist array.
	if (!ytPlayer) {
		createYouTube(vid,390,640,{ 'playlist': [vid, '7vIi0U4rSX4'],
									'autoplay': 1,
									'loop':1,
									'rel':0 }
		)
		//debuginfo("ytPlayer did not exist, but was created.")
	}else{
		ytPlayer.loadVideoById(vid)
	}
}

function killYoutube(){
	//Returns 1 if an element is found.
	//Returns 0 if no element is found.
	if ($('#youtube').length){
		$('#youtube').remove()
		return 1
	}
	return 0
}

function getYouTubeCurrentId(){
	var ytpId = ''
	if (typeof(ytPlayer.getVideoData)!=='undefined'){
		ytpId = ytPlayer.getVideoData().video_id
	}
	return ytpId
}


// Added for Save/Load on 2020.12.16
function onGameLoadYouTubeSetup(){
	// Called by onPlayerReady in youTubeAPISetup.js.
	//debuglog("Running onGameLoadYouTubeSetup . . .")
	let saved = JSON.parse(w.TV.ytPlayerInfo)  // Parse saved JSON object (with saved player info) into JS object.
	//debuglog(ytPlayer.playerInfo)
	//debuglog(saved)
	let { currentTime:time, volume: vol, muted, playbackRate: rate, playlist, playlistIndex } = saved // Get some data!
	//debuglog(time)
	//debuglog(vol)
	//debuglog(muted)
	//debuglog(rate)
	//debuglog(playlist)
	//debuglog(playlistIndex)
	//ytPlayer.playerInfo = saved
	ytPlayer.seekTo(time)  // This will not work, assumedly because the video has to be loaded first?
	//debuglog(`time set to ${time}`)
	setTimeout(() => { // Creating this to make the video actually seek after loading.
		ytPlayer.seekTo(JSON.parse(w.TV.ytPlayerInfo).currentTime) // Setting the time again (hopefully it works this time).
		//debuglog(`time set to ${JSON.parse(w.TV.ytPlayerInfo).currentTime} again`)
		//console.timeEnd()  // Stop the timer.
	}, 1000) // I had this at 500 at first.  it worked sometimes.  This probably depends on internet speed. Hope this is enough!

	setYouTubeVolume(vol)  // Set the saved volume.
	if (muted) { // If it was muted . . .
		muteYouTube()  // Mute it.
		//debuglog("Muted")
	}
	ytPlayer.setLoop(true)  // I can't figure out how to check this in the preSave, but I know it loops in this game.
	w.TV.loadingSave = false // This is to make sure the sound works when there were no saved settings.
	//debuglog("END OF onGameLoadYouTubeSetup")
}


/**
 * Playlist stuff begins
*/

const youTubeDir = [
	{dir: "necroDeath", title: "Time Perception",id:"DKPhPz5Hqqc"},
	{dir: "iFiction", title:"Quest", id:"7vIi0U4rSX4"}, 
	{dir: "iFiction", title: "INFOCOM_doc", id:"OXNLWy7rwH4"},
	{dir: "iFiction", title:"It is pitch dark", id:"4nigRT2KmCE"}
]

function getAllYouTubeIds(){
	return youTubeDir.map(x => x.id)
}

function getYouTubeIdByTitle(title){
	return youTubeDir.filter(s => s.title === title).map(x => x.id)[0]
}

function getYouTubeIdsByDir(dir){
	return youTubeDir.filter(s => s.dir === dir).map(x => x.id)
}

function getYouTubeTitleById(id){
	return youTubeDir.filter(s => s.id === id).map(x => x.title)[0]
}

function getYouTubeTitlesByDir(dir){
	return youTubeDir.filter(s => s.dir === dir).map(x => x.title)
}


/**
 * END OF playlist stuff
*/


//=========================
//END OF YouTube functions|
//=========================


/*
 //OLD FUNCTION as of 0.9
function youTube(id='7vIi0U4rSX4',auto=true){
	killYoutube()
	var autoplay = '1'
	if (!auto) autoplay = '0'
	var s = '<iframe id="youTube" width="560" height="315"'
	s += ' src="https://www.youtube.com/embed/'+id+'?autoplay='+autoplay+'"'
	s += ' frameborder="0" allowfullscreen></iframe>'
	msg(s)
	
}
*/
