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
	
		for(var i = 0; i < colors.length; i++)
		{
			colors[i].SendMessage("set_area", this.transform.position);
			colors[i].SendMessage("set_color", 1);
		}
		
		if (Input.GetButtonDown("Fire1")) 
		{
			// クリックしたら移動
			click_area();
			for(i = 0; i < colors.length; i++)
			{
				colors[i].SendMessage("set_color", 0);
			}
		}
	}
}

//playerの方向をクリック方向にする
function turn_player(diff : Vector2)
{
	var hougaku : int = 0;
			
	if(diff == Vector2(0, -1)) { hougaku = 0;}
	else if(diff == Vector2(1, 0)) { hougaku = 1; }
	else if(diff == Vector2(0, 1)) { hougaku = 2; }
	else if(diff == Vector2(-1, 0)) { hougaku = 3; }

	this.transform.rotation.eulerAngles.y = hougaku * 90;
}

//斜めを除く1マス以内かどうか判定
function one_square(cp : Vector2) : boolean
{
	var pp = b.to_board_point(transform.position);
	var diff = Vector2(cp.x - pp.x, cp.y - pp.y);
	
	if(Mathf.Abs(diff.x) + Mathf.Abs(diff.y) < 2)
	{
		if(diff != Vector2(0,0)) { turn_player(diff); }
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