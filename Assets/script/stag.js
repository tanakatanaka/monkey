#pragma strict

var floor : GameObject;
private var b : board;

function Start () 
{
	b = floor.GetComponent(board);
	transform.position = b.get_stag_area();
}

function around_check(p_2d : Vector2, s_2d : Vector2) : int
{
	var x = p_2d.x - s_2d.x;
	var y = p_2d.y - s_2d.y;
	
	if(y == -1 && x == 0)
	{
		Debug.Log("mae iru");
		return 0;
	}
	else if(y == 0 && x == 1)
	{
		Debug.Log("migi iru");
		return 1;
	}
	else if(y == 1 && x == 0)
	{
		Debug.Log("usiro iru");
		return 2;
	}
	else if(y == 0 && x == -1)
	{
		Debug.Log("hidari iru");
		return 3;
	}
	
	return -1;
}

function rote_plus() : Vector3
{
	var compass = transform.rotation.y /90;

	if(compass == 0) { return Vector3(0,0,1); }
	else if(compass == 1){ return Vector3(1,0,0); }
	else if(compass == 2){ return Vector3(0,0,-1); }
	return Vector3(-1,0,0);
}

function thinking(relation : int) : int
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
	
	var relation = around_check(p_2d, s_2d);
	
	if(relation != -1)
	{	
		thinking(relation);
	}
	else
	{
		//周りにplayerがいなければ前に進む
		var destination = transform.position + rote_plus();
		var result = b.area_check(b.to_board_point(destination));
		
		if(result != -1 && result != 1)
		{	
			transform.position = destination;
		}
	}
}

