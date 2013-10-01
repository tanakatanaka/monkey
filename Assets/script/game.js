#pragma strict
var turn_count : int = 1;
var labelStyleGameEnd : GUIStyle;
var game_level : int = 0;

//ゲーム進行関係
private var state : String = "GAME_SELECT";

function Get_turn()
{
	return this.turn_count;
}

function turn_up()
{
	this.turn_count++;
}

function Get_state()
{
	return this.state;
}

function Get_level()
{
	return this.game_level;
}	

function game_end(clear : boolean)
{
	if(clear == true){ state = "GAME_CLEAR"; }
	else{ state = "GAME_OVER"; }
	
	// 連打しすぎてスコア表示画面が飛ばされるのを防ぐ
	yield WaitForSeconds(1.0);
	while (!Input.GetButtonDown("Fire1")) 
	{
		yield;
	}
	Application.LoadLevel("op");
}

function OnGUI()
{
	if(state == "GAME_SELECT")
	{
		var sw : int = Screen.width;
		var sh : int = Screen.height;
		var b_xy : int = sw / 10;
		var place : int =(b_xy + b_xy /3);
		var x : int = (sw / 2) - (place * 4) / 2;
		var y : int = sh / 3;
		
		  
		
		GUI.Box(new Rect(x,y / 2, x + place * 3, b_xy / 4), "ゲームレベル");
		
		if(GUI.Button(new Rect(x , y, b_xy, b_xy), "Level 1")) { this.game_level = 1; }
		if(GUI.Button(new Rect(x + place, y, b_xy, b_xy), "Level 2")) { this.game_level = 2; }
		if(GUI.Button(new Rect(x + place * 2, y, b_xy, b_xy), "Level 3")) { this.game_level = 3; }
		if(GUI.Button(new Rect(x + place * 3, y, b_xy, b_xy), "Level 4")) { this.game_level = 4; }
		if(GUI.Button(new Rect(x + place * 4, y, b_xy, b_xy), "Level 5")) { this.game_level = 5; }
	
		if(this.game_level > 0) { state = "GAME_PLAY"; }	
	}
/*	
	if(state == "GAME_CLEAR" && state == "GAME_OVER")
	{
		var rect_gameover : Rect = Rect(0, 0, Screen.width, Screen.height);
		var rect_info : Rect = Rect(730, 0, Screen.width, Screen.height);
	
		
		GUI.Label(rect_gameover, state, labelStyleGameEnd); 
		GUI.Label(rect_info, "click to retry", labelStyleGameEnd);
	}
*/	
}
	


