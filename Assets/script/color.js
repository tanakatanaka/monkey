#pragma strict

function Start () 
{
	
}

function Update ()
{ 
	this.renderer.material.color.a = (Mathf.Sin( Time.frameCount / 12 ) + 1) / 2;
}