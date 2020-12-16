"use strict"
//YouTube API setup

  // This code loads the IFrame Player API code asynchronously.
  var tag = document.createElement('script');

  tag.src = "game/rhfiles/iframe_api.js";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  // This function creates an <iframe> (and YouTube player)
  //    after the API code downloads.
  var ytPlayer;
  function CreateYouTube(vid='7vIi0U4rSX4',
							ht='390',
							wid='640',
							vars={ 'autoplay': 1 },
							evts={
								'onReady':onPlayerReady,
								'onStateChange':onPlayerStateChange
							}) {
	ytPlayer = new YT.Player('youtube', {
	  height: ht,
	  width: wid,
	  videoId: vid,
	  playerVars: vars,
	  events: evts
	});
  }
  function createYouTube(...args){
	  CreateYouTube(...args)
  }
  
  // The API will call this function when the video player is ready.
  function onPlayerReady(event) {
	if (w.TV.loadingSave) { // This is to make sure the sound works when there were no saved settings.
		// If this runs with no saved settings, it makes the video start on mute.  (I can't explain why.)
		onGameLoadYouTubeSetup() // There were saved settings, so load them.
	}
	event.target.playVideo();
  }

  // The API calls this function when the player's state changes.
  //    The function indicates that when playing a video (state=1),
  //    the player should play for six seconds and then stop.
  var done = false;
  function onPlayerStateChange(event) {
	if (event.data == YT.PlayerState.PLAYING && !done) {
	  done = true;
	}
  }
  
  // Cleaning up for the game.
  var el = $("#youtube")
  el.insertBefore($("#input"))
  el.hide();

