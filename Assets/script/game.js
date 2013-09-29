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
	var rect_gameover : Rect = Rect(0, 0, Screen.width, Screen.height);
	var rect_info : Rect = Rect(730, 0, Screen.width, Screen.height);
	
	if(state != "GAME_PLAY" || state != "GAME_SELECT")
	{ 
		GUI.Label(rect_gameover, state, labelStyleGameEnd); 
		GUI.Label(rect_info, "click to retry", labelStyleGameEnd);
	}
		
}

function Update () 
{
	if(state == "GAME_SELECT")
	{
		
	}
}

