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
	
	if( state == "GAME_CLEAR" || state == "GAME_OVER")
	{
		var sw : float = Screen.width;
		var sh : float = Screen.height;
	
		// ボタンのサイズ
		var size : float = sw / 10;
				
		// ボタン間の間隔
		var margin : float = size / 3;
		var label_height : float = size / 4;
		var total_ui_width : float = size * 5 + margin * 4;
		var total_ui_height : float = label_height + margin + size;

		var x : float = (sw - total_ui_width) / 2;
		var y : float = (sh - total_ui_height) / 2;
		
		if(state == "GAME_CLEAR"){state = "GAME CLEAR!";}
		else if(state == "GAME_OVER"){state = "GAME OVER";}
		
		GUI.Box(new Rect(x, y, total_ui_width, label_height), state);

		y += label_height + margin;
		
		var place : float = size + margin;
		
		if(GUI.Button(new Rect(x + place, y, size, size), "つづける")) { Application.LoadLevel("test"); }
		if(GUI.Button(new Rect(x + place * 3, y, size, size), "やめる")) { Application.LoadLevel("op"); }
	}
	
	else if(state == "GAME_PLAY")
	{
		if(GUI.Button(new Rect(sw - size * 2, y - size * 2, size, size), "やめる")) { Application.LoadLevel("test"); }
	}
}
