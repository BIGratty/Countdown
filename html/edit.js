var time = ["","15","30","10",'4',"40","30"];
var events = ["","Pre Service","Worship","MC Bridge","Meet and Greet","Message","Message"];
var notes = ["","Atmosphere","","Notices Offering","","","Alter Call"];
function fillpreset(){
    y = document.getElementById("preset");
    document.getElementById("time").value = time[y.selectedIndex];
    document.getElementById("events").value = events[y.selectedIndex];
	document.getElementById("notes").value = notes[y.selectedIndex];
}