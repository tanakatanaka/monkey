#pragma strict

var floor : GameObject;
var main_camera : Camera;
var turn : GameObject;
private var g : game;
private var b : board;

var color : GameObject;
private var colors : GameObject[];


function create_colors()
{
	colors[0] = Instantiate(color,b.to_world_point(Vector2(0,-1)),color.transform.rotation);
	colors[1] = Instantiate(color,b.to_world_point(Vector2(1,0)),color.transform.rotation);
	colors[2] = Instantiate(color,b.to_world_point(Vector2(0,1)),color.transform.rotation);
	colors[3] = Instantiate(color,b.to_world_point(Vector2(-1,0)),color.transform.rotation);
	colors[4] = Instantiate(color,b.to_world_point(Vector2(0,0)),color.transform.rotation);
}

function Start () 
{
	g = turn.GetComponent(game);
	b = floor.GetComponent(board);
	transform.position = b.get_player_area();
	colors = new GameObject[5];
	create_colors();
}

function Update () 
{
	if(g.Get_turn() % 2 == 1)
	{
		GameObject.FindWithTag("color").SendMessage("set_area", this.transform.position);
		GameObject.FindWithTag("color").SendMessage("set_color", 1);
		if (Input.GetButtonDown("Fire1")) 
		{
			// クリックしたら移動
			click_area();
			GameObject.FindWithTag("color").SendMessage("set_color", 0);
		}
	}
}

//斜めを除く1マス以内かどうか判定
function one_square(cp : Vector2) : boolean
{
	var pp = b.to_board_point(transform.position);
	if(Mathf.Abs(cp.x - pp.x)  + Mathf.Abs(cp.y - pp.y) < 2)
	{
		return true;
	}
	return false;
}

//指定マスの内容・座標により行動
function chara_act(act : int, bp : Vector2)
{
	//0:移動,1:壁,2:プレイヤー,3:クワガタ,4:クワガタのしたい
	if(act == 0)
	{	
		// きりのいい座標にするため、盤面座標から空間座標に変換し直す
		b.move_record(b.to_board_point(transform.position), bp, 2);
		transform.position = b.to_world_point(bp);
	}
	else if(act == 3)
	{
		//攻撃
		Debug.Log("atk players");
		b.atk_point(bp);
	}
	
	g.turn_up();
}


function click_area() 
{
	// マウスから
	var screenPoint = Input.mousePosition;
	screenPoint.z = 8;
	var worldPoint = main_camera.ScreenToWorldPoint(screenPoint);
	
	// カメラで変換した座標を盤面のXYに直す
	var boardPoint = b.to_board_point(worldPoint);
	
	if (one_square(boardPoint))
	{
		chara_act(b.area_check(boardPoint), boardPoint);
	}
	
}