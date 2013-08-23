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
	count++;
}

function stag_act(i : int)
{
	Debug.Log(i);
	var area = b.get_stag_area(i);
	area.z += 1.0;
	stags[i].SendMessage("set_stag_positon", area);
	//今bord側に移動を記録させてないので初動のみ
}


function Update () 
{
	if(g.Get_turn() % 2 == 0)
	{
		for(var i = 0; i  < this.count; i++)
		{
			stag_act(i);
		}
		
		g.turn_up();
	}
	
}