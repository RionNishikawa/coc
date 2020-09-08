import { Value } from "./basicInterfaces";

export interface CharacterInfo {
    // とりあえずIDつけとく
    userId: string;
    player: string;
    nickName: string;
    name: string;
    job: string;
    age: number;
    sex: string;
    address: string;
    from: string;
}

export interface CurrentStatus {
    HP: number;
    MP: number;
    sanity: number;
    lucky: number;
    physicalCondition: string;
    mentalCondition: string;
    // 未治療の負傷
    untreatedInjury: number;
    // 不定の狂気まで
    untilIndefiniteInsanity: number;
}

export interface AbilityPoint {
    str: number;
    con: number;
    siz: number;
    dex: number;
    app: number;
    edu: number;
    int: number;
    pow: number;
}

export interface Skill {
    id: string;
    name: string,
    point: number;
    jobP: number;
    hobbyP: number;
    growP: number;
}

