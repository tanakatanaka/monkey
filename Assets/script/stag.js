#pragma strict

/* 移動モーション関係の変数 */

// 移動にかかる秒数 (定数)
private var MOVE_DURATION : float = 2;
// 移動を始めた時刻 (-1だと動いていない)
private var move_started_time : float = -1;
// 移動もとの座標
private var move_from : Vector3;
// 移動先の座標
private var move_to : Vector3;

/* 回転関係の変数 */

// 回転にかかる秒数 (定数)
private var ROTATION_DURATION : float = 2;
// 回転を始めた時刻 (-1だと動いていない)
private var rotate_started_time : float = -1;
// 回転もとの姿勢
private var rotate_from : Quaternion;
// 回転先の姿勢
private var rotate_to : Quaternion;

function set_dead()
{
	Debug.Log("im dead");
	this.transform.renderer.material.color = Vector4(0,0,1,1);
}

// アニメが動作中のアニメを待つ。manage_stagでターン開始時に使っている。
function is_animating()
{
	return this.move_started_time > 0 || this.rotate_started_time > 0;
}

function set_stag_positon(p : Vector3)
{
	this.move_from = this.transform.position;
	this.move_to = p;
	this.move_started_time = Time.time;
}

function set_roll(angle : float)
{
	this.rotate_from = this.transform.rotation;
	this.rotate_to = this.rotate_from;
	this.rotate_to.eulerAngles.y = angle;
	this.rotate_started_time = Time.time;
}

function move_animation()
{
	var delta : float = Time.time - this.move_started_time;
	
	if(delta < MOVE_DURATION)
	{
		this.transform.position = Vector3.Lerp(this.move_from, this.move_to, delta / MOVE_DURATION);
	}
	else if (this.move_started_time > 0)
	{
	  this.transform.position = this.move_to;
	  this.move_started_time = -1;
	}
}

function roll_animation()
{
	var delta : float = Time.time - this.rotate_started_time;
	
	if(delta < ROTATION_DURATION)
	{
		this.transform.rotation = Quaternion.Slerp(this.rotate_from, this.rotate_to, delta / ROTATION_DURATION);
	}
	else if (this.rotate_started_time > 0)
	{
		this.transform.rotation = this.rotate_to;
		this.rotate_started_time = -1;
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
