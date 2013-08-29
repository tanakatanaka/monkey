#pragma strict

var labelStyle : GUIStyle;

function Start () 
{
	
}

function Update () 
{
	//スペースキーを押したらゲームを読み込む
	if(Input.GetButton("Jump"))
	{
		Application.LoadLevel("test"); 
	}
} 

function OnGUI()
{
	var sw : int = Screen.width;
	var sh : int = Screen.height;
	GUI.Label(Rect(0,0,sw,sh), "S H O O T I N G G A M E", labelStyle);
	GUI.Label(Rect(0, sh / 2.5, sw, sh / 1.5), "Space to Start", labelStyle);
}
