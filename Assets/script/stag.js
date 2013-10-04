#pragma strict

private var distance : Vector3 = Vector3(0,0,0);
private var arrive_count : int  = 0;
private var arrive_point : Vector3;

private var from :  Transform;
private var to :  Transform;

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

function set_role(angle : float)
{
	this.from = this.transform;
	this.to = this.from;
	this.to.rotation.eulerAngles.y = angle;
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
	this.transform.rotation = Quaternion.Lerp (from, to, Time.time * 0.1);
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
