//=============================================================================
// SoR_ChapterEyeCatching_MZ.js
// MIT License (C) 2020 蒼竜 @soryu_rpmaker
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Latest version v1.02 (2020/08/20)
//=============================================================================

/*:ja
 * @plugindesc ＜章タイトル・アイキャッチ演出シーン＞ 
 * @author 蒼竜　@soryu_rpmaker
 * @help ピクチャを用いたアイキャッチシーンをスクリプトで代行します。
 * 「ピクチャの表示」や「画面のフェードイン、ウェイト」の組み合わせで
 * 通常の機能でも実現できますが、スクリプトコマンド１発で処理できるようになります。
 * また、章終了時画面では、セーブ機能があります。
 * さらにシーン起動時に、任意のスクリプトを実行する機能もあります。
 *
 * -----------------------------------------------------------
 * 用法 (プラグイン設定)
 * -----------------------------------------------------------
 * ./img/picture/ 以下に、挿入したいピクチャを置き、
 * プラグインパラメータでピクチャを割り当ててください。
 *
 * 「章開始」の項目に書いたピクチャは
 * プラグインコマンドから 呼び出しシーンのタイプ:Title ID:[NUMBER]
 * として指定して、シーンを起動します。
 *
 * 「章終了」の項目に書いたピクチャは
 * 呼び出しシーンのタイプ:End ID:[NUMBER]
 * でシーンを起動します。
 * ([NUMBER]のところに、割り当てた番号を記入してください。)
 *
 *
 * セーブ処理を伴うものと、伴わないもので16x2=32個分定義できます。
 *
 * -----------------------------------------------------------
 * バージョン情報
 * -----------------------------------------------------------
 * v1.02 (2020/08/20)       MZバージョン初版
 *
 * @target MZ
 * @url http://dragonflare.dip.jp/dcave/
 * @param ---------章開始----------
 * @param ScriptCall_ChapterTitle
 * @desc 章開始演出時に、指定のスクリプトを実行できます。
 * @default 
 * @type string
 *
 * @param 1st chapter img
 * @type file
 * @dir img/pictures
 * @desc 1番目の章のグラフィック(章開始時演出)
 * @param 2nd chapter img
 * @type file
 * @dir img/pictures
 * @desc 2番目の章のグラフィック(章開始時演出)
 * @param 3rd chapter img
 * @type file
 * @dir img/pictures
 * @desc 3番目の章のグラフィック(章開始時演出)
 * @param 4th chapter img
 * @type file
 * @dir img/pictures
 * @desc 4番目の章のグラフィック(章開始時演出)
 * @param 5th chapter img
 * @type file
 * @dir img/pictures
 * @desc 5番目の章のグラフィック(章開始時演出)
 * @param 6th chapter img
 * @type file
 * @dir img/pictures
 * @desc 6番目の章のグラフィック(章開始時演出)
 * @param 7th chapter img
 * @type file
 * @dir img/pictures
 * @desc 7番目の章のグラフィック(章開始時演出)
 * @param 8th chapter img
 * @type file
 * @dir img/pictures
 * @desc 8番目の章のグラフィック(章開始時演出)
 * @param 9th chapter img
 * @type file
 * @dir img/pictures
 * @desc 9番目の章のグラフィック(章開始時演出)
 * @param 10th chapter img
 * @type file
 * @dir img/pictures
 * @desc 10番目の章のグラフィック(章開始時演出)
 * @param 11th chapter img
 * @type file
 * @dir img/pictures
 * @desc 11番目の章のグラフィック(章開始時演出)
 * @param 12th chapter img
 * @type file
 * @dir img/pictures
 * @desc 12番目の章のグラフィック(章開始時演出)
 * @param 13th chapter img
 * @type file
 * @dir img/pictures
 * @desc 13番目の章のグラフィック(章開始時演出)
 * @param 14th chapter img
 * @type file
 * @dir img/pictures
 * @desc 14番目の章のグラフィック(章開始時演出)
 * @param 15th chapter img
 * @type file
 * @dir img/pictures
 * @desc 15番目の章のグラフィック(章開始時演出)
 * @param 16th chapter img
 * @type file
 * @dir img/pictures
 * @desc 16番目の章のグラフィック(章開始時演出)
 *
 * @param ---------章終了----------
 *
 * @param Message_forSave
 * @desc 選択処理において、「セーブ画面を呼び出す」選択肢として表示されます。
 * @default ここまでの内容をセーブする
 * @type string
 * @param Message_forNextChapter
 * @desc 選択処理において、「次の章へ進む」選択肢として表示されます。
 * @default 次の章に進む
 * @type string
 * @param MessageWindow_Width
 * @desc 選択肢を表示するウィンドウの横幅です。(空欄にすれば、画面サイズの半分の大きさで作成します)
 * @default 
 * @type number
 *
 * @param ScriptCall_ChapterEnd
 * @desc 章終了演出時に、指定のスクリプトを実行できます。
 * @default 
 * @type string
 *
 * @param 1st chapter (end) img
 * @type file
 * @dir img/pictures
 * @desc 1番目の章のグラフィック(章終了時演出)
 * @param 2nd chapter (end) img
 * @type file
 * @dir img/pictures
 * @desc 2番目の章のグラフィック(章終了時演出)
 * @param 3rd chapter (end) img
 * @type file
 * @dir img/pictures
 * @desc 3番目の章のグラフィック(章終了時演出)
 * @param 4th chapter (end) img
 * @type file
 * @dir img/pictures
 * @desc 4番目の章のグラフィック(章終了時演出)
 * @param 5th chapter (end) img
 * @type file
 * @dir img/pictures
 * @desc 5番目の章のグラフィック(章終了時演出)
 * @param 6th chapter (end) img
 * @type file
 * @dir img/pictures
 * @desc 6番目の章のグラフィック(章終了時演出)
 * @param 7th chapter (end) img
 * @type file
 * @dir img/pictures
 * @desc 7番目の章のグラフィック(章終了時演出)
 * @param 8th chapter (end) img
 * @type file
 * @dir img/pictures
 * @desc 8番目の章のグラフィック(章終了時演出)
 * @param 9th chapter (end) img
 * @type file
 * @dir img/pictures
 * @desc 9番目の章のグラフィック(章終了時演出)
 * @param 10th chapter (end) img
 * @type file
 * @dir img/pictures
 * @desc 10番目の章のグラフィック(章終了時演出)
 * @param 11th chapter (end) img
 * @type file
 * @dir img/pictures
 * @desc 11番目の章のグラフィック(章終了時演出)
 * @param 12th chapter (end) img
 * @type file
 * @dir img/pictures
 * @desc 12番目の章のグラフィック(章終了時演出)
 * @param 13th chapter (end) img
 * @type file
 * @dir img/pictures
 * @desc 13番目の章のグラフィック(章終了時演出)
 * @param 14th chapter (end) img
 * @type file
 * @dir img/pictures
 * @desc 14番目の章のグラフィック(章終了時演出)
 * @param 15th chapter (end) img
 * @type file
 * @dir img/pictures
 * @desc 15番目の章のグラフィック(章終了時演出)
 * @param 16th chapter (end) img
 * @type file
 * @dir img/pictures
 * @desc 16番目の章のグラフィック(章終了時演出)
 *
 *
 * @command scenecall
 * @text 呼び出し[章タイトル・アイキャッチ演出シーン]
 * @desc 指定の演出シーンの呼び出しを行います
 * @arg arg1
 * @text 呼び出しシーンのタイプ
 * @desc Title(章開始)またはEnd(終了)のどちらかを記入
 * @arg arg2
 * @type number
 * @text ID
 * @desc 呼び出す章の番号(プラグインパラメータで設定したもの)

 */
