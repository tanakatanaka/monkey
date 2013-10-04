#pragma strict

private var distance : Vector3 = Vector3(0,0,0);
private var arrive_count : int  = 0;
private var arrive_point : Vector3;

/* 回転関係の変数 */

// 回転にかかる秒数 (定数)
private var ROTATION_DURATION : float = 1 / 4.0f;
// 回転を始めた時刻
private var rotation_started_time : float = -1;
// 回転もとの姿勢
private var from : Quaternion;
// 回転先の姿勢
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
	this.rotation_started_time = Time.time;
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
  var delta : float = Time.time - this.rotation_started_time;
  
	if(delta < ROTATION_DURATION)
	{
		this.transform.rotation = Quaternion.Slerp(this.from, this.to, delta / ROTATION_DURATION);
	}
	else if (this.rotation_started_time > 0)
	{
	  this.transform.rotation = this.to;
	  this.rotation_started_time = -1;
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
