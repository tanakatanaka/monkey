#pragma strict

var distance : Vector3 = Vector3(0,0,0);
var arrive_count : int  = 0;
var arrive_point : Vector3;

function set_dead()
{
	Debug.Log("im dead");
	this.transform.renderer.material.color = Vector4(0,0,1,1);
}

function set_stag_positon(p : Vector3)
{
	distance = p - this.transform.position;
	arrive_point = p;  
	//this.transform.position = p;
}

function set_stag_rotation(r : float)
{
	this.transform.rotation.y = r;
}

function Update () 
{
	var cut = 30;

	if(distance != Vector3(0,0,0))
	{
		if(arrive_count != cut)
		{
			this.transform.position += distance / cut;
			arrive_count++;
		}
		else
		{
			this.transform.position = arrive_point;
			distance = Vector3(0,0,0);
			arrive_count = 0;
		}
	}
}
