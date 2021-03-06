#pragma strict

var board = 
[
	[1,1,1,1,1,1,1],
	[1,0,0,0,0,0,1],
	[1,0,3,0,3,0,1],
	[1,0,0,2,0,0,1],
	[1,0,3,0,3,0,1],
	[1,0,0,0,0,0,1],
	[1,1,1,1,1,1,1]
];

var record_board = 
[
	[1,1,1,1,1,1,1],
	[1,0,0,0,0,0,1],
	[1,0,3,0,3,0,1],
	[1,0,0,2,0,0,1],
	[1,0,3,0,3,0,1],
	[1,0,0,0,0,0,1],
	[1,1,1,1,1,1,1]
];

var out_cube : GameObject;
var line : GameObject;
var turn : GameObject;
private var start_game : boolean = false; 
private var g : game;
private var blocks : GameObject[];
private var player_area : Vector2;
private var stags_area : Vector2[];

/// 盤面の縦幅と横幅
function get_size() : Vector2
{
	return Vector2(board.Length, board[0].Length);
}

/// board配列の内容にそって駒を配置する
function create_piece()
{
 	var pos:Vector3 = Vector3(0, 0.5, 0);
 	blocks = new GameObject[24];
 	stags_area = new Vector2[5];
 	var block_count = 0;
 	var stag_count = 0;
  	
 	for(var z = 0; z < board.Length; z++)
 	{	
 		pos.x = out_cube.transform.position.x;

 		for(var x = 0; x < board[z].Length; x++)
		{ 
			if(board[z][x] == 1)
			{
				blocks[block_count] = Instantiate(out_cube,pos,out_cube.transform.rotation);
				blocks[block_count].SendMessage("set_max", g.Get_level()); 
				block_count++;
			}
			else if(board[z][x] == 2)
			{
				player_area = Vector2(x,z);
			}
			else if(board[z][x] == 3)
			{
				GameObject.FindWithTag("manage_stag").SendMessage("make_stag", Vector3(x,0.5,-z) );
				stags_area[stag_count] = Vector2(x,z);
				stag_count++;
			}
			pos.x += 1.0;
		}
		pos.z -= 1.0;
	}	
}

/// 盤面に格子を引く
function create_line()
{
	var n : int = get_size().x - 2;
	
	for(var i : int = 0; i < n; i++) 
	{
		var pos : Vector3 = Vector3(0, 0, 0);
		var clone : GameObject = Instantiate(line, pos, line.transform.rotation);
		var lines : LineRenderer = clone.GetComponent(LineRenderer);
		
		lines.SetPosition(0,Vector3(0, 0, -1.5 - 1.0 * i));
		lines.SetPosition(1,Vector3(6.0, 0, -1.5 - 1.0 * i));
		
		var clone2 : GameObject = Instantiate(line, pos, line.transform.rotation);
		var lines2 : LineRenderer = clone2.GetComponent(LineRenderer);
		
		lines2.SetPosition(0,Vector3(1.5 + 1.0 * i, 0,  0));
		lines2.SetPosition(1,Vector3(1.5 + 1.0 * i, 0, -6.0));
	}	
}

function level_set()
{
	var level = g.Get_level();
	
	if(level == 1) { board[2][4] = 0; }
	else if(level >= 4) { board[2][3] = 3; }
}

function Start () 
{
	g = turn.GetComponent(game);
}

/*
area_checkは判定と計算が混じってたので以下３つに処理を分けました
あとXZ座標をVector2というXYだけの構造体にまとめました
*/

//playerの空間座標を返す
function get_player_area() : Vector3
{
	return to_world_point(player_area);
}
//指定番目のstagの空間座標を返す
function get_stag_area(num : int) : Vector3
{
	return to_world_point(stags_area[num]);
}

//指定位置のblockの番号を返す
function serch_brock_num(p : Vector3) : int
{
	for(var i = 0; i < blocks.Length; i++)
	{
		if( (blocks[i].gameObject != null) && (blocks[i].gameObject.transform.position == p) )
		{
			return i;
		}
	}
	return -1;
}

//指定の配列位置のstagの番号を返す
function serch_stag_num_2d(p : Vector2) : int
{
	for(var i = 0; i < stags_area.Length; i++)
	{
		if( (stags_area[i] != null) && (stags_area[i] == p ) )
		{
			return i;
		}
	}
	return -1;
}


//移動前の配列を0(何もない)にして,現在の位置を配列に記録
function move_record(last_p : Vector2, presant_p : Vector2, c_val : int)
{
	//配列ではyがたてxが横なのでyxの順番で
	
	board[last_p.y][last_p.x] = 0;
	if(c_val == 2){ player_area = presant_p; }	
	board[presant_p.y][presant_p.x] = c_val;
}
//stagの移動前の配列を0にして,現在の位置を配列に記録(stag.only)
function stag_move_record(presant_p : Vector2, num : int)
{
	board[stags_area[num].y][stags_area[num].x] = 0;
	stags_area[num] = presant_p;
	board[presant_p.y][presant_p.x] = 3;
	
}

// 座標位置内であれば配列内情報を返す
function area_check(p : Vector2) : int
{
	if(is_in_area(p))
	{
		// 配列内情報を返す
		return board[p.y][p.x];
	}
	//bord外の場合
	return  -1;
}

// 座標が配列内か調べる
function is_in_area(p : Vector2) : boolean
{
	return 0 <= p.x && p.x < board.Length && 0 <= p.y && p.y < board[0].Length;
}

//stagが壁の位置か調べる
function is_in_wall_area(p : Vector2) : boolean
{
	return p.x < 1 || p.x > 5 || p.y < 1 || p.y > 5;	
}

// 配列座標を空間座標に変換する
function to_world_point(p : Vector2) : Vector3
{
	return Vector3(p.x, 0.5, -p.y);
}
	
// 空間座標を配列座標に変換する
function to_board_point(position : Vector3) : Vector2
{
	return Vector2(Mathf.RoundToInt(position.x),-Mathf.RoundToInt(position.z));
}

//指定配列座標を攻撃する
function atk_point(p : Vector2) : boolean
{
	var content = area_check(p);
	var num;
	
	//Debug.Log(p);

	if(content ==  1)
	{
		num = serch_brock_num(to_world_point(p));
		
		if(blocks[num].gameObject != null)
		{
			blocks[num].SendMessage("damege_block");
		} 
		
		if(blocks[num].gameObject == null)
		{	
			move_record(p, p, -5);
		}
	}
	else if(content == 2)
	{
		GameObject.FindWithTag("game").SendMessage("game_end", false);
		GameObject.FindWithTag("Player").SendMessage("set_end", false);
		Debug.Log("Game over");
	}
	else if(content ==  3)
	{
		num = serch_stag_num_2d(p);
		
		GameObject.FindWithTag("manage_stag").SendMessage("stag_dead", num);
		move_record(p, p, 4);
	}
}

function Update () 
{
	if(this.start_game == false && g.Get_level() != 0)
	{
		level_set();
		create_piece();
		create_line();
		this.start_game = true;
	}
}