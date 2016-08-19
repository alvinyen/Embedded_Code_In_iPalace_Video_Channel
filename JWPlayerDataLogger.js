//embedded at http://npm.nchc.org.tw
//not have that much functions: performance consideration

var playerInstance=jwplayer('JWP');
	playerInstance.setup({
		width: '100%',
	aspectratio: '16:9',
	ga: {},
	autostart: true,
	sources: [
		{
			file: 'video/02sFZNAdEhgi3IR4Haik_C_480p.mp4',
			label: '480p'},
		{
			file: 'video/02sFZNAdEhgi3IR4Haik_C_720p.mp4',
			label: '720p'
		},
		{
			file: 'video/02sFZNAdEhgi3IR4Haik_C_1080p.mp4',
			label: '1080p',
			'default': 'true'}]
});

	playerInstance.once('levels', levels );
	function levels(e){
		eventInfo = eventInfo + (playerInstance.getQualityLevels()[playerInstance.getCurrentQuality()].label+",");
		if(isTest){
			console.log("levels : " + playerInstance.getQualityLevels()[playerInstance.getCurrentQuality()].label + " : " + new Date());
		}
	}
	
	playerInstance.once('firstFrame', firstFrame );
	function firstFrame(e){
		eventInfo = eventInfo + ( e.loadTime +",");
		count=1;
		if(isTest){
			console.log("firstFrame : " + e.loadTime+ " : " + new Date());
		}
	}
		
	playerInstance.on('buffer', buffer );
	function buffer(e){
		if(count === 1 ){
			eventInfo = eventInfo + ("b_"+Date.now()+",");
		}
		if(isTest){
			console.log(count+"buffer : " + e.oldstate+ " : " + e.newstate + " : " + e.reason + " : " + new Date());
		}
	}
	
	playerInstance.on('play', play );
	function play(e){
		if(count === 1 ){
			eventInfo = eventInfo + ("p_"+Date.now()+",");
		}
		if(isTest){
			console.log(count+"play : " + e.oldstate+ " : " + new Date());
		}
	}

	playerInstance.on('pause', pause );
	function pause(e){
		eventInfo = eventInfo + ("pa_"+Date.now()+",");
		playbackInfo=( playerInstance.getPosition()+ "," + playerInstance.getBuffer() +"," + playerInstance.getDuration() );
		if(isTest){
			console.log("pause : " + e.oldstate+ " : " + new Date());
			console.log(userInfo+","+eventInfo+","+playbackInfo);
		}
		//***
		if(isSend){
			ga('set', 'dimension1',userInfo);
			ga('set', 'dimension2', eventInfo);
			ga('set', 'dimension3',playbackInfo + "," +new Date() +","+Date.now() );
			ga('send', 'pageview');
		}
		clear();
	}

	playerInstance.on('seek', seek );
	function seek(e){
		eventInfo = eventInfo + ("se_"+Date.now()+",");
		playbackInfo=( playerInstance.getPosition()+ "," + playerInstance.getBuffer() +"," + playerInstance.getDuration() );
		if(isTest){
			console.log("seek  " + " : " + new Date());
			console.log(userInfo+","+eventInfo+","+playbackInfo);
		}
		//***
		if(isSend){
			ga('set', 'dimension1',userInfo);
			ga('set', 'dimension2', eventInfo);
			ga('set', 'dimension3',playbackInfo + "," +new Date() +","+Date.now()  );
			ga('send', 'pageview');
		}
		clear();
	}

	playerInstance.on('levelsChanged', levelsChanged );
	function levelsChanged(e){
		eventInfo = eventInfo + ("lc_"+Date.now()+",");
		playbackInfo=( playerInstance.getPosition()+ "," + playerInstance.getBuffer() +"," + playerInstance.getDuration() );
		if(isTest){
			console.log("levelsChanged : " + playerInstance.getCurrentQuality() + " : " + new Date());
			console.log(userInfo+","+eventInfo+","+playbackInfo);
		}
		//***
		if(isSend){
			ga('set', 'dimension1',userInfo);
			ga('set', 'dimension2', eventInfo);
			ga('set', 'dimension3',playbackInfo + "," +new Date() +","+Date.now()  );
			ga('send', 'pageview');
		}
		clear();
	}

	playerInstance.on('complete', complete );
	function complete(){
		eventInfo = eventInfo + ("ph_"+Date.now()+",");
		playbackInfo=( playerInstance.getPosition()+ "," + playerInstance.getBuffer() +"," + playerInstance.getDuration() );
		if(isTest){
			console.log("complete_ph" + " : " + new Date());
			console.log(userInfo+","+eventInfo+","+playbackInfo);
		}
		//***
		if(isSend){
			ga('set', 'dimension1',userInfo);
			ga('set', 'dimension2', eventInfo);
			ga('set', 'dimension3',playbackInfo + "," +new Date() +","+Date.now() );
			ga('send', 'pageview');
		}
		clear();
	}

	window.addEventListener("unload" , unload ,false);
	function unload(){
		eventInfo = eventInfo + ("un_"+Date.now()+",");
		playbackInfo=( playerInstance.getPosition()+ "," + playerInstance.getBuffer() +"," + playerInstance.getDuration() );
		if(isTest){
			console.log(userInfo+","+eventInfo+","+playbackInfo);
		}
		//***
		if(isSend){
			ga('set', 'dimension1',userInfo);
			ga('set', 'dimension2', eventInfo);
			ga('set', 'dimension3',playbackInfo + "," +new Date() +","+Date.now()  );
			ga('send', 'pageview');
		}
		clear();
	}

	function clear(){
		isTest=false;
		isSend=false;
		count=-1;
		playerInstance.off('levels', levels );
		playerInstance.off('firstFrame', firstFrame );
		playerInstance.off('buffer', buffer );
		playerInstance.off('play', play );
		playerInstance.off('pause', pause );
		playerInstance.off('seek', seek );
		playerInstance.off('levelsChanged', levelsChanged );
		playerInstance.off('complete', complete );
	}
