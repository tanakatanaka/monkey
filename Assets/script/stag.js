#pragma strict

function set_dead()
{
	Destroy(this.gameObject);
	Debug.Log("im dead");
}

function set_stag_positon(p : Vector3)
{
	this.transform.position = p;
}

function set_stag_rotation(r : float)
{
	this.transform.rotation.y = r;
}

