//=============================================================================
//  Keke_BasicPack - ベーシックパック
// バージョン: 1.8
//=============================================================================
// Copyright (c) 2020 ケケー
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc プラグインの共用処理の詰め合わせだよ
 * @author ケケー
 * 
 * 
 *【利用規約】
 *  MITライセンスのもと、好きに使ってくれて大丈夫
 * ただし作者は何も責任を負わないよ
 * 著作権は『ケケー』にあるよ
 */
    
    
    
(function() { 
    
//--  共通開始  --//
    
    var _Game_CharacterBase_initMembers = Game_CharacterBase.prototype.initMembers;
    Game_CharacterBase.prototype.initMembers = function() {
        _Game_CharacterBase_initMembers.call(this);
        this._isCharacter = true;
        this._bunshins = [];
        this._freeX = [];
        this._freeY = [];
        this._anotherMoveX = [0];
        this._anotherMoveY = [0];
    };
    
    var _Sprite_Character_initialize = Sprite_Character.prototype.initialize;
    Sprite_Character.prototype.initialize = function(character) {
        _Sprite_Character_initialize.call(this, character);
        this._bsId = this._character._bsIdSet || 0;
    };
    
    var _Game_Player_initMembers = Game_Player.prototype.initMembers;
    Game_Player.prototype.initMembers = function() {
        _Game_Player_initMembers.call(this);
        this._eventId = 0;
        this._followKeke = 0;
    };
    
    var _Game_BattlerBase_initMembers = Game_BattlerBase.prototype.initMembers;
    Game_BattlerBase.prototype.initMembers = function() {
        _Game_BattlerBase_initMembers.call(this);
        this._isBattler = true;
        this._opacityKeke = null;
    };
    
    var _Game_Action_setSubject = Game_Action.prototype.setSubject;
    Game_Action.prototype.setSubject = function(subject) {
        _Game_Action_setSubject.call(this, subject);
        this._subject = subject;
    };
    
    var _Game_ActionResult_clear = Game_ActionResult.prototype.clear;
    Game_ActionResult.prototype.clear = function() {
         _Game_ActionResult_clear.call(this);
         this._subject = null;
    };
    
    var _Game_Screen_initialize = Game_Screen.prototype.initialize;
    Game_Screen.prototype.initialize = function() {
        _Game_Screen_initialize.call(this);
        this._rechildsBattlers = 0;
        this._rechildsAnimation = 0;
        this._rechildsDamage = 0;
    };
    
    var _Scene_Map_initialize = Scene_Map.prototype.initialize;
    Scene_Map.prototype.initialize = function() {
        _Scene_Map_initialize.call(this);
        this._isMap = true;
    };
    
    var _Scene_MenuBase_initialize = Scene_MenuBase.prototype.initialize;
    Scene_MenuBase.prototype.initialize = function() {
        _Scene_MenuBase_initialize.call(this);
        this._isRemote = true;
        this._isMenu = true;
    };
    
    var _Scene_Battle_initialize = Scene_Battle.prototype.initialize;
    Scene_Battle.prototype.initialize = function() {
        _Scene_Battle_initialize.call(this);
        this._isRemote = true;
        this._isBattle = true;
    };
     
    
    
//--  共通更新  --//
    
    var _SpriteCharacter_update = Sprite_Character.prototype.update;
    Sprite_Character.prototype.update = function() {
        _SpriteCharacter_update.call(this);
        if (this._bsId == 0) {
            this.getBitmapSize();
        }
    };
    
    var _Game_Player_update = Game_Player.prototype.update;
    Game_Player.prototype.update = function(sceneActive) {
        _Game_Player_update.call(this, sceneActive);
        if (this._followKeke > 0) { this._followKeke--; }
    };
    
    var _Sprite_Battler_update = Sprite_Battler.prototype.update;
    Sprite_Battler.prototype.update = function() {
        _Sprite_Battler_update.call(this);
        if (this._battler) { 
            this.updateOpacityKeke();
            this.rechildDamage();
            this.rechild();
        }
    };
    
    var _Sprite_Animation_updateMain = Sprite_Animation.prototype.updateMain;
    Sprite_Animation.prototype.updateMain = function() {
        _Sprite_Animation_updateMain.call(this);
        this.rechild();
    };
    
    var _Game_Screen_update = Game_Screen.prototype.update;
    Game_Screen.prototype.update = function() {
        _Game_Screen_update.call(this);
        if (this._rechildsBattlers) { this._rechildsBattlers--; }
        if (this._rechildsAnimation) { this._rechildsAnimation--; }
        if (this._rechildsDamage) { this._rechildsDamage--; }
    };
    
    var _Scene_Map_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
         _Scene_Map_update.call(this);
         if ($gamePlayer._followKeke) {$gamePlayer.followerFollowTop(); }
         this.setPreParameters();
    };
    
    var _Scene_Battle_update = Scene_Battle.prototype.update;
    Scene_Battle.prototype.update = function() {
         _Scene_Battle_update.call(this);
         this.setPreParameters();
    };
    
    var _Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        _Game_System_initialize.call(this);
    };
     
    
    
