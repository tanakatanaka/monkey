#pragma strict

var max_life : float = 7;
private var life : float = 0;


function set_max(level : int)
{
	//levelに応じて最大値を決定
	if(level == 1 || level == 4 || level == 5) { this.max_life = 8; }
	else if(level == 2 || level == 3) { this.max_life = 7; }
}	
function damege_block()
{
	Debug.Log("dameged block");
	
	if(this.life < this.max_life){ this.life++; }
	if(this.life >= this.max_life)
	{
		DestroyImmediate(this.gameObject);
	}
}

function Update () 
{
	var deep : float = 1 - (this.life / this.max_life);
	
	this.transform.renderer.material.color = Vector4(1, deep, deep, 1);
}