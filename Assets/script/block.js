#pragma strict

var life : int = 3;

function Start () 
{

}

function damege_block()
{
	if(this.life > 0){this.life--;}
	if(this.life == 0)
	{
		Destroy(gameObject);
	}
}

function Update () 
{

}