//--  共通計算  --//
    
    // スクリーン座標への変換
    Game_CharacterBase.prototype.convertScreenX = function(x) {
        var tw = $gameMap.tileWidth();
        var scrolledX = $gameMap.adjustX(x)
        return Math.round(scrolledX * tw + tw / 2);
    };
    
    Game_CharacterBase.prototype.convertScreenY = function(y) {
        var th = $gameMap.tileHeight();
        var scrolledY = $gameMap.adjustY(y)
        return Math.round(scrolledY * th + th - this.shiftY() - this.jumpHeight());
    };
    
    // マップ座標への変換
    Game_CharacterBase.prototype.convertMapX = function(x) {
        var mapX = (x - $gameMap.tileWidth()) / $gameMap.tileWidth();
        if ($gameMap.isLoopHorizontal() && mapX < $gameMap._displayX -
            ($gameMap.width() - $gameMap.screenTileX()) / 2) {
            return mapX + $gameMap._displayX - $dataMap.width;
        } else {
            return mapX + $gameMap._displayX;
        }
    };
    
    Game_CharacterBase.prototype.convertMapY = function(y) {
        var mapY = (y + this.jumpHeight() + this.shiftY() - $gameMap.tileHeight()) / $gameMap.tileHeight();
        if ($gameMap.isLoopVertical() && mapY < $gameMap._displayY -
            ($gameMap.height() - $gameMap.screenTileY()) / 2) {
            return mapY + $gameMap._displayY - $dataMap.height;
        } else {
            return mapY + $gameMap._displayY;
        }
    };
    
     // 角度を度数に変更
    Game_Temp.prototype.angleToDegree= function(angle) {
        angle *= (180 / Math.PI);
        if (angle < 0) { angle += 360; };
        return angle;
    };
    
    // 角度をπに変更
    Game_Temp.prototype.angleToRadian = function(angle) {
        angle *= (Math.PI / 180);
        return angle;
    };
    
     // ポイント間の距離を算出
    Game_Temp.prototype.calcPointsLength = function(a, b) {
        var ay = a['height'] ? a['y'] - (a['height'] / 2) / $gameMap.tileHeight() : a['y'];
        var by = b['height'] ? b['y'] - (b['height'] / 2) / $gameMap.tileHeight() : b['y'];
        var b_x = b['x'] - a['x'];
        var b_y = by - ay;
        var length = Math.sqrt(b_x ** 2 + b_y ** 2);
        return length;
    };
    
    // ポイント間の角度を算出
    Game_Temp.prototype.calcPointsAngle = function(a, b) {
        if (a['x'] == b['x'] && a['y'] == b['y']) { return null; }
        var ay = a['height'] ? a['y'] - (a['height'] / 2) / $gameMap.tileHeight() : a['y'];
        var by = b['height'] ? b['y'] - (b['height'] / 2) / $gameMap.tileHeight() : b['y'];
        var radian = Math.atan2(by - ay, b['x'] - a['x']);
        return this.angleToDegree(radian);
    };
    
    // 点が角度内にあるか
    Game_Temp.prototype.judgePointInAngle = function(a, b) {
        var a_angle = this.calcPointsAngle(b, a);
        if (b['end'] < b['start']) {
            return a_angle >= b['start'] || a_angle <= b['end'];
        } else {
            return a_angle >= b['start'] && a_angle <= b['end'];
        }
    };
    
    // 角度から座標を算出
    Game_Temp.prototype.calcPosFromAngle= function(a, angle) {
        var radian = this.angleToRadian(angle);
        var p = { x:0, y:0 };
        p['x'] = a['x'] + a['radius'] * Math.cos(radian);
        p['y'] = a['y'] + a['radius'] * Math.sin(radian);
        return p;
    };
    
    
    
