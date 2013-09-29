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
	if(state == "GAME_SELECT")
	{
		// バックグラウンド ボックスを作成します。
		GUI.Box(new Rect(10,10,100,180), "Loader Menu");
		
		if(GUI.Button(new Rect(20,40,80,20), "Level 1")) 
		{
			this.game_level = 1;
		}
		
		if(GUI.Button(new Rect(20,70,80,20), "Level 2"))
		{
			this.game_level = 2;
		}
		
		if(GUI.Button(new Rect(20,100,80,20), "Level 3")) 
		{
			this.game_level = 3;
		}
		
		if(GUI.Button(new Rect(20,130,80,20), "Level 4"))
		{
			this.game_level = 4;
		}
		
		if(GUI.Button(new Rect(20,160,80,20), "Level 5"))
		{
			this.game_level = 5;
		}
		
	}
	else if(state != "GAME_PLAY" && state != "GAME_SELECT")
	{
		var rect_gameover : Rect = Rect(0, 0, Screen.width, Screen.height);
		var rect_info : Rect = Rect(730, 0, Screen.width, Screen.height);
	
		
		GUI.Label(rect_gameover, state, labelStyleGameEnd); 
		GUI.Label(rect_info, "click to retry", labelStyleGameEnd);
	}
		
}

function Update () 
{
	if(this.game_level > 0){ this.state = "GAME_PLAY";}
}

