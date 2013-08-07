#pragma strict

private var compass : int;

function Start () 
{
	this.gameObject.transform.position = Vector3(3, 0.5, -3);
	compass = 1;
}

function move_chara()
{
	var targ_poss : Vector3 = GameObject.FindWithTag("camera").SendMessage("get_click_area");
	
	if(targ_poss != Vector3(0,0,0) && this.gameObject.transform.position != targ_poss)
	{
		this.gameObject.transform.Translate(targ_poss);
	}
	
}

function Update () 
{
	move_chara();
}