//--  変数追加  --//
    
    // 画像タイプを記憶
    var _Game_CharacterBase_setImage = Game_CharacterBase.prototype.setImage;
    Game_CharacterBase.prototype.setImage = function(characterName, characterIndex) {
        _Game_CharacterBase_setImage.call(this, characterName, characterIndex);
        this._isChara = false;
        this._isObject = false;
        this._isTileset = false;
        if (characterName.match(/^!/)) { this._isObject = true; } else
        { this._isChara = true; }
    };
    
     var _Game_CharacterBase_setTileImage = Game_CharacterBase.prototype.setTileImage;
    Game_CharacterBase.prototype.setTileImage = function(characterName, characterIndex) {
        _Game_CharacterBase_setTileImage.call(this, characterName, characterIndex);
        this._isChara = false;
        this._isObject = false;
        this._isTileset = true;
    };

    // アクタースプライトにバトラー変数追加
    var _Sprite_Actor_setBattler = Sprite_Actor.prototype.setBattler;
    Sprite_Actor.prototype.setBattler = function(battler) {
        var changed = (battler !== this._actor);
        _Sprite_Actor_setBattler.call(this, battler);
        if (changed) { this._battler = battler; }
    };
    
    // 基本のホーム位置を記憶
    var _Sprite_Battler_setHome = Sprite_Battler.prototype.setHome;
    Sprite_Battler.prototype.setHome = function(x, y) {
        _Sprite_Battler_setHome.call(this, x, y);
        if (BattleManager._phase == 'init') {
            this._homePosX = x;
            this._homePosY = y
        }
    };
    
    
    
//--  ショート機能  --//
    
    //--  全取得メタ  --//
    Game_Temp.prototype.metaAll = function(name, note) {
        var result = null;
        var regText = '\<' + name + ':([^\>]*)\>';
        var regExp_g = new RegExp(regText, 'g');
        var regExp = new RegExp(regText);
        var matches = note.match(regExp_g);
        if (matches) {
            var match = null;
            result = [];
            matches.forEach(function(line) {
                match = line.match(regExp);
                result.push(match[1]);
            }, this);
        }
        return result;
    };
    
    //--  効果音の複製  --//
    Game_Temp.prototype.seCopy = function(se) {
        if (!se) { return; }
        var newSe = {};
        newSe['name'] = se['name'];
        newSe['volume'] = se['volume'];
        newSe['pitch'] = se['pitch'];
        newSe['pitchRandom'] = se['pitchRandom'];
        newSe['pan'] = se['pan'];
        newSe['burst'] = se['burst'];
        return newSe;
    };
    
    
    
//--  ショート修正  --//
    
    // リザルトにサブジェクト登録 
    var _Game_Action_apply = Game_Action.prototype.apply;
    Game_Action.prototype.apply = function(target) {
        _Game_Action_apply.call(this, target);
        target.result()._subject = this.subject();
    };
    
    // マルチエフェクト中か
    Game_Interpreter.prototype.multiEffectRunning = function() {
        return false;
    };
    
    
    
//--  イベント名をイベントIDに変換する  --//
    
    Game_Interpreter.prototype.eventNameToId = function(name) {
        if (!name) { return []; }
        if (name == 'play' || name == '-1') {
            return [-1];
        } else if (name == 'self' || name == '0') {
            return [this._eventId];
        } else if (name.match(/^\d+$/)) {
            return [name];
        } else if (name == 'all') {
            var result = [];
            $gameMap.events().forEach(function(event) {
                if (!event) { return; }
                result.push(event._eventId);
            }, this);
            return  result.length ? result : [];
        } else {
            result = [];
            var eventName = '';
            $gameMap.events().forEach(function(event) {
                if (!event) { return; }
                eventName = event._name;
                if (eventName.includes(name)) {
                    result.push(event._eventId);
                }
            }, this);
            return  result.length ? result : [];
        }
    };
    
    
    
