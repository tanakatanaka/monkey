#pragma strict

var pict : Texture[];
private var s : swit;
var floor : GameObject;

function Start ()
{
	s = floor.GetComponent(swit);
}

function OnGUI()
{
	var page = s.Get_page() - 1;
	
	var sw = Screen.width;
	var sh = Screen.height;
	
	//var pw = pict[page].width;
	//var ph = pict[page].height;
	
	var pw = sw * 2 / 3;
	var ph = pw / 2.5;
	
	var x : float = (sw - pw) / 2;
	var y : float = (sh - ph) / 2;
	
	
	GUI.DrawTexture(Rect(x, y, pw, ph), pict[page]);
    //GUI.DrawTexture(new Rect(Screen.width, Screen.height, pict[page].width,pict[page].width), pict[page]);
}
