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

function rote_plus() : Vector2
{
	if(compass == 0)
	{
		return Vector2(0,1);
	}
	else if(compass == 1)
	{
		return Vector2(1,0);
	}
	else if(compass == 2)
	{
		return Vector2(0,-1);
	}
	
	return Vector2(-1,0);
}

function thinking(p_2d : Vector2, s_2d : Vector2) : int
{
	if(s_2d == p_2d + rote_plus())
	{
		Debug.Log("ore no mae");
	}
	return 1;
} 

function Update () 
{
	var p_2d : Vector2 = b.to_board_point(b.get_player_area());
	var s_2d : Vector2 = b.to_board_point(transform.position); 
	
	if(Mathf.Abs(p_2d.x - s_2d .x) < 2 || Mathf.Abs(p_2d.y - s_2d .y) < 2)
	{	
		Debug.Log("gagaga");
		thinking(s_2d, s_2d);
	}
}