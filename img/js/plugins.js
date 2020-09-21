// Generated by RPG Maker.
// Do not edit this file directly.
var $plugins =
[
{"name":"Foreground","status":true,"description":"マップに合わせてスクロールする近景の設定(Ver1.1)","parameters":{}},
{"name":"HPConsumeSkill","status":false,"description":"HP消費技","parameters":{"Consume HP Color":"17"}},
{"name":"Yami_8DirEx","status":true,"description":"8方向移動(タッチパネル対応版)","parameters":{"dir4 Switch ID":"100"}},
{"name":"WeatherOnBattle","status":true,"description":"戦闘中も天候アニメを表示します","parameters":{}},
{"name":"SubMembersAttendBattle","status":false,"description":"同行者(NPC)を戦闘に参加させ、自動戦闘を行わせます","parameters":{"subMemberIdVal1":"1","subMemberIdVal2":"2","subMemberIdVal3":"3","subMemberIdVal4":"4"}},
{"name":"SimpleMsgSideViewMZ","status":true,"description":"サイドビューバトルでスキル/アイテムの名前のみ表示します。","parameters":{"displayAttack":"false","displayIcon":"true"}},
{"name":"TPB_Extension","status":true,"description":"TPB戦闘拡張プラグイン v1.0.1","parameters":{"FastForwardSpeed":"2","FastForwardAnimation":"false","OpenActorCommandSeFileName":"Flash2","OpenActorCommandSeVolume":"90","OpenActorCommandSePitch":"150","OpenActorCommandSePan":"0","WaitSkillOrItemWindow":"true","WaitPartyWindow":"true","FixedStatusWindow":"true"}},
{"name":"ChangeEquipOnBattleMZ","status":true,"description":"戦闘コマンドに装備変更を追加","parameters":{"commandName":"装備変更"}},
{"name":"AddAutoToActorCommand","status":true,"description":"戦闘のアクターコマンドの先頭か後尾に「オート」を追加します","parameters":{"commandName":"おまかせ","autoCommandPos":"0"}},
{"name":"CommonEventStepRegion","status":true,"description":"タイルを踏んだ時、リージョンIDに応じてコモンイベントを起動","parameters":{}},
{"name":"wasdKeyMZ","status":true,"description":"wasd移動に対応させます。","parameters":{}},
{"name":"MenuSubMembersMZ","status":true,"description":"メニュー画面と隊列の最後尾に同行者を表示します","parameters":{"subMemberIdVal1":"13","subMemberIdVal2":"14","subMemberIdVal3":"0","subMemberIdVal4":"16","subMemberText":"同行者","displayIfNone":"true","subMemberNoneText":"なし","DisplayOnMap":"true","additionalFollower":"5"}},
{"name":"AlchemySystem","status":true,"description":"アイテム合成プラグイン v1.0.3","parameters":{"EnabledMenuAlchemy":"true","EnabledAlchemySwitchId":"1921","EnabledGoldWindow":"true","DisplayKeyItemCategory":"false","MaxNumMakeItem":"999","MaxMaterials":"3","MakeItemSeFileName":"Magic3","MakeItemSeVolume":"90","MakeItemSePitch":"100","MakeItemSePan":"0","MenuAlchemyText":"錬金術","NeedMaterialText":"必要素材：","NeedPriceText":"必要経費：","TargetItemText":"生成アイテム："}},
{"name":"Mano_CurrencyUnit","status":true,"description":"変数やアイテムを消費して購入できるショップが作れます。\r\n競合率・中ぐらい","parameters":{}},
{"name":"GameInactiveNotStop","status":true,"description":"ゲームウィンドウが非アクティブでもゲームを止めない。","parameters":{}},
{"name":"SoR_EnemySymbolEncounter_MZ","status":true,"description":"＜シンボルエンカウント総合＞","parameters":{"IsFollowerAttacked":"true","InvincibleTime_AfterBattle":"0","EnemySearchRange_scale":"2","SymbolKeepOut_RegionID":"-1","BalloonID_PlayerDetected":"-1","SE_PlayerDetected":"","BalloonID_PlayerFled":"-1","SE_PlayerFled":"","BattleBGM_surprised":"Battle6","Use_MenuSubCommandMap":"false","InvincibleStyle_Flash":"false","InvincibleStyle_Opaque":"false","InvincibleStyle_Blend":"0"}},
{"name":"NRP_VisualTurn","status":true,"description":"v1.11 行動順序を戦闘画面へ表示します。","parameters":{"<Window>":"","dispNumber":"10","horizon":"0","autoHidden":"0","adjustX":"0","adjustY":"64","windowPadding":"","windowOpacity":"255","windowDark":"0","windowBackImage":"","<Symbol Image>":"","graphicMode":"1","width":"100","height":"32","zoom":"100","characterDirection":"down","actorBackImage":"","<Enemy Symbol Image>":"","enemyGraphicMode":"2","enemyFileName":"Monster","enemyFileIndex":"6","enemyBackImage":"","<Enemy Visual ID>":"","useVisualId":"false","visualIdSize":"28","visualIdColor":"0","visualIdArray":"ABCDEFGHIJKLMNOPQRSTUVWXYZ","<Other>":"","keepCommandWindow":"true","displayForSkillSelect":"0"}},
{"name":"YEP_EventChasePlayer おっかけ","status":true,"description":"v1.07 When a player is in the proximity of a certain event,\nthe event will start chasing or fleeing from the player.","parameters":{"Sight Lock":"300","See Player":"true","Alert Timer":"120","Alert Balloon":"1","Alert Sound":"Attack1","Alert Common Event":"0","Return After":"true","Return Wait":"180"}},
{"name":"EquipScene_Extension","status":true,"description":"装備シーン拡張 v1.1.0","parameters":{"LayoutMode":"2","ActorFaceHeight":"43","DefaultEquipSlots":"[1, 2, 3, 4, 5]","WeaponTypes":"[1]","DualWieldSlot":"1","WeaponTypeWhenDualWield":"1","RemoveEquipText":"外す","RemoveEquipIconIndex":"0"}},
{"name":"AltSaveScreen","status":false,"description":"セーブ／ロード画面のレイアウトを変更します。","parameters":{}},
{"name":"StartTPBactorcommand","status":true,"description":"タイムプログレス戦闘でアクターコマンドから開始します。","parameters":{}},
{"name":"SVActorPositionMZ","status":true,"description":"サイドビュー戦闘においてアクター達の画面表示位置を設定します。","parameters":{"actor1 Xpos":"600","actor1 Ypos":"280","actor2 Xpos":"600 + 32","actor2 Ypos":"280 + 48","actor3 Xpos":"600 + 32 * 2","actor3 Ypos":"280 + 48 * 2","actor4 Xpos":"600 + 32 * 3","actor4 Ypos":"280 + 48 * 3"}},
{"name":"Manon_MenuVariable","status":false,"description":"メニュー画面に任意の変数を設置する","parameters":{"showVariableNumber":"1","firstText":"メダル","unitText":"個"}},
{"name":"QuestSystem","status":false,"description":"クエストシステム v1.0.0","parameters":{"QuestDatas":"[\"{\\\"VariableId\\\":\\\"241\\\",\\\"Title\\\":\\\"ｑｑ\\\",\\\"IconIndex\\\":\\\"1\\\",\\\"Requester\\\":\\\"ああ\\\",\\\"Rewards\\\":\\\"[\\\\\\\"{\\\\\\\\\\\\\\\"Type\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"GoldValue\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"ItemId\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"ItemCount\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\"}\\\\\\\"]\\\",\\\"Difficulty\\\":\\\"ｑ\\\",\\\"Place\\\":\\\"ｓｓ\\\",\\\"TimeLimit\\\":\\\"0\\\",\\\"Detail\\\":\\\"ｆｄｄｆｈ\\\",\\\"HiddenDetail\\\":\\\"４５５４６\\\"}\"]","EnabledQuestMenu":"true","EnabledQuestMenuSwitchId":"0","MenuCommands":"[\"orderingQuest\",\"reportedQuest\",\"all\"]","DisplayDifficulty":"true","DisplayPlace":"true","DisplayTimeLimit":"true","QuestOrderSe":"{\"FileName\":\"Skill1\",\"Volume\":\"90\",\"Pitch\":\"100\",\"Pan\":\"0\"}","QuestReportMe":"{\"FileName\":\"Item\",\"Volume\":\"90\",\"Pitch\":\"100\",\"Pan\":\"0\"}","WindowSize":"{\"CommandWindowWidth\":\"300\",\"CommandWindowHeight\":\"160\",\"DialogWindowWidth\":\"400\",\"DialogWindowHeight\":\"160\",\"GetRewardWindowWidth\":\"540\",\"GetRewardWindowHeight\":\"160\"}","Text":"{\"MenuQuestSystemText\":\"クエスト確認\",\"QuestOrderText\":\"このクエストを受けますか？\",\"QuestOrderYesText\":\"受ける\",\"QuestOrderNoText\":\"受けない\",\"QuestCancelText\":\"このクエストをキャンセルしますか？\",\"QuestCancelYesText\":\"キャンセルする\",\"QuestCancelNoText\":\"キャンセルしない\",\"QuestReportText\":\"このクエストを報告しますか？\",\"QuestReportYesText\":\"報告する\",\"QuestReportNoText\":\"報告しない\",\"NothingQuestText\":\"該当するクエストはありません。\",\"GetRewardText\":\"報酬として次のアイテムを受け取りました。\",\"HiddenTitleText\":\"？？？？？？\",\"AllCommandText\":\"全クエスト\",\"QuestOrderCommandText\":\"クエストを受ける\",\"OrderingQuestCommandText\":\"進行中のクエスト\",\"QuestCancelCommandText\":\"クエストのキャンセル\",\"QuestReportCommandText\":\"クエストを報告する\",\"ReportedQuestCommandText\":\"報告済みのクエスト\",\"FailedQuestCommandText\":\"失敗したクエスト\",\"ExpiredQuestCommandText\":\"期限切れのクエスト\",\"HiddenQuestCommandText\":\"未知のクエスト\",\"NotOrderedStateText\":\"未受注\",\"OrderingStateText\":\"進行中\",\"ReportableStateText\":\"報告可\",\"ReportedStateText\":\"報告済み\",\"FailedStateText\":\"失敗\",\"ExpiredStateText\":\"期限切れ\",\"RequesterText\":\"【依頼者】：\",\"RewardText\":\"【報酬】：\",\"DifficultyText\":\"【難易度】：\",\"PlaceText\":\"【場所】：\",\"TimeLimitText\":\"【期間】：\"}","TextColor":"{\"NotOrderedStateColor\":\"#ffffff\",\"OrderingStateColor\":\"#ffffff\",\"ReportableStateColor\":\"#ffffff\",\"ReportedStateColor\":\"#ffffff\",\"FailedStateColor\":\"#ffffff\",\"ExpiredStateColor\":\"#ff0000\"}","GoldIcon":"314"}}
];
