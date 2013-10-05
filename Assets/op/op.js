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
	GUI.Label(Rect(0,0,sw,sh), "Monkey in the Cage", labelStyle);
	if(Mathf.Sin( this.time_count / 20 ) > - 0.5)
	{
		GUI.Label(Rect(0, sh / 2.5, sw, sh / 1.5), "Click to Start", labelStyle);
	}
}
