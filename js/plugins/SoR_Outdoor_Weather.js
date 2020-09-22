//=============================================================================
// SoR_Outdoor_Weather.js
// MIT License (C) 2020 蒼竜 @soryu_rpmaker
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Latest version v1.03 (2020/08/11)
//=============================================================================


/*:ja
 * @plugindesc ＜屋内天候無効＞ 屋内扱いのマップで天候の影響を無効化します。
 * @author 蒼竜　@soryu_rpmaker
 *
 * 
 * @help
 * イベントコマンドの「天候の設定」では、マップ上に雨や雪のエフェクトを発生させる
 * ことができますが、RPGツクールで作るマップそのものに「屋内」や「屋外」の
 * 概念がないために、「屋内にいるにも関わらず雨がザーザー降っている」といった
 * おかしな現象が発生します。
 * マップの出入りに応じて「天候の設定」コマンドを実行するにも、
 * あるスイッチがONになっている間などのフラグ情報に従って天候の変更を
 * 行うような場合、エディタ上での管理が煩雑になります。
 * 
 * 本プラグインは、屋外扱いするマップのIDを予め指定しておくことによって
 * 屋内扱いのマップにいる間の天候設定を無効化します。
 * (屋外へ出ると、設定されていた天候は再び復活します。)
 *
 * -----------------------------------------------------------
 * 用法 (プラグイン設定)
 * -----------------------------------------------------------
 * 
 *　プラグイン管理で、SoR_Outdoor_Weatherのパラメータ Map_IDs に
 * 「屋外扱い」としたい（天候の設定による影響を受けたいマップ）のIDを指定してください。
 * カンマ区切りと、ハイフンを用いた連番での入力に対応しています。
 *
 * 例1) 30番のマップ
 * 30
 * 例2) 4から8番のマップ
 * 4-8
 * 例3) 2,5,6番と10から13番のマップと、100番のマップ
 * 2,5,6,10-13,100
 *
 *
 * イベントコマンド「天候の設定」を通常通りに呼び出してください。
 * 屋外マップでは、RPGツクールのデフォルトの挙動をとり、
 * 屋内へ移動している間だけ、天候の影響を無効化します。
 *
 * なお、屋内マップにいる間に「天候の設定」を呼び出した場合は、
 * 設定が屋外へ出るまでストックされ、屋外へ出た時点で反映されます。
 *
 *
 * 詳細な用例は
 * http://dragonflare.dip.jp/dcave/
 * に記載しています。
 *
 *
 * -----------------------------------------------------------
 * バージョン情報
 * -----------------------------------------------------------
 * v1.03 (2020/08/11)       SoR命名規則統一(機能変更はありません)
 * v1.02 (2020/06/04)      プラグインコマンド処理修正  
 * v1.01 (2020/05/20)      天候の戦闘シーンへの反映オプション追加  
 * v1.00 (2020/05/14)       公開  
 *
 * @param Map_IDs
 * @desc 屋外扱いとするマップID (「天候の設定」による変化を受けるマップのID)
 * @default 1-3
 *
 * @param IsBattleWeather_enable
 * @desc 'true'の時、天候設定を戦闘シーンにも反映します。
 * @default true
 * @type boolean
 */
 /*:
 * @plugindesc <Disable Weather Effect for Indoor maps> Disable the changeWeather command in specified maps as indoor. 
 * @author Soryu @soryu_rpmaker
 *
 *
 * @help 
 * ------------------------------------------------------------
 * How to use
 * ------------------------------------------------------------
 * - Specify a parameter "Map_IDs" of SoR_Outdoor_Weather in the plugin manager 
 *   for outdoor maps which you want to apply weather change. 
 *   We can use , to separate multiple IDs and - to range multiple IDs.
 *
 * Ex) For a map whose ID is 30
 * 30
 *
 * Ex) For maps whose IDs are 4 to 8
 * 4-8
 *
 * Ex) For maps whose IDs are 2, 5, 6, 10 to 13, and 100
 * 2,5,6,10-13,100
 *
 * In RPGMV, you call an event command for weather settings as usual.
 * If a player is outdoor, your game takes default behavior in RPGMV.
 * While indoor, the weather setting is disable. After moving to outdoor,
 * the weather is restored.
 * 
 * Note that if you call an event command for weather settings indoor,
 * the weather setting is (temporally stored, and) applied after 
 * the player goes to outdoor.
 *
 * To get more instructions, see http://dragonflare.dip.jp/dcave/ .
 *
 *
 * ------------------------------------------------------------
 * Version info
 * ------------------------------------------------------------
 * v1.03 (Aug 11, 2020)      Unified the regulation of naming SoR variables (no functions are modified)
 * v1.02 (Jun 04, 2020)       Modified for a plugin command
 * v1.01 (May 20, 2020)       An option enables weather effect in battle scene is implemented.
 * v1.00 (May 14, 2020)       Released!
 *
 * @param Map_IDs
 * @desc ID of maps whose weather effect are disabled
 * @default 1-3
 *
 * @param IsBattleWeather_enable
 * @desc If 'true', the weather setting is also applied to battle scene.
 * @default true
 * @type boolean
 */
 



