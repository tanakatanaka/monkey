#pragma strict

private var g : game;
var turn : GameObject;

function Start () 
{
	g = turn.GetComponent(game);
}

function OnGUI()
{
	 
}

function Update () 
{
	if(g.Get_state() == "GAME_CLEAR" || g.Get_state() == "GAME_OVER") { OnGUI(); }
}