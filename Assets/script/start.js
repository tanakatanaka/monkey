/*
var bullet: GameObject;
var out_cube : GameObject;
var line : GameObject;
var turn : int = 1;
var click_area : Vector3;

function create_pen()
{
 	var pos:Vector3 = out_cube.transform.position;
 	
 	for(var x = 0; x < board.Length; x++)
 	{	
 		pos.z = out_cube.transform.position.z;

 		for(var z = 0; z < board[x].Length; z++)
		{
			if(board[x][z] == 1)
			{
				Instantiate(out_cube,pos,out_cube.transform.rotation); 
			}
			pos.z -= 1.0;
		}
		pos.x += 1.0;
	}	
}

function create_line()
{
	for(var i = 0; i < 4; i++) 
	{
		var pos : Vector3 = Vector3(0, 0, 0);
		var clone : GameObject = Instantiate(line, pos, line.transform.rotation);
		var lines : LineRenderer = clone.GetComponent(LineRenderer);
		
		lines.SetPosition(0,Vector3(0, 0, -1.5 - 1.0 * i));
		lines.SetPosition(1,Vector3(6.0, 0, -1.5 - 1.0 * i));
		
		var clone2 : GameObject = Instantiate(line, pos, line.transform.rotation);
		var lines2 : LineRenderer = clone2.GetComponent(LineRenderer);
		
		lines2.SetPosition(0,Vector3(1.5 + 1.0 * i, 0,  0));
		lines2.SetPosition(1,Vector3(1.5 + 1.0 * i, 0, -6.0));
	}	
}

function Start () 
{
	create_pen();
	create_line();
}

function area_check(x : int, z : int)
{
	if(x < 0 || x > 6 || z > 0 || z < -6)
	{
		Debug.Log("soto dayo");
		return 0;
	}
	
	z = -z;
	
	if(board[x][z] > 0)
	{
		Debug.Log("nannka aru");
		return 0;
	}
	else
	{
		board[x][z] = 1; 
		click_area = Vector3(x, 0.5, z);
	}
	
	return 1;
}


function Update () 
{
	if( Input.GetButtonDown("Fire1")) 
	{
		var screenPoint = Input.mousePosition;
		screenPoint.z = 8.0;
		var worldPoint = camera.ScreenToWorldPoint(screenPoint);
		worldPoint.x = Mathf.RoundToInt(worldPoint.x);
		worldPoint.z = Mathf.RoundToInt(worldPoint.z);
		worldPoint.y = 0.5;
		
		Debug.Log(worldPoint);
		
		if(area_check(worldPoint.x, worldPoint.z))
		{	
			//var bul : GameObject = Instantiate(bullet, worldPoint, transform.rotation);
		}
	}
}
*/