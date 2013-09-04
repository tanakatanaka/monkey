#pragma strict

var labelStyle : GUIStyle;

function Start () 
{
	
}

function Update () 
{
	//スペースキーを押したらゲームを読み込む
	if(Input.GetButtonDown("Fire1"))
	{
		Application.LoadLevel("test"); 
	}
} 

function OnGUI()
{
	var sw : int = Screen.width;
	var sh : int = Screen.height;
	GUI.Label(Rect(0,0,sw,sh), "G A M E", labelStyle);
	GUI.Label(Rect(0, sh / 2.5, sw, sh / 1.5), "Click to Start", labelStyle);
}
