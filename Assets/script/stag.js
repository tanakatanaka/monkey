#pragma strict

var compass : int = 0;
var floor : GameObject;
private var b : board;

function Start () 
{
	b = floor.GetComponent(board);
	transform.position = b.get_stag_area();
}

function thinking()
{
	var p_2d : Vector2 = b.to_board_point(b.get_player_area());
	var s_2d : Vector2 = b.to_board_point(transform.position);  
	
	//プレイヤーが近くにいる場合
	if(1)
	{
		//横にプレイヤーがいたら
		
		//後ろにプレイヤーがいたら
	}
	else
	{
	
	}
	
} 

function Update () 
{
	thinking();
}