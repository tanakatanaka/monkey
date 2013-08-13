#pragma strict

var compass : int = 0;
var floor : GameObject;
private var b : board;

function Start () 
{
	b = floor.GetComponent(board);
	transform.position = b.get_stag_area();
}

function rota(new_compass : int)
{
	transform.rotation.y = new_compass * 90.0;
	compass = new_compass;
}

function around_check(p_2d : Vector2, s_2d : Vector2) : int
{
	var x = p_2d.x - s_2d .x;
	var y = p_2d.y - s_2d .y;
	
	if(y == -1){return 0;}
	else if(x == 1){return 1;}
	else if(y == -1){return 2;}
	else if(x == -1){return 3;}
	
	return -1;
}

function thinking(p_2d : Vector2, s_2d : Vector2) : int
{
	/*
	if(s_2d == p_2d + rote_plus())
	{
		Debug.Log("ore no mae");
	}

	return 1;
	*/
} 

function Update () 
{
	var p_2d : Vector2 = b.to_board_point(b.get_player_area());
	var s_2d : Vector2 = b.to_board_point(transform.position); 
	
	Debug.Log(p_2d);
	
	if(around_check(p_2d, s_2d) != -1)
	{	
		thinking(s_2d, s_2d);
	}
}