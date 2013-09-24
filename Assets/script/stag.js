#pragma strict

function set_dead()
{
	Debug.Log("im dead");
	this.transform.renderer.material.color = Vector4(0,0,1,1);
}

function set_stag_positon(p : Vector3)
{
	this.transform.position = p;
}

function set_stag_rotation(r : float)
{
	this.transform.rotation.y = r;
}

