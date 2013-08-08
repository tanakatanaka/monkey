#pragma strict

private var compass : int;
var game : GameObject;



function Start () 
{
	this.gameObject.transform.position = Vector3(3, 0.5, -3);
	compass = 1;
}

function move_chara()
{
/*
	var mas =  game.GetComponent(select_mas);
	
	if(mas.click_area != Vector3(0,0,0) && this.gameObject.transform.position != mas.click_area)
	{
		this.gameObject.transform.Translate(mas.click_area);
	}
*/	
}

function Update () 
{
	move_chara();
}