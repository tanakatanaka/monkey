#pragma strict

var life : int = 3;

function Start () 
{

}

function damege_block()
{
	Debug.Log("dameged block");
	
	if(this.life > 0){this.life--;}
	if(this.life == 0)
	{
		DestroyImmediate(this.gameObject);
	}
}

function Update () 
{

}