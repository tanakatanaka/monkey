#pragma strict

var floor : GameObject;
private var b : board;
var turn : GameObject;
private var g : game;

//stagのobject・配列
var stag : GameObject;
private var stags : GameObject[];
var	count : int = 0;


function Start () 
{
	g = turn.GetComponent(game);
	b = floor.GetComponent(board);
	stags = new GameObject[4];
}

function make_stag(p : Vector3)
{
	//位置情報をももらい配列に固体をいれ作成
	stags[count] = Instantiate(stag,p,stag.transform.rotation);
	stags[count].transform.rotation.eulerAngles.y = 90 * Random.Range(0, 4);
	count++;
}

function stag_dead(i : int)
{
	Debug.Log("dead_area");
	Debug.Log(b.to_board_point(stags[i].gameObject.transform.position));
	stags[i].SendMessage("set_dead");
}

function hougaku_plus(point : int) :Vector2 
{
	if(point == 0){return Vector2(0,-1);}
	else if(point == 1){return Vector2(1,0); }
	else if(point == 2){return Vector2(0,1);}
	else {return Vector2(-1,0);}
}

//上下左右に何があるかを返す
function around_check(p : Vector2, houi : int, i : int) : int
{
	var point : int = ( stag_hougaku(i)  + houi ) % 4;
	return b.area_check(p + hougaku_plus(point));	
}

//stagの角度を0~3にして返す
function stag_hougaku(i : int) : int  
{
	return	Mathf.Round( ( stags[i].transform.rotation.eulerAngles.y ) / 90 ); 	
}

//方向転換関数
function change_of_direction(r : int, d : int, l : int, stag_num : int)
{
	var h : int[] = [r, d, l];
	var kouho = new Array();
	
	for (var i = 0; i < 3; i++)
	{
  		if (h[i] == 0 || h[i] == 2)
  		{
    		kouho.Push(i);
  		}
	}
	
	var result : int = kouho[Random.Range(0, kouho.length)];
	var hougaku_result : int = ( (result + 1) + stag_hougaku(stag_num) ) % 4;
	stags[stag_num].transform.rotation.eulerAngles.y = hougaku_result * 90;
}

function thinking(p : Vector2, i : int) : int
{
	//前を探索
	var front = around_check(p, 0, i);
	
	if(front == 0){ return 1; }
	else if(front == 2) { return 0; }
	else
	{
		//前がだめなとき左右下に何があるか確認
		var right = around_check(p, 1, i);
		var down = around_check(p, 2, i);
		var left = around_check(p, 3, i);
		
		if(front == 1)
		{
			if(right != 2 && down != 2 && left != 2) { return 0; }
			else{ change_of_direction(right, down, left, i); }
		}
		else{ change_of_direction(right, down, left, i); }
	}
	
	return -1;
}

function stag_act(i : int)
{
	var area = b.get_stag_area(i);
	var answer = thinking(b.to_board_point(area), i);
	
	//攻撃・移動・方向転換
	if(answer == 0)
	{
		//攻撃する
		Debug.Log("atk stags");
		var atk_area = b.to_board_point( area )+ hougaku_plus(stag_hougaku(i));
		Debug.Log(area);
		Debug.Log(hougaku_plus(stag_hougaku(i)));
		b.atk_point(atk_area);
	}
	else if(answer == 1)
	{
		//移動して記録bordに記録する
		area += b.to_world_point( hougaku_plus( stag_hougaku(i) ) );
		stags[i].SendMessage("set_stag_positon", area);
		b.stag_move_record(b.to_board_point(area), i);
	}
	
	if(b.is_in_wall_area(b.to_board_point(area)))
	{
		Debug.Log("game over");
	}
	
}


function Update () 
{
	if(g.Get_turn() % 2 == 0)
	{
		for(var i = 0; i  < this.count; i++)
		{
			if(stags[i] != null)
			{
				stag_act(i);
			}
		}
		
		g.turn_up();
	}
	
}