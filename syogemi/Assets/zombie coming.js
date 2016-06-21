
#pragma strict
 
var target : GameObject;
var speed :float =  1.0;
var gravity : float = 20.0;

//これは敵の認識範囲にいるかどうかのフラグ
private var isEnable =  false;
 
function Update () {
    //さっきaddConponentしたCharacterControllerを呼び出しています
    var controller : CharacterController = GetComponent(CharacterController);
    var moveDirection : Vector3 = Vector3.zero;
 
    //認識範囲にいれば
    if(isEnable==true){

        //アニメーションで走らせます
    	GetComponent.<Animation>().Play("walk");

        //mobの位置と自分の位置の差分をとって距離をはかり、0でなければ
	if (Vector3.Distance(transform.position, target.transform.position)) {
//自分の位置をtargetDirectionに入れて
             var targetDirection : Vector3 = target.transform.position;
//敵が浮かない様に縦座標は0に固定します
	     targetDirection.y = 0;
//敵の向きを自分に向かせます
	     transform.rotation = Quaternion.Slerp(transform.rotation, Quaternion.LookRotation(targetDirection - transform.position), Time.time * 0.1);
	 
             //敵のスピードと重力か次の位置を計算して移動させます
	     moveDirection += transform.forward * 1;
	     moveDirection.y -= gravity * Time.deltaTime;
	     controller.Move(moveDirection * Time.deltaTime * speed);
	}
    }
}


/**
 * 円の範囲に入ったときのハンドラ
 */
function OnTriggerEnter( colobj : Collider ){
    //円に入ったのがPlayerのタグがついているオブジェクトなら
    if(colobj.tag == 'Player'){
//isEnableをtrueにして入ったオブジェクトをtarget変数に入れます
         isEnable =  true;
         target= colobj.gameObject;


         //音鳴らします
         GetComponent(AudioSource).Play();
    }
}

/**
 * 円の範囲外に出た時のハンドラ
 */
function OnTriggerExit( colobj : Collider ){
    //出たのがPlayerタグがついているオブジェクトなら
    if(colobj.tag == 'Player'){
        //フラグをfalseにする
        isEnable = false;
    }
}