//--  バトラー名をオブジェクトに変換する  --//
    
    Game_Interpreter.prototype.battlerNameToObj = function(name) {
        if (!name) { return []; }
        if (name.match(/^a\d+$/)) {
            var num = Number(name.match(/a(\d+)/)[1]);
            var obj = $gameParty.members()[num-1];
            return [obj];
        } else if (name.match(/^e\d+$/)) {
            num = Number(name.match(/e(\d+)/)[1]);
            obj = $gameTroop.members()[num-1];
            return [obj];
        } else if (name == 'all') {
            var result = [];
            $gameParty.members().forEach(function(actor) {
                if (!actor) { return; }
                result.push(actor);
            }, this);
            $gameTroop.members().forEach(function(enemy) {
                if (!enemy) { return; }
                result.push(enemy);
            }, this);
            return  result.length ? result : [];
        } else {
            result = [];
            var battlerName = '';
            $gameParty.members().forEach(function(actor) {
                if (!actor) { return; }
                battlerName = actor._name;
                if (battlerName.includes(name)) {
                    result.push(actor);
                }
            }, this);
            $gameTroop.members().forEach(function(enemy) {
                if (!enemy) { return; }
                battlerName = enemy.enemy().name;
                if (battlerName.includes(name)) {
                    result.push(enemy);
                }
            }, this);
            return  result.length ? result : [];
        }
    };
    
    
    
//--  ビットマップサイズの取得  --//
    
  // ビットマップサイズの取得(キャラクター)
    Sprite_Character.prototype.getBitmapSize = function() {
        if (!this.bitmap) { return; }
        var chara = this._character;
        if (!chara._bitmapK) { chara._bitmapK = {}; }
        var bitmapK = chara._bitmapK;
        bitmapK.width = this.bitmap.width;
        bitmapK.height = this.bitmap.height;
        if (!this._characterName.match(/^!?_/)) {
            if (this._characterName.match(/^!?\$/)) {
                bitmapK.width /= 3;
                bitmapK.height /= 4;
            } else {
                bitmapK.width /= 12;
                bitmapK.height /= 8;
            }
        }
        bitmapK.widthOri = bitmapK.width;
        bitmapK.heightOri = bitmapK.height;
        bitmapK.width *= this.scale.x;
        bitmapK.height *= this.scale.y;
    };
    
    // ビットマップサイズの取得(バトラー)
    var _Sprite_Actor_updateBitmap = Sprite_Actor.prototype.updateBitmap;
    Sprite_Actor.prototype.updateBitmap = function() {
        _Sprite_Actor_updateBitmap.call(this);
        var bitmap = this._mainSprite.bitmap;
        if (bitmap) {
            var actor = this._actor;
            if (!actor._bitmapK) { actor._bitmapK = {}; }
            var bitmapK = actor._bitmapK;
            bitmapK.width = bitmap.width;
            bitmapK.height= bitmap.height;
            if (actor._battlerName.match(/^__/)) {
                bitmapK.width /= 5;
            } else if (actor._battlerName.match(/^_/)) {
                
            } else {
                bitmapK.width /= 9;
                bitmapK.height /= 6;
            }
            bitmapK.widthOri = bitmapK.width;
            bitmapK.heightOri = bitmapK.height;
            bitmapK.width *= this.scale.x;
            bitmapK.height *= this.scale.y;
        }
    };
    
    var _Sprite_Enemy_updateBitmap = Sprite_Enemy.prototype.updateBitmap;
    Sprite_Enemy.prototype.updateBitmap = function() {
        _Sprite_Enemy_updateBitmap.call(this);
        if (this.bitmap) {
            var enemy = this._enemy;
            if (!enemy._bitmapK) { enemy._bitmapK = {}; }
            var bitmapK = enemy._bitmapK;
            bitmapK.width = this.bitmap.width;
            bitmapK.height = this.bitmap.height;
            bitmapK.widthOri = bitmapK.width ;
            bitmapK.heightOri = bitmapK.height;
            bitmapK.width *= this.scale.x;
            bitmapK.height *= this.scale.y;
        }
    };
    
    
    
