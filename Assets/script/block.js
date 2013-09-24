#pragma strict

var max_life : int = 5;
private var life : int = 0;

function Start () 
{

}

function damege_block()
{
	Debug.Log("dameged block");
	
	if(this.life < this.max_life){ this.life++; }
	if(this.life == this.max_life)
	{
		DestroyImmediate(this.gameObject);
	}
}

function Update () 
{
	var deep : float = 1 - (this.life / this.max_life);
	this.transform.renderer.material.color.g = deep;
	this.transform.renderer.material.color.b = deep;
}