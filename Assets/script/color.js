#pragma strict

private var color : int;
var origin_p : Vector3;

function Start () 
{
	color = 0;
	this.transform.position.y = 0.1;
	origin_p = this.transform.position;
}

function set_color(c : int)
{
	this.color = c;
}

function set_area(p : Vector3)
{
	p.y = 0;
	this.transform.position = p + origin_p;
}


function Update ()
{ 
	if(color != 0)
	{
		this.renderer.material.color.a = (Mathf.Sin( Time.frameCount / 20 ) + 1) / 2 + 0.2;
	}
	else if(color == 0)
	{
		this.renderer.material.color.a = 0;
	}
}