//--  前回パラメータの取得  --//
    
    // 前回パラメータの取得(キャラクター)
    Scene_Map.prototype.setPreParameters = function() {
        $gamePlayer.getPreParameters();
        $gameMap._events.forEach(function(event) {
            if (!event) { return; }
            event.getPreParameters();
        }, this);
    };
    
    Game_CharacterBase.prototype.getPreParameters = function() {
        if (!this._preParaK) { this._preParaK = { vectorX:[], vectorY:[] }; }
        var pre = this._preParaK;
        pre.displayX = $gameMap._displayX;
        pre.displayY = $gameMap._displayY;
        pre.vectorX.unshift(this._realX - pre.realX);
        pre.vectorY.unshift(this._realY - pre.realY);
        if (pre.vectorX.length > 10) { pre.vectorX.pop(); }
        if (pre.vectorY.length > 10) { pre.vectorY.pop(); }
        pre.x = this._X;
        pre.y = this._Y;
        pre.realX = this._realX;
        pre.realY = this._realY;
        if (this._freeM) { pre.freeX = this.convertMapX(this._freeM.x[0]) };
        if (this._freeM) { pre.freeY = this.convertMapY(this._freeM.y[0]) };
        pre.direction = this._direction;
    };
    
    // 前回パラメータの取得(バトラー)
    Scene_Battle.prototype.setPreParameters = function() {
        var spriteset = this._spriteset;
        spriteset._actorSprites.forEach(function(sprite) {
            sprite.getPreParameters();
        }, this);
        spriteset._enemySprites.forEach(function(sprite) {
            sprite.getPreParameters();
        }, this);
    };
    
    Sprite_Battler.prototype.getPreParameters = function() {
        if (!this._preParaK) { this._preParaK = { vectorX:[], vectorY:[] }; }
        var pre = this._preParaK;
        pre.vectorX.unshift(this._homeX - pre.homeX);
        pre.vectorY.unshift(this._homeY - pre.homeY);
        if (pre.vectorX.length > 10) { pre.vectorX.pop(); }
        if (pre.vectorY.length > 10) { pre.vectorY.pop(); }
        pre.homeX = this._homeX;
        pre.homeY = this._homeY;
    };
    
    
    
//--  スプライトの取得  --//
    
    // キャラスプライトの取得
    Game_Temp.prototype.searchCharaSprite = function(character) {
        if (!SceneManager._scene._spriteset) { return null; }
        var result = null;
        var sprites = SceneManager._scene._spriteset._characterSprites;
        sprites.forEach(function(sprite) {
            if (sprite._character == character) { result = sprite; }
        }, this);
        return result;
    };
    
    // バトラースプライトの取得
    Game_Temp.prototype.searchBattlerSprite = function(battler) {
        if (!SceneManager._scene._spriteset) { return null; }
        var result = null;
        if (battler._actorId) {
            var sprites = SceneManager._scene._spriteset._actorSprites;
        } else if (battler._enemyId) {
            var sprites = SceneManager._scene._spriteset._enemySprites;
        }
        sprites.forEach(function(sprite) {
            if (sprite._battler == battler) { result = sprite; }
        }, this);
        return result;
    };
    
    Game_Temp.prototype.searchBaraSprite = function(subject) {
        var baras = [];
        if (subject._isCharacter) {
            var eventId = subject._eventId
            var baras = $gameTemp._baraSprites ? $gameTemp._baraSprites[eventId] || [] : [];
            baras = baras[0] || [];
        } else if (subject._isBattler) {
            var battlerId = subject._actorId ? subject._actorId : subject.index();
            var baraBank = subject._actorId ? $gameTemp._baraSpritesActor || [] : $gameTemp._baraSpritesEnemy || [];
            var baras = baraBank[battlerId] || []
        }
        return baras;
    };
    
    
    
//--  リチルド  --//
    
    // バトラーのリチルド
    Sprite_Battler.prototype.rechild = function() {
        if (!$gameScreen._rechildsBattlers) { return; }
        if (!this.parent) { return; }
        var parent = this.parent;
        parent.removeChild(this);
        parent.addChild(this);
    };
    
    // アニメーションのリチルド
    Sprite_Animation.prototype.rechild = function() {
        if (!$gameScreen._rechildsAnimation) { return; }
        if (this._back) { return; }
        if (!this.parent) { return; }
        var parent = this.parent;
        parent.removeChild(this);
        parent.addChild(this);
    };
    
    // ダメージのリチルド
    Sprite_Battler.prototype.rechildDamage = function() {
        if (!$gameScreen._rechildsDamage) { return; }
        if (!this.parent) { return; }
        var parent = this.parent;
        this._damages.forEach(function(damage) {
            parent.removeChild(damage);
            parent.addChild(damage);
        }, this);
    };
    
    
    
