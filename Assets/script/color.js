#pragma strict

var color : int = 0;
var origin_p : Vector3;
var time_count : int = 0;

function Start () 
{
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

function reset_time()
{
	this.time_count = 0;
}

function Update ()
{ 
	this.time_count++;
	
	if(this.color == 1 || this.color == 4 || this.color == -1)
	{
		this.renderer.material.color.a = 0;
	}
	else
	{
		this.renderer.material.color.a = (Mathf.Sin( this.time_count / 20 ) + 1) / 2 - 0.3;
	}
}