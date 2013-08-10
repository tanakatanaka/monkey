#pragma strict

var compass : int = 0;
var floor : GameObject;
var main_camera : Camera;

function Start () 
{
	transform.position = Vector3(3, 0.5, -3);
}

function Update () 
{
	if (Input.GetButtonDown("Fire1")) 
	{
		// クリックしたら移動
		click_area();
	}
}

//斜めを除く1マス以内かどうか判定
function one_square(cp : Vector2) : boolean
{
	if(Mathf.Abs(cp.x - transform.position.x)  + Mathf.Abs(cp.y + transform.position.z) < 2)
	{
		return true;
	}
	return false;
}

//指定マスの内容・座標により行動
function chara_act(act : int, b: board, bp : Vector2)
{
	//0:移動,1:壁,2:プレイヤー,3:クワガタ,4:クワガタのしたい
	if(act == 0)
	{	
		// きりのいい座標にするため、盤面座標から空間座標に変換し直す
		transform.position = b.to_world_point(bp);
	}
	else if(act == 2)
	{
		//何もせずターン経過
	}
	else if(act == 3)
	{
		//クワガタに攻撃
	}
}


function click_area() 
{
	var b : board = floor.GetComponent(board);
	
	// マウスから
	var screenPoint = Input.mousePosition;
	screenPoint.z = 8;
	var worldPoint = main_camera.ScreenToWorldPoint(screenPoint);
	
	// カメラで変換した座標を盤面のXYに直す
	var boardPoint = b.to_board_point(worldPoint);
	
	if (one_square(boardPoint) && b.area_check(boardPoint) != -1)
	{
		chara_act(b.area_check(boardPoint), b, boardPoint);
	}
}