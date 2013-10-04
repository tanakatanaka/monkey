#pragma strict

private var distance : Vector3 = Vector3(0,0,0);
private var arrive_count : int  = 0;
private var arrive_point : Vector3;
private var roll_flag : boolean = false;
private var from : Quaternion;
private var to : Quaternion;

function set_dead()
{
	Debug.Log("im dead");
	this.transform.renderer.material.color = Vector4(0,0,1,1);
}

function set_stag_positon(p : Vector3)
{
	distance = p - this.transform.position;
	arrive_point = p;  
}

function set_roll(angle : float)
{
	this.from = this.transform.rotation;
	this.to = this.from;
	this.to.eulerAngles.y = angle;
	this.roll_flag = true;
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

function roll_animation()
{
	if(this.roll_flag == true)
	{
		this.transform.rotation = Quaternion.Slerp (this.from, this.to, Time.time * 0.2);
	}
	
	if(this.transform.rotation == this.to)
	{
		this.roll_flag = false;
	}
}


function attack_animation()
{
	
}

function Update () 
{
	move_animation();
	roll_animation();
	attack_animation();
}
