#pragma strict

private var distance : Vector3 = Vector3(0,0,0);
private var arrive_count : int  = 0;
private var arrive_point : Vector3;
private var target_angle : float = -110;

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
	var now_angle = this.transform.rotation.eulerAngles.y;
	
	if(now_angle == 0 && angle == 270) { angle = -90;}
	else if(now_angle == 270 && angle == 0) { angle = 360;}
	
	Debug.Log("angle");
	Debug.Log(angle);
	this.target_angle = angle;
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

	if(this.target_angle > -100)
	{
		if(Mathf.Abs(now_angle - this.target_angle) < 40)
		{
			if(this.target_angle == -90) { this.target_angle = 270;}
			else if(this.target_angle == 360) { this.target_angle = 0;}
			
			this.transform.rotation.eulerAngles.y = this.target_angle;
			this.target_angle  = -110;
		}
		else if(now_angle > this.target_angle)
		{
			this.transform.rotation.eulerAngles.y -= 5;
		}
		else if(now_angle < this.target_angle)
		{
			this.transform.rotation.eulerAngles.y += 5;
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
