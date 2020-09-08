// いずれファイル分割する気がするからファイル名は適当

import { Roll } from "../modules/userModule"
import { Skill } from "../modules/interfaces/characterInterface";
import { Value } from "../modules/interfaces/basicInterfaces";

export const getRoll = (userId: string, password: string): Roll => {
    console.log(userId);
    console.log(password);

    if(userId==='player'){
    return 'player';
    }
    return 'player';
}

export const getInitialSkillNames = (): Skill[] => {
    const skills: Skill[] = [];
    // TODO 外からとってくる
    const skillNames = [
        '威圧','言いくるめ','医学','運転（自動車）','応急手当','オカルト','隠密','回避','科学1','鍵開け',
        '鑑定','機械修理','聞き耳','近接戦闘（格闘）','近接戦闘2','クトゥルフ神話','芸術 / 製作','経理','考古学','コンピューター',
        'サバイバル1','自然1','射撃（拳銃）','射撃（R / SG）','射撃3','重機械操作','信用','心理学','人類学','水泳',
        '精神分析','説得','操縦1','跳躍','追跡','手さばき','電気修理','電子工学','投擲','登攀',
        '図書館', 'ナビゲート', '変装', '法律', 'ほかの言語1', '母国語1', '魅惑', '目星', '歴史'];
    let id = 0;
    let intiVal = 1;
    for (const name of skillNames) {
        const point = intiVal;
        const skill:Skill = {
            id: id + '', name, point,
            jobP:0,hobbyP:0,growP:0
        };
        skills.push(skill);
        id++;
    }
    // ここまで仮
    return skills;

}