//-- バトラースプライト拡張  --//
    
    // 透明度の更新
    Sprite_Battler.prototype.updateOpacityKeke = function() {
        var battler = this._battler;
        if (battler._opacityKeke != null) {
            this.opacity = battler._opacityKeke;
        }
    };
    
    
    
//--  先頭追尾  --//
    
    // フォロワーの先頭追尾
    Game_Player.prototype.followerFollowTop = function() {
        if (!this._followers) { return; }
        var result = {};
        this._followers.forEach(function(follower, i) {
            if (!follower) { return; }
            result = this.processFollowTop(follower._realX, follower._realY, i, 1.2, 1);
            if (result.moveX) {
                follower._realX += result.moveX;
            }
            if(result.moveY) {
                follower._realY += result.moveY;
            }
            follower._x = follower._realX;
            follower._y = follower._realY;
            if (result.moveX || result.moveY) {
                follower.refreshBushDepth();
            }
            if (result.direction) {
                follower._direction = result.direction;
            }
        }, this);
    }; 
    
    // 先頭追尾の処理
    Game_CharacterBase.prototype.processFollowTop = function(x, y, i, space, type) {
        var result = { moveX:0, moveY:0, direction:0 };
        // 本体の移動情報を取得
        if (this._modeMultiEffect) {
            var topX = this.convertMapX(this._freeX[0]);
            var topY = this.convertMapY(this._freeY[0]);
            var preTopX = this._preFreeX;
            var preTopY = this._preFreeY;
        } else {
            topX = this._realX;
            topY = this._realY;
            preTopX = this._preRealX;
            preTopY = this._preRealY;
        }
        // 重なるタイプの場合
         if (type == 5) {
            result.moveX = topX - x;
            result.moveY = topY - y;
            result.direction = this._direction;
            return result;
        }
        // 完全同期タイプの場合
        if (type == 6) {
            result.moveX =  topX - preTopX;
            result.moveY =  topY - preTopY;
            result.direction = this._direction;
            return result;
        }
        // 各数値の初期化
        var offsetX = 0;
        var offsetY = 0;
        var offsetXs = [];
        var offsetYs = [];
        oriSpeedX  = Math.abs(topX - preTopX);
        oriSpeedY  = Math.abs(topY - preTopY);
        // ランダムタイプの場合の速度振れ幅
        if (type == 2) {
            oriSpeedX *= 1.5;
            oriSpeedY *= 1.5;
        }
        var speedX = 0;
        var speedY = 0;
        space = space * (i + 1);
        // 左へ移動
        if (topX < preTopX) {
            offsetX = topX + space - x;
            if ($gameMap.isLoopHorizontal()) {
                offsetXs[0] = topX + space - x;
                offsetXs[1] = topX + space - $gameMap.width() - x;
                offsetXs[2] = topX + space + $gameMap.width() - x;
                offsetXs.sort(function(a, b) {
                    return Math.abs(a) - Math.abs(b);
                }, this);
                offsetX = offsetXs[0];
            }
            speedX = offsetX < 0 ? Math.max(offsetX, -oriSpeedX) : Math.min(offsetX, oriSpeedX);
            if (!(type <= 2 && speedX > 0)) {
                result.moveX = speedX;
            }
        }
        // 右に移動
        if (topX > preTopX) {
            offsetX = topX - space - x;
            if ($gameMap.isLoopHorizontal()) {
                offsetXs[0] = topX - space - x;
                offsetXs[1] = topX - space - $gameMap.width() - x;
                offsetXs[2] = topX - space + $gameMap.width() - x;
                offsetXs.sort(function(a, b) {
                    return Math.abs(a) - Math.abs(b);
                }, this);
                offsetX = offsetXs[0];
            }
            speedX = offsetX < 0 ? Math.max(offsetX, -oriSpeedX) : Math.min(offsetX, oriSpeedX);
            if (!(type <= 2 && speedX < 0)) {
                result.moveX = speedX;
            }
           
        }
        // 上に移動
        if (topY < preTopY) {
            offsetY = topY + space - y;
            if ($gameMap.isLoopVertical()) {
                offsetYs[0] = topY + space - y;
                offsetYs[1] = topY + space - $gameMap.width() - y;
                offsetYs[2] = topY + space + $gameMap.width() - y;
                offsetYs.sort(function(a, b) {
                    return Math.abs(a) - Math.abs(b);
                }, this);
                offsetY = offsetYs[0];
            }
            speedY = offsetY < 0 ? Math.max(offsetY, -oriSpeedY) : Math.min(offsetY, oriSpeedY);
            if (!(type <= 2 && speedY > 0)) {
                result.moveY = speedY;
            }
        }
        // 下に移動
        if (topY > preTopY) {
            offsetY = topY - space - y;
            if ($gameMap.isLoopVertical()) {
                offsetYs[0] = topY - space - y;
                offsetYs[1] = topY - space - $gameMap.width() - y;
                offsetYs[2] = topY - space + $gameMap.width() - y;
                offsetYs.sort(function(a, b) {
                    return Math.abs(a) - Math.abs(b);
                }, this);
                offsetY = offsetYs[0];
            }
            speedY = offsetY < 0 ? Math.max(offsetY, -oriSpeedY) : Math.min(offsetY, oriSpeedY);
            if (!(type <= 2 && speedY < 0)) {
                result.moveY = speedY;
            }
        }
        // 横移動時は縦軸を、縦移動時は横軸を合わせる
        var goX = topX - preTopX;
        var goY = topY - preTopY
        var newX = x + result.moveX;
        var newY = y + result.moveY;
        var speed = Math.max(Math.abs(speedX), Math.abs(speedY));
        if (Math.abs(goX) > Math.abs(goY)) {
            offsetY = topY - newY;
            offsetY =  offsetY < 0 ? -Math.min(speed, Math.abs(offsetY)) : Math.min(speed, Math.abs(offsetY));
            result.moveY += offsetY;
        } else if (Math.abs(goX) < Math.abs(goY)){
            offsetX = topX - newX;
            offsetX = offsetX < 0 ? -Math.min(speed, Math.abs(offsetX)) : Math.min(speed, Math.abs(offsetX));
            result.moveX += offsetX;
        }
        // ランダムタイプの場合
        if (type == 2) {
            if (75 - Math.randomInt(100) > 0) { result.moveX /= 2; }
            if (75 - Math.randomInt(100) > 0) { result.moveY /= 2; }
            if (goX) { this._folwInertiaX = 0; }
            if (!goX && this._folwPreSpeedX && !this._folwInertiaY) {
                this._folwInertiaX = 90;
                this._folwPreSpeedX /= 10;
            }
            if (this._folwInertiaX > 0) {
                this._folwInertiaX--;
                goX = this._folwPreSpeedX * 0.99;
                result.moveX += goX;
                if (this._folwInertiaX <= 0) { goX = 0; }
            }
            if (goY) { this._folwInertiaY = 0; }
            if (!goY && this._folwPreSpeedY && !this._folwInertiaY) {
                this._folwInertiaY = 90;
                this._folwPreSpeedY /= 10;
            }
            if (this._folwInertiaY > 0) {
                this._folwInertiaY--;
                goY = this._folwPreSpeedY * 0.99;
                result.moveY += goY;
                if (this._folwInertiaY <= 0) { goY = 0; }
            }
        }
        // 横並びタイプの場合
        if (type == 3) {
            result.moveY = topY - y;
        }
        // 縦並びタイプの場合
        if (type == 4) {
            result.moveX = topX - x;
        }
        // 向きを変更
        if (Math.abs(result.moveX) > Math.abs(result.moveY)) {
             if (result.moveX < 0) {
                if (!this._directionFix) { result.direction = 4; }
            } else if (result.moveX > 0) {
                if (!this._directionFix) { result.direction = 6; }
            }
        } else if (Math.abs(result.moveX) < Math.abs(result.moveY)) {
            if (result.moveY < -0) {
                if (!this._directionFix) { result.direction = 8; }
            } else if (result.moveY > 0) {
                if (!this._directionFix) { result.direction = 2; }
            }
        }
        this._folwPreSpeedX = goX;
        this._folwPreSpeedY = goY;
        return result;
    };
     
     
}());