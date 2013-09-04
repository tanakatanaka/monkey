#pragma strict
var turn_count : int = 1;
var game_end : int = 0;

function Get_turn()
{
	return this.turn_count;
}

function turn_up()
{
	this.turn_count++;
}

function set_game_end(i : int)
{
	this.game_end = i;
}

function Update ()
{
	
}