#pragma strict

var distance : Vector3 = Vector3(0,0,0);
var arrive_count : int  = 0;
var arrive_point : Vector3;
var role_angle : float = -10;

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

function set_role(angle : float)
{
	this.role_angle = angle;
}

function move_animation()
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

function role_animation()
{
	var now_angle = this.transform.rotation.eulerAngles.y;
	
	if(this.role_angle >= 0)
	{
		if(now_angle > this.role_angle)
		{
			this.transform.rotation.eulerAngles.y -= 5;
		}
		else if(now_angle < this.role_angle)
		{
			this.transform.rotation.eulerAngles.y += 5;
		}
		
		if(Mathf.Abs(now_angle - this.role_angle) < 6)
		{
			this.transform.rotation.eulerAngles.y = this.role_angle;
			this.role_angle  = -10;
		}
	}
}

function attack_animation()
{
	
}

function Update () 
{
	move_animation();
	role_animation();
	attack_animation();
}