/*:
 * @plugindesc <Creation of Eye-catching Image Scenes>
 * @author @soryu_rpmaker
 * @help This plugin supports a scene for eye-catching image scene
 * using picture sprites. Though this feature can also be implemented 
 * by combination of event commands, this plugin enables to
 * implement the same feature to launch one plugin command
 * and assignment of picture in plugin parameters. 
 *
 * At the scene of chapter ending, this proposes players to save
 * current game data. Additionally, you can specify any script calls
 * when the scene is activated.
 *
 * -----------------------------------------------------------
 * How to use
 * -----------------------------------------------------------
 * Place picture sprites at ./img/picture/ which you want to show
 * in the eye-catching scene. And then, assign the picture to
 * arbitrary scene in the plugin parameter.
 *
 * Scene "Chapter Begin" is activated in the game by a plugin command setting
 * Title [NUMBER]
 *
 * , and Scene "Chapter End" is activated by a command setting
 * End [NUMBER]
 * , respectively.
 * (Fill [NUMBER] with the chapter number assigned in the plugin parameter.) 
 *
 * ex) SoR_Chapter End 1
 * -> Activate scene with a picture assigned in "1st chapter (end) img" .
 *
 * Scenes with save process and just showing picture are able to be defined
 * at most 16x2 = 32 scenes.
 * 
 * -----------------------------------------------------------
 * Version info.
 * -----------------------------------------------------------
 * v1.02 (Aug. 20th, 2020)       First edition ported for MZ
 *
 * @param -----Chapter Begin------
 * @param ScriptCall_ChapterTitle
 * @desc Scripts executed in the scene
 * @default 
 * @type string
 *
 * @param 1st chapter img
 * @type file
 * @dir img/pictures
 * @desc Picture sprites for 1st chapter (Chapter Begin scene)
 * @param 2nd chapter img
 * @type file
 * @dir img/pictures
 * @desc Picture sprites for 2nd chapter (Chapter Begin scene)
 * @param 3rd chapter img
 * @type file
 * @dir img/pictures
 * @desc Picture sprites for 3rd chapter (Chapter Begin scene)
 * @param 4th chapter img
 * @type file
 * @dir img/pictures
 * @desc Picture sprites for 4th chapter (Chapter Begin scene)
 * @type file
 * @dir img/pictures
 * @desc Picture sprites for 5th chapter (Chapter Begin scene)
 * @param 6th chapter img
 * @type file
 * @dir img/pictures
 * @desc Picture sprites for 6th chapter (Chapter Begin scene)
 * @param 7th chapter img
 * @type file
 * @dir img/pictures
 * @desc Picture sprites for 7th chapter (Chapter Begin scene)
 * @param 8th chapter img
 * @type file
 * @dir img/pictures
 * @desc Picture sprites for 8th chapter (Chapter Begin scene)
 * @param 9th chapter img
 * @type file
 * @dir img/pictures
 * @desc Picture sprites for 9th chapter (Chapter Begin scene)
 * @param 10th chapter img
 * @type file
 * @dir img/pictures
 * @desc Picture sprites for 10th chapter (Chapter Begin scene)
 * @param 11th chapter img
 * @type file
 * @dir img/pictures
 * @desc Picture sprites for 11th chapter (Chapter Begin scene)
 * @param 12th chapter img
 * @type file
 * @dir img/pictures
 * @desc Picture sprites for 12th chapter (Chapter Begin scene)
 * @param 13th chapter img
 * @type file
 * @dir img/pictures
 * @desc Picture sprites for 13th chapter (Chapter Begin scene)
 * @param 14th chapter img
 * @type file
 * @dir img/pictures
 * @desc Picture sprites for 14th chapter (Chapter Begin scene)
 * @param 15th chapter img
 * @type file
 * @dir img/pictures
 * @desc Picture sprites for 15th chapter (Chapter Begin scene)
 * @param 16th chapter img
 * @type file
 * @dir img/pictures
 * @desc Picture sprites for 16th chapter (Chapter Begin scene)
 *
 * @param ---------Chapter End----------
 *
 * @param Message_forSave
 * @desc Text of choice which calls save scene
 * @default Save
 * @type string
 * @param Message_forNextChapter
 * @desc Text of choice which proceeds the game
 * @default Continue
 * @type string
 * @param MessageWindow_Width
 * @desc Width of window shows the choice for save (If you leave it brank, half of screen width)
 * @default 
 * @type number
 *
 * @param ScriptCall_ChapterEnd
 * @desc Scripts executed in the scene
 * @default 
 * @type string
 *
 * @param 1st chapter (end) img
 * @type file
 * @dir img/pictures
 * @desc Picture sprites for 1st chapter (Chapter End scene)
 * @param 2nd chapter (end) img
 * @type file
 * @dir img/pictures
 * @desc Picture sprites for 2nd chapter (Chapter End scene)
 * @param 3rd chapter (end) img
 * @type file
 * @dir img/pictures
 * @desc Picture sprites for 3rd chapter (Chapter End scene)
 * @param 4th chapter (end) img
 * @type file
 * @dir img/pictures
 * @desc Picture sprites for 4th chapter (Chapter End scene)
 * @param 5th chapter (end) img
 * @type file
 * @dir img/pictures
 * @desc Picture sprites for 5th chapter (Chapter End scene)
 * @param 6th chapter (end) img
 * @type file
 * @dir img/pictures
 * @desc Picture sprites for 6th chapter (Chapter End scene)
 * @param 7th chapter (end) img
 * @type file
 * @dir img/pictures
 * @desc Picture sprites for 7th chapter (Chapter End scene)
 * @param 8th chapter (end) img
 * @type file
 * @dir img/pictures
 * @desc Picture sprites for 8th chapter (Chapter End scene)
 * @param 9th chapter (end) img
 * @type file
 * @dir img/pictures
 * @desc Picture sprites for 9th chapter (Chapter End scene)
 * @param 10th chapter (end) img
 * @type file
 * @dir img/pictures
 * @desc Picture sprites for 10th chapter (Chapter End scene)
 * @param 11th chapter (end) img
 * @type file
 * @dir img/pictures
 * @desc Picture sprites for 11th chapter (Chapter End scene)
 * @param 12th chapter (end) img
 * @type file
 * @dir img/pictures
 * @desc Picture sprites for 12th chapter (Chapter End scene)
 * @param 13th chapter (end) img
 * @type file
 * @dir img/pictures
 * @desc Picture sprites for 13th chapter (Chapter End scene)
 * @param 14th chapter (end) img
 * @type file
 * @dir img/pictures
 * @desc Picture sprites for 14th chapter (Chapter End scene)
 * @param 15th chapter (end) img
 * @type file
 * @dir img/pictures
 * @desc Picture sprites for 15th chapter (Chapter End scene)
 * @param 16th chapter (end) img
 * @type file
 * @dir img/pictures
 * @desc Picture sprites for 16th chapter (Chapter End scene)
 *
 * @target MZ
 * @url http://dragonflare.dip.jp/dcave/index_e.php
 *
 * @command scenecall
 * @text Call [Eye-catching Image Scenes]
 * @desc Call specified eye-catching scene
 * @arg arg1
 * @text Scene type
 * @desc Title(Chapter begin) or End(Chapter closing)
 * @arg arg2
 * @type number
 * @text ID
 * @desc ID of chapter(you designated in the plugin parameters)
 */ 

