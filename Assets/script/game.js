#pragma strict
var turn_count : int = 1;
private var up_timer : int = -5;
var labelStyleGameEnd : GUIStyle;
//ゲーム進行関係
private var state : String = "game play";

function Get_turn()
{
	return this.turn_count;
}

function turn_up()
{
	this.up_timer = 20;
}

function turn_up_gimmick()
{
	if(this.up_timer > 0) { this.up_timer--; }
	else if(this.up_timer == 0)
	{ 
		this.up_timer = -5;
		this.turn_count++;
		Debug.Log("up up");
		Debug.Log(this.turn_count);
	}
}

function Update () 
{
	turn_up_gimmick();
}	

function game_end(clear : boolean)
{
	if(clear == true){ state = "Game Clear"; }
	else{ state = "Game Over"; }
	
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
	
	if(state != "game play")
	{ 
		GUI.Label(rect_gameover, state, labelStyleGameEnd); 
		GUI.Label(rect_info, "click to retry", labelStyleGameEnd);
	}
		
}