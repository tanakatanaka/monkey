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
	
	yield WaitForSeconds(1.0);
	while (!Input.GetButtonDown("Fire1")) 
	{
		yield;
	}
}

function OnGUI()
{
	if(state == "GAME_SELECT")
	{
		var sw : float = Screen.width;
		var sh : float = Screen.height;

		// ボタンのサイズ
		var size : float = sw / 10;
		// ボタン間の間隔
		var margin : float = size / 3;
		var label_height : float = size / 4;
		var total_ui_width : float = size * 5 + margin * 4;
		var total_ui_height : float = label_height + margin + size + margin + label_height + margin + size;

		var x : float = (sw - total_ui_width) / 2;
		var y : float = (sh - total_ui_height) / 2;
		
		GUI.Box(new Rect(x, y, total_ui_width, label_height), "ゲームレベル");

		y += label_height + margin;
		
		var place : float = size + margin;
		
		if(GUI.Button(new Rect(x , y, size, size), "Level 1")) { this.game_level = 1; }
		if(GUI.Button(new Rect(x + place, y, size, size), "Level 2")) { this.game_level = 2; }
		if(GUI.Button(new Rect(x + place * 2, y, size, size), "Level 3")) { this.game_level = 3; }
		if(GUI.Button(new Rect(x + place * 3, y, size, size), "Level 4")) { this.game_level = 4; }
		if(GUI.Button(new Rect(x + place * 4, y, size, size), "Level 5")) { this.game_level = 5; }
		
		y += margin + size; 
		GUI.Box(new Rect(x, y, total_ui_width, label_height), "オプション");
		y += margin;
		if(GUI.Button(new Rect(x + place * 2, y, size, size), "せつめい")) { Application.LoadLevel("intro"); }
		
		if(this.game_level > 0) { state = "GAME_PLAY"; }	
	}
}
	


