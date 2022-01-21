# coc

https://httpbin.org/status/403

https://httpbin.org/status/404


import { TextField } from '@material-ui/core'
import React from 'react';

interface AbilityPointListItemProps {
    name: String;
}

const AbilityPointListItem = (props: AbilityPointListItemProps) => {
    const { name } = props;

    // STR [値] [±]みたいに横並び
    return (
        <div style={{width:'100%'}}>
            <TextField
                id='filled-number'
                label={name}
                type='number'
                InputLabelProps={{
                    shrink: true,
                }}
                InputProps={{
                    readOnly: true,
                }}
                variant='filled'
                defaultValue={0}
            />
            <TextField
                id='filled-number'
                label='±'
                type='number'
                InputLabelProps={{
                    shrink: true,
                }}
                variant='filled'
            />
        </div>
    );
}

export default AbilityPointListItem;


// propsのインターフェース？

import { List } from "@material-ui/core";
import AbilityPointListItem from "./AbilityPointListItem";
import React from "react";

const AbilityPointList = (props) => {


    return (
        <List>
            <AbilityPointListItem name={'STR'}/>
            <AbilityPointListItem name={'CON'}/>
            <AbilityPointListItem name={'DEX'}/>
            <AbilityPointListItem name={'INT'}/>
            <AbilityPointListItem name={'POW'}/>
            <AbilityPointListItem name={'APP'}/>
        </List>
    )



}

export default AbilityPointList;

import { Operators, RollResult } from "../define/types"

/** ダイスロール系の処理をするハンドラ− */


/* 構想MEMO
既存UIから見て数値のダイスと技能判定補正は同じ場所の方がよさそう。
補正の内容をダイアログに出せれば誤操作は減りそう。

プルダウンと自由入力両方対応する部品が必須？->ない！

*/

// ダイスロールのインターフェース
export interface Roll {
    // 数
    quantity: number;
    // ダイスロールの種類
    type: number
    // 演算子
    operator: Operators;
    // 補正値
    extraNum: string;
    // 技能値ID
    skillId?: string;
}

// 組み合わせするときは2回関数実行したほうがよさそう
export const adjustRolls = (roll: Roll | Roll[]): RollResult | number => {
    if (Array.isArray(roll)) {
        return doRoll(roll);
    }
    return judgeRoll(roll, 50);
}


// 数値を返す
const doRoll = (rolls: Roll[]): number => {
    let result = 0;
    for (const roll of rolls) {
        result += (Math.floor(Math.random() * roll.type) + 1) * roll.quantity;
    }
    return result;
}
// export interface Roll {
//     // 数
//     quantity: number;
//     // ダイスの種類
//     type: number
//     // 演算子
//     operator: Operators;
//     // 補正値
//     extraNum: string;

// 成功度を返す 1d100ロール
const judgeRoll = (roll: Roll, skillPoint): RollResult => {
    const result: RollResult = "critical";
    var random = Math.floor(Math.random() * 100);
    if (random > skillPoint) {
        if (random > 95) {
            return 'famble';
        }
        return 'failer';
    }

    if (random < 6) {
        return 'critical';
    }

    if (random > skillPoint / 2) {
        return 'regular_success';
    }

    if (random > skillPoint / 4) {
        return 'hard_success';
    }

    return 'extream_success';
}