var Imported = Imported || {};
Imported.SoR_RfB = true;
var SoR = SoR || {};
SoR.suspend_state = '';

(function() {
const pluginName = "SoR_ChapterEyeCatching_MZ";

const Param = PluginManager.parameters(pluginName);
let Chapter_start_img = [];
const Chapter_start_scripts = (Param['ScriptCall_ChapterTitle'] || '')
let Chapter_end_img = [];
const Chapter_end_scripts = (Param['ScriptCall_ChapterEnd'] || '')
let chap_index = 0;
let _situation = '';
let IsSaved = false;

for(var i=0; i<16; i++){
	let fname = '';
	let s_num = '';
	const s_chap = 'chapter '
	const s_im = 'img';
	if(i==0) s_num = '1st ';
	else if(i==1) s_num = '2nd ';
	else if(i==2) s_num = '3rd ';
	else s_num = String(i+1) +'th ';
	
	fname = s_num + s_chap + s_im;
	Chapter_start_img[i] = (Param[fname] || '');	
	fname = s_num + s_chap + '(end) '+ s_im;
	Chapter_end_img[i] = (Param[fname] || '');
}


    PluginManager.registerCommand(pluginName, "scenecall", args => {
	    switch(args.arg1){
	    case 'Title':
		case 'End':
            _situation = args.arg1;
            chap_index = (args.arg2-1 || 0);
            SceneManager.push(Scene_ChapterTitle);
        break;
	    }
    });
	
	
 

/////////////////////////////////////////////////////////////////////////////////
 /////////////////////////////////////////////////////////////////////////////////
 /////////////////////////////////////////////////////////////////////////////////
 
function Scene_ChapterTitle() {
   this.initialize.apply(this, arguments);
}

Scene_ChapterTitle.prototype = Object.create(Scene_Base.prototype);
Scene_ChapterTitle.prototype.constructor = Scene_ChapterTitle;

Scene_ChapterTitle.prototype.initialize = function() {
   AudioManager.stopBgm()
   Scene_Base.prototype.initialize.call(this); 
};


Scene_ChapterTitle.prototype.update = function() { 
    Scene_Base.prototype.update.call(this);
	
	if(this._chap_spr){
		switch (this._chap_spr.state){
		case 'not_open':
		   this.show_chapter_sprite();
		break;
		case 'keep':
		   if(_situation == 'Title') this.waitKey_chapter_sprite();
		break;
		case 'close':
		   this.close_chapter_sprite();
		break;
		case 'leave_scene':
		   SceneManager.pop();
		break;		
		}
	}
};
	
Scene_ChapterTitle.prototype.create = function(){
	Scene_Base.prototype.create.call(this);
	this.createWindowLayer(); /////<- initialization
	this.createMainWindow();
	if(_situation == 'End')	this.createWindow_SaveSelect();	
	
	if(SoR.suspend_state=='saving'){
		    this._chap_spr.img.opacity = 255;
	   		this._commandWindow.openness = 1;
			this._commandWindow.open();
			this._chap_spr.state = 'keep';
    }

};

// main window
Scene_ChapterTitle.prototype.createMainWindow = function(){
    this._mainWindow = new Window_Base(new Rectangle(0, 0, Graphics.width, Graphics.height));	
	this._mainWindow.setBackgroundType(1);
    this.addWindow(this._mainWindow);
	this.PrepareBG(chap_index);
};
	
Scene_ChapterTitle.prototype.PrepareBG = function(){
    this._chap_spr = new ChapterBackgrounds(chap_index, _situation);
	this.addChild(this._chap_spr.img);
}

Scene_ChapterTitle.prototype.show_chapter_sprite = function(){
	this._chap_spr.img.opacity+=2;
	if(this._chap_spr.img.opacity >=255){
		this._chap_spr.img.opacity = 255;
		this._chap_spr.state = 'keep';
		this.CallScriptAtScene();
		if(_situation == 'End'){
		    this._commandWindow.openness = 1;
			this._commandWindow.open();
		}
		
	}
}

Scene_ChapterTitle.prototype.CallScriptAtScene = function(){
	if(_situation == 'Title') eval(Chapter_start_scripts);
	else if(_situation == 'End') eval(Chapter_end_scripts);
}

Scene_ChapterTitle.prototype.close_chapter_sprite = function(){
	this._chap_spr.img.opacity-=2;
	
	if(this._chap_spr.img.opacity <=0){
		this._chap_spr.img.opacity = 0;
		this._chap_spr.state = 'leave_scene';
	    this.removeChild(this._chap_spr.img);
		this._chap_spr.img = null;
	}
}

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

Scene_ChapterTitle.prototype.waitKey_chapter_sprite = function(){
   if(Input.isTriggered('ok') || TouchInput.isTriggered()) this._chap_spr.state = 'close';
}


Scene_ChapterTitle.prototype.createWindow_SaveSelect = function(){
	var x = Graphics.width/2;
	var y = Graphics.height -  Graphics.height/3;

	this._commandWindow = new Window_SaveSelect(x, y);
	this._commandWindow.setHandler('save', this.onSave.bind(this));
	this._commandWindow.setHandler('leave', this.onLeaveScene.bind(this));
	this.addChild(this._commandWindow);
  };

Scene_ChapterTitle.prototype.onSave = function(){
	IsSaved = true;
	SoR.suspend_state = 'saving';
	SceneManager.push(Scene_Save);
}

Scene_ChapterTitle.prototype.onLeaveScene = function(){
	this._chap_spr.state = 'close';
	this._commandWindow.close();
}


function Window_SaveSelect(){
    this.initialize.apply(this, arguments);
}

Window_SaveSelect.prototype = Object.create(Window_Command.prototype);
Window_SaveSelect.prototype.constructor = Window_SaveSelect;
 
Window_SaveSelect.prototype.initialize = function(x, y){
	
	this._text1 = String(Param['Message_forSave']) || 'Save';
    this._text2 = String(Param['Message_forNextChapter']) || 'GotoNextChapter';

    Window_Command.prototype.initialize.call(this, x, y);
	this._contents_len = this.textWidth(this._text1) > this.textWidth(this._text2) ? this.textWidth(this._text1) : this.textWidth(this._text2);
	
    this.x = Graphics.width/2 - (Number(Param['MessageWindow_Width']) || Graphics.width/2)/2;
	this.y = Graphics.height -  Graphics.height/3;
	this.openness = 0;
	this.close();
};
Window_SaveSelect.prototype.makeCommandList = function(){
	this.addCommand(this._text1, 'save', true);
    this.addCommand(this._text2, 'leave', true);
};

Window_SaveSelect.prototype.itemTextAlign = function() {
    return 'center';
};
Window_SaveSelect.prototype.windowWidth = function() {
    return Number(Param['MessageWindow_Width']) || Graphics.width/2;
};
Window_SaveSelect.prototype.contentsWidth = function() {
    return Number(Param['MessageWindow_Width']) || Graphics.width/2;
};

///////////////////////////////////////////////////////////////

function ChapterBackgrounds() {
    this.initialize.apply(this, arguments);
}

ChapterBackgrounds.prototype.initialize = function(id, str) {
    this.id = id;
	let spr;
	if(str == 'End') spr = ImageManager.loadPicture(Chapter_end_img[id]);
	else spr = ImageManager.loadPicture(Chapter_start_img[id]);
	
	this.img = new Sprite(spr);
    this.img.x = 0;	
    this.img.y = 0;
    this.img.z = 0;
	this.img.opacity = 0;
	this.state = 'not_open';
}

	
	
}());