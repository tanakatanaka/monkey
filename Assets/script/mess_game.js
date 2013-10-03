#pragma strict

private var g : game;
var turn : GameObject;

function Start ()  
{
	g = turn.GetComponent(game);
}

function OnGUI()
{
	var state = g.Get_state();
	
	var sw : float = Screen.width;
	var sh : float = Screen.height;
	
	// ボタンのサイズ
	var size : float = sw / 10;
	
	if(state == "GAME_PLAY")
	{
		if(GUI.Button(new Rect(sw - size, 0, size, size), "やめる")) { Application.LoadLevel("test"); }
	}
}