(function () {

  var Parameters = PluginManager.parameters('SoR_Outdoor_Weather');
  var IsBattleWeather_enable = Boolean(Parameters['IsBattleWeather_enable'] === 'true' || false);
  
	var SoR_OW_GT_initialize = Game_Temp.prototype.initialize;
	Game_Temp.prototype.initialize = function() {
		this._weather_disableIDs = convParam2MapID(Parameters);
		this._weather_disable_flag = false;
		this._weather_enable_inBattle = IsBattleWeatherEnable(Parameters);
		this._weather_stack = [];
		
		SoR_OW_GT_initialize.call(this);
	};

	var SoR_OW_GM_setup = Game_Map.prototype.setup;
	Game_Map.prototype.setup = function(mapId){
		SoR_OW_GM_setup.call(this, mapId);

		var i;
		var len = $gameTemp._weather_disableIDs.length;
		for(i=0;i<len;i++){
		   if( $gameMap.mapId() == $gameTemp._weather_disableIDs[i] ){
			 $gameTemp._weather_disable_flag = false;
			 break;
		   }
		}
		if(i == len) $gameTemp._weather_disable_flag = true;
		
		//move to outdoor && with weather change 
		// (-> restore weather settings)
		if(!$gameTemp._weather_disable_flag && $gameTemp._weather_stack.length != 0 ){
			var type = $gameTemp._weather_stack.shift();
			var power = $gameTemp._weather_stack.shift();
			$gameScreen.changeWeather(type, power, 1);
		}
		//move to indoor && with weather change 
		// (-> store weather settings and disable current weather settings)	
		if($gameTemp._weather_disable_flag && $gameScreen._weatherType !='none'){
			$gameTemp._weather_stack.push($gameScreen._weatherType);
			$gameTemp._weather_stack.push($gameScreen._weatherPower);		
			$gameScreen.changeWeather('none',0,0,1);
		}
	}
	
	function IsBattleWeatherEnable(param){
	  if (IsBattleWeather_enable) return true;
      else return false;
	}
	
	function convParam2MapID(param){
		var str = param['Map_IDs'];
		var id_array = [];
		var spl_str = str.split(',');
		var regex = /(\d+)\s*-\s*(\d+)/;

		if (!str) return id_array; //empty
		
		for (var i = 0; i < spl_str.length; i++){
		   if (regex.test(spl_str[i]) == true){
			 var begin = Number(RegExp.$1);
			 var end = Number(RegExp.$2);
			 for (var j = begin; j <= end; j++) id_array.push(j); //ranged ID
		   }
		   else id_array.push(Number(spl_str[i])); //one ID
		}
		
	  return id_array;
	}


//Duplicate process in Spriteset_Map class
  var SoR_OW_SB_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer;
  Spriteset_Battle.prototype.createLowerLayer = function() {
    SoR_OW_SB_createLowerLayer.call(this);
    if($gameTemp._weather_enable_inBattle) this.createWeather();
  }

  Spriteset_Battle.prototype.createWeather = function() {
    this._weather = new Weather();
    this.addChild(this._weather);
  }
  
  var SoR_OW_SB_update = Spriteset_Battle.prototype.update;
  Spriteset_Battle.prototype.update = function() {
    SoR_OW_SB_update.call(this);
    if($gameTemp._weather_enable_inBattle) this.updateWeather();
  }
  
  Spriteset_Battle.prototype.updateWeather = function() {
    this._weather.type = $gameScreen.weatherType();
    this._weather.power = $gameScreen.weatherPower();
    this._weather.origin.x = 0;
    this._weather.origin.y = 0;
  }


// Set Weather Effect
Game_Interpreter.prototype.command236 = function() {
    if ( $gameTemp._weather_disable_flag == false){
		$gameScreen.changeWeather(this._params[0], this._params[1], this._params[2]);
        if(this._params[3] == true) this.wait(this._params[2]); //wait flag
    }
	else if($gameTemp._weather_disable_flag == true){ // reserve weather change until go outdoor
		$gameTemp._weather_stack.length = 0;
		$gameTemp._weather_stack.push(this._params[0]);
		$gameTemp._weather_stack.push(this._params[1]);	
	}
    return true;
}

})();