#pragma strict

var upperStyle : GUIStyle;
var labelStyle : GUIStyle;

private var s : swit;
var floor : GameObject;

function Start ()
{
	s = floor.GetComponent(swit);
}



function OnGUI()
{
	var page = s.Get_page();

	var sw : float = Screen.width;
	var sh : float = Screen.height;
	
	var size_y : float = Screen.height / 8;
	
	if(page == 1)
	{
		GUI.Label(Rect(0, sh/10, sw, sh / 1.5), "ゲームについて", upperStyle);
		GUI.Label(Rect(0, sh/10 , sw, sh / 1.5), "Playerとmonkeyが交互に行動するターン制RPG", labelStyle);
		GUI.Label(Rect(0, sh/10 + size_y, sw, sh / 1.5), "Playerを操作してmonkeyを全て倒してください", labelStyle);
	}
	else if(page == 2)
	{
		GUI.Label(Rect(0, sh / 10, sw, sh / 1.5), "playerについて", upperStyle);
		GUI.Label(Rect(0, sh/10, sw, sh / 1.5), "monkeyを全て倒すと勝ち", labelStyle);
		GUI.Label(Rect(0, sh/10+ size_y, sw, sh / 1.5 + 20), "青マスが行動可能範囲です", labelStyle);
		GUI.Label(Rect(0, sh/10+ size_y*2, sw, sh / 1.5 + 20), "青マスにmonkeyがいる場合攻撃します", labelStyle);
	}
	else if(page == 3)
	{
		GUI.Label(Rect(0, sh / 10, sw, sh / 1.5), "monkeyについて", upperStyle);
		GUI.Label(Rect(0, sh/10, sw, sh / 1.5), "monkeyに攻撃されるか壁を抜けられると負けです", labelStyle);
		GUI.Label(Rect(0, sh/10+ size_y, sw, sh / 1.5 + 20), "正面にしか攻撃・移動できません", labelStyle);
		GUI.Label(Rect(0, sh/10+ size_y*2, sw, sh / 1.5 + 20), "方向転換に1ターンかかります", labelStyle);
	}
	else if(page == 4)
	{
		GUI.Label(Rect(0, sh / 10, sw, sh / 1.5), "その他", upperStyle);
		GUI.Label(Rect(0, sh/10, sw, sh / 1.5), "shuffleボタンはランダムでmonkeyの方向を変えます", labelStyle);
		GUI.Label(Rect(0, sh/10+ size_y, sw, sh / 1.5 + 20), "shuffleボタンはターン消費しません", labelStyle);
		GUI.Label(Rect(0, sh/10+ size_y*2, sw, sh / 1.5 + 20), "時間制限はないのでゆっくり考えましょう", labelStyle);
	}
	
}