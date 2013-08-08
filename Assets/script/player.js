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
		move_chara();
	}
}

function move_chara() 
{
	var b : board = floor.GetComponent(board);
	
	// マウスから
	var screenPoint = Input.mousePosition;
	screenPoint.z = 8;
	var worldPoint = main_camera.ScreenToWorldPoint(screenPoint);
	
	// カメラで変換した座標を盤面のXYに直す
	var boardPoint = b.to_board_point(worldPoint);
	
	Debug.Log(boardPoint);
	
	// 移動していいか調べる
	if (b.area_check(boardPoint))
	{	
		// var bul : GameObject = Instantiate(bullet, worldPoint, transform.rotation);
		
		// きりのいい座標にするため、盤面座標から空間座標に変換し直す
		var charaPoint = b.to_world_point(boardPoint);
		
		transform.position = charaPoint;
	}
}