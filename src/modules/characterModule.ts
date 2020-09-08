import { Value } from "./interfaces/basicInterfaces";
import {
  CharacterInfo,
  AbilityPoint,
  Skill,
  CurrentStatus,
} from "./interfaces/characterInterface";
import { createSlice, PayloadAction, configureStore } from "@reduxjs/toolkit";
import { getInitialSkillNames } from "../database/database";
import { useSelector } from "react-redux";

export interface CharacterState {
  id: number; // 必要？
  characterInfo: CharacterInfo;
  abilityPoint: AbilityPoint;
  currentStatus: CurrentStatus;
  skills: Skill[];
}

const initialState = {
  // 他も初期値は外部から受け取る
  id: 0,
  characterInfo: {} as CharacterInfo,
  abilityPoint: {} as AbilityPoint,
  currentStatus: {} as CurrentStatus,
  skills: getInitialSkillNames(),
} as CharacterState;

// 技能値が変更されたときに動きます
const handleSkillChange = (
  value: string,
  id: string,
  skilltype: string
): Skill[] => {
  const store = configureStore({
    reducer: characterModule.reducer,
  });

  const state = store.getState();
  let skills: Skill[] = [];
  
  for (const s of state.skills) {
    const skill = {...s}
    if (s.id === id) {
      skill[skilltype] = Number(value);
      // TODO：初期値消えてます
      skill.point = skill.jobP + skill.hobbyP + skill.growP;
      }
      skills.push(skill);
  }
  skills.push({
    id: "string",
    name: "string",
    point: 2,
    jobP: 2,
    hobbyP: 2,
    growP: 2,
  } as Skill)
  return skills;
};

const characterModule = createSlice({
  name: "characterModule",
  initialState,
  reducers: {
    // action: () => { }
    // state:変更するState,<引数>
    changeSkill: (
      state: CharacterState,
      action: PayloadAction<{ value: string; id: string; type: string }>
    ) => {
      const { value,id,type} = action.payload
      state.skills = handleSkillChange(value,id,type);
    },
  },
});

export const { changeSkill } = characterModule.actions;

export default characterModule;
