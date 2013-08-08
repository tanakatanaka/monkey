#pragma strict
var board_script : GameObject;
var board = 
[
	[]
];

var out_cube : GameObject;
var line : GameObject;

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
	board =  board_script.GetComponent(board);
	create_pen();
	create_line();
}
