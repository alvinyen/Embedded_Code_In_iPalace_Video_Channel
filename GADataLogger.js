//embedded at http://npm.nchc.org.tw

	
	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

	ga('create', 'UA-61232352-2', 'auto');
	ga('send', 'pageview');

	var isTest=true;
	var isSend=true;
	var count=-1;
	//User Info.:ip
	var userInfo = myip + ",";	
	var eventInfo="";
	var playbackInfo="";

	//User Info.:session 			
	userInfo = userInfo + (document.cookie + ",");

	//User Info.:timeDiffer
	var r = new XMLHttpRequest();
	r.open('HEAD', document.location, false);
	var before;
	r.onreadystatechange = function(){
		if (r.readyState != 4){
			canSent=false; //for ga
			return; //risk..
		}
		canSent=true; //for ga  
		var after=Date.now();  
		userInfo = userInfo + ( after + ","); //t4
		var serverResponse = new Date(r.getResponseHeader("DATE"));
		userInfo = userInfo + ( serverResponse.getTime() + ",");
		
		//if(isTest){console.log("serverResponseBeforeSetMs:" + serverResponse);}
		
		console.log(serverResponse);
		console.log(serverResponse.getTime());
		console.log(serverResponse.getMilliseconds());

		var serverNow=serverResponse.setMilliseconds( 
				serverResponse.getMilliseconds() + 
				( Date.now() - before) / 2 				);
		//if(isTest){console.log("serverResponseAfterSetMs:" + serverResponse);}
		//if(isTest){console.log("serverNow:" + serverNow);}
		var timeDiffer = serverNow - after;
		userInfo = userInfo+(timeDiffer + ","); //timeDiffer
		//if(isTest){console.log(userInfo);}
	};
	before = Date.now();
	userInfo = userInfo + (before + ","); //t1
	r.send(null);