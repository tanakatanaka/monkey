#pragma strict

var labelStyle : GUIStyle;
var time_count : int = 0;

function Update () 
{
	//スペースキーを押したらゲームを読み込む
	if(Input.GetButtonDown("Fire1"))
	{
		Application.LoadLevel("test"); 
	}
	
	time_count++;
} 

function OnGUI()
{
	var sw : int = Screen.width;
	var sh : int = Screen.height;
	GUI.Label(Rect(0,0,sw,sh), "Moncky in the Cage", labelStyle);
	
	GUI.Label(Rect(0, sh / 2.5, sw, sh / 1.5), "Click to Start", labelStyle);
}
