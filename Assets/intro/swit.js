#pragma strict

var page : int = 1;
var max_page : int = 4;

function Get_max_page()
{
	return this.max_page;
}

function Get_page()
{
	return this.page;
}

function OnGUI()
{
	var sw : float = Screen.width;
	var sh : float = Screen.height;

	// ボタンのサイズ
	var size : float = sw / 10;
	// ボタン間の間隔
	var margin : float = size / 3;
	var label_height : float = size / 4;
	var total_ui_width : float = size * 5 + margin * 4;
	var total_ui_height : float = label_height + margin + size;

	var x : float = (sw - total_ui_width) / 2;
	var y : float = sh - size * 1.5;

	y += label_height + margin;
	
	var place : float = size + margin;
	
	if(this.page != 1)
	{
		if(GUI.Button(new Rect(0, y, size, size), "まえへ")) { this.page--; }
	}
	if(GUI.Button(new Rect(sw - size, y - margin - size, size, size), "メニューへ")) { Application.LoadLevel("test"); }
	if(this.page != this.max_page)
	{
		if(GUI.Button(new Rect(sw - size, y, size, size), "つぎへ")) { this.page++; }
	}
}

function Update () 
{

}