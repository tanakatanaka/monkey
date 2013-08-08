#pragma strict

var compass : int = 0;
var floor : GameObject;

function Start () 
{
	this.gameObject.transform.position = Vector3(3, 0.5, -3);
}

function move_chara()
{
	var mas : Vector3 = floor.GetComponent("Board").select_pos;
	
	if (mas != Vector3.zero && this.gameObject.transform.position != mas)
	{
		this.gameObject.transform.Translate(mas);
	}
}

function Update () 
{
	move_chara();
}