#pragma strict

var board = 
[
	[1,1,1,1,1,1,1],
	[1,0,0,0,0,0,1],
	[1,0,0,0,0,0,1],
	[1,0,0,0,0,0,1],
	[1,0,0,0,0,0,1],
	[1,0,0,0,0,0,1],
	[1,1,1,1,1,1,1]
];

var out_cube : GameObject;
var line : GameObject;
var bullet : GameObject;


/// 盤面の縦幅と横幅
function get_size() : Vector2
{
	return Vector2(board.Length, board[0].Length);
}

/// board配列の内容にそって駒を配置する
function create_piece()
{
 	var pos:Vector3 = Vector3(0, 0.5, 0);
 	
 	for(var x = 0; x < board.Length; x++)
 	{	
 		pos.z = out_cube.transform.position.z;

 		for(var z = 0; z < board[x].Length; z++)
		{
			if(board[x][z] == 1)
			{
				Instantiate(out_cube,pos,out_cube.transform.rotation); 
			}
			if(board[x][z] == 2)
 			{
 				
			}
			pos.z -= 1.0;
		}
		pos.x += 1.0;
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

function Start () 
{
	create_piece();
	create_line();
}

/*
area_checkは判定と計算が混じってたので以下３つに処理を分けました
あとXZ座標をVector2というXYだけの構造体にまとめました
*/

// 座標位置内であれば配列内情報を返す
function area_check(p : Vector2) : int
{
	if(is_in_area(p))
	{
		// 配列内情報を返す
		return board[p.x][p.y];
	}
	//bord外の場合
	return  -1;
}

// 座標が配列内か調べる
function is_in_area(p : Vector2) : boolean
{
	return 0 <= p.x && p.x < board.Length && 0 <= p.y && p.y < board[0].Length;
}

// 配列座標を空間座標に変換する
function to_world_point(p : Vector2) : Vector3
{
	return Vector3(p.x, 0.5, -p.y);
}

// 空間座標を配列座標に変換する
function to_board_point(position : Vector3) : Vector2
{
	return Vector2(Mathf.RoundToInt(position.x), -Mathf.RoundToInt(position.z));
}

function Update () 
{
}