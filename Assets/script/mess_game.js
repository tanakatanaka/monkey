#pragma strict

private var g : game;
var turn : GameObject;
var shuffle : int = 1;

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
		if(this.shuffle > 0)
		{
			if(GUI.Button(new Rect(0, 0, size, size), "shuffle : " + this.shuffle))
		 	{
		 		GameObject.FindWithTag("manage_stag").SendMessage("shuffle_stag"); 
		 		this.shuffle--;
			}
		}
	}
}
