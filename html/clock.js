// Config Variables
var colorchange = 5;
var colorstop = 1;
var clear = 2.5;
var flashstart = 0.2;
// Declare Variables
var colordif = (colorchange-colorstop)
var realtime;  			//Current time
var realtimedisplay; 	//Current time display
var json;				//JSON Array
var targettime;			//Target Time
var remainingtime;		//Time String
var events;				//Event String
var notes;				//Notes String
var color;				//Timer Color
var reltime; 			//Second between target and now
var bgcolor;			//Background Color
//Function resize
function resize(){
		var textheight = (document.getElementById('clockdiv').offsetWidth)/10;
		clocktable.style.fontSize = (textheight) + 'px';
		clock.style.height = (textheight*1.1) + 'px';
}
//Start of loop
setInterval(function(){
//Read JSON
	$.ajax({
        'async': false,
        'global': false,
        'url': 'json.json?'+(Math.random()),
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
	});

//Clock
    realtime=new Date();
    realtimedisplay=(("0"+(realtime.getHours()%12 || 12)).substr(-2))+':'+("0"+realtime.getMinutes()).substr(-2)+':'+("0"+realtime.getSeconds()).substr(-2);

//If Countdown
	if (json.task=='countdown')
		{
			targettime = json.remainingtime
			remainingtime = new Date(targettime-realtime+(realtime.getTimezoneOffset()*60000));
			reltime = Math.floor(((new Date(targettime-realtime).getTime())+(clear*60000))/1000);
			color = ((((new Date(targettime-realtime)).getTime())/500));
			color = Math.floor((color/colordif)-(colorstop*30));
			if (color > 120)
				{
					color = 120
				}
			if (color < 1)
				{
					color = 0
				}
			if (targettime < realtime)
				{
					remainingtime = '00:00:00'
				}
			else
				{
					remainingtime = '00:'+("0"+remainingtime.getMinutes()).substr(-2)+':'+("0"+remainingtime.getSeconds()).substr(-2)
				}
			color = 'hsl('+color+',100%,50%)';
			bgcolor = 'hsl(0,100%,0%)';
			notes = json.notes;
			events = json.events;
			if (reltime < ((flashstart*60)+(clear*60))) 
				{
					if(reltime & 1)
						{
							color = 'hsl(0,0%,0%)';
							bgcolor = 'hsl(0,100%,50%)';
						}
					else
						{
							color = 'hsl(0,100%,50%)';
							bgcolor = 'hsl(0,100%,0%)';	
						}
				}
			if (reltime < (clear*60)) 
				{
					color = 'hsl(0,100%,50%)';
					bgcolor = 'hsl(0,100%,0%)';
				}
			if (reltime < 1)
				{
					json.task = 'clear'
				}	
		}
//If Clear
	if (json.task=='clear')
		{
			remainingtime = '00:00:00';
			notes = '';
			events = '';
			color = 'hsl(0,0%,50%)';
			bgcolor = 'hsl(0,100%,0%)';
		}
//If Display
	if (json.task=='display')
		{
			remainingtime = '00:00:00';
			notes = json.notes;
			events = json.events;
			color = 'hsl(0,0%,50%)';
			bgcolor = 'hsl(0,100%,0%)';
		}
//Build Display
	timer.style.color = (color);
	home.style.backgroundColor = (bgcolor);
	clockdiv.style.backgroundColor = (bgcolor);
	document.getElementById('clock').innerHTML=realtimedisplay;
	document.getElementById('timer').innerHTML=remainingtime;
	document.getElementById('eventnotes').innerHTML=events+'<br />'+notes;
	{resize()}
},1000);