import React, { useEffect, useState } from "react";
import { SkillListItem } from "./SkillListItem";
import { List } from "@mui/material";
import { SkillListHeader } from "./SkillListHeader";
import { shallowEqual, useSelector } from "react-redux";

export const SkillList = () => {
  const skills = useSelector((s) => s.character.skills, shallowEqual);

  /**
   * 表示が遅いので初期表示は上20個。その表示が終わった後に残りの描画をする
   * 20の理由は画面の下端までスキルが出るようにしないと追加描画の際にスクロールバーが出てレイアウトがずれる。
   */

  /** 配列からリストを作る */
  const [dispSkills, setList2] = useState(skills.slice(0, 20));
  // .map((skill) => <SkillListItem key={skill.id} skill={skill} />));

  useEffect(() => {
    setList2(skills);
    // skills.map((skill) => <SkillListItem key={skill.id} skill={skill} />));
  }, []);

  // const createList = () => {
    const list = [];
    for (const skill of dispSkills) {
      list.push(<SkillListItem key={skill.id} skill={skill} />);
    }
      // };

  return (
    <div className="skillListRoot">
      <SkillListHeader />
      <List>{list}</List>
    </div>
  );
};



import { TextField, Grid, Button, Typography } from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { putChangeSkillAction, updateSkillAction } from "../../modules/characterModule";
import { defines, skillType } from "../../define/defines";
import { memo, useState } from "react";
import { Skill } from "../../define/interfaces";
import { RollButton } from "./RollButton";

interface Prop {
  skill: Skill;
}

export const SkillListItem = (prop: Prop) => {
  const dispatch = useDispatch();
  const type = useSelector((s) => s.character.type);

  /** keyは配列内でのみユニークならいい */
  const skill: Skill = prop.skill;
  const { id, name, initP, occupationP, hobbyP, growP, featureP } = skill;
  const point = initP + occupationP + hobbyP + growP + featureP;
  const [open, setOpen] = useState(false);
  const [occupationError, setOccupationError] = React.useState(false);
  const [hobbyError, setHobbyError] = React.useState(false);
  const [growError, setGrowError] = React.useState(false);
  const [featuerError, setFeatureError] = React.useState(false);
  const isCthulhuMyth = defines.cthulhuMyth == name;

  const inputSkillOccupation = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => inputSkill(e.target.value, skillType.occupation);
  const inputSkillHobby = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => inputSkill(e.target.value, skillType.hobby);
  const inputSkillGrow = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => inputSkill(e.target.value, skillType.grow);
  const inputSkillFeature = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => inputSkill(e.target.value, skillType.feature);

  const inputSkill = (strVal: string, type: string) => {
    const value = Number(strVal);
    const isError = value > 100;

    // 3桁以上の時はエラーにする。
    switch (type) {
      case skillType.occupation:
        setOccupationError(isError);
        break;
      case skillType.hobby:
        setHobbyError(isError);
        break;
      case skillType.grow:
        setGrowError(isError);
        break;
      case skillType.feature:
        setFeatureError(isError);
        break;
    }
    //  エラーの時storeの更新はしない
    // 連打(99999とか)の操作を素直に反映させると動作が重くなるので、不必要に大きな値は無視する実装にしている。
    if (isError) {
      return;
    }
    const newSkill: Skill = {
      ...skill,
      [type]: value,
    };
    dispatch(putChangeSkillAction({ newSkill, id }));
    dispatch(updateSkillAction({ newSkill, id }));
  };

  // const changeSkillName = (newSkillName: string) => {
  const changeSkillName = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const newSkillName = e.target.value;
    const newSkill: Skill = { ...skill, name: newSkillName };
    dispatch(updateSkillAction({ newSkill, id }));
    dispatch(putChangeSkillAction({ newSkill, id }));
  };

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="baseline">
        {skill.readonly ? (
          <Typography className="skillListName--readonly">{name}</Typography>
        ) : (
          <TextField
            value={name}
            className="skillList"
            // onChange={(e) => changeSkillName(e.target.value)}
            onChange={changeSkillName}
            InputProps={{
              readOnly: type === "readonly" || skill.readonly,
            }}
            variant="filled"
          />
        )}
        <span className="skillListValue">{point > 99 ? 99 : point}</span>
        <RollButton skillName={name} point={point} />
        <Button onClick={() => setOpen(!open)}>{open ? <ExpandLessIcon /> : <ExpandMoreIcon />}</Button>
      </Grid>
        {/* ここでも表示非表示切り替えた方がリスト全体の表示速度がましになる */}
        {open && (
          <Grid>
            {/* 職業値 */}
            <TextField
              label="職業"
              error={occupationError}
              type="number"
              variant="standard"
              onChange={inputSkillOccupation}
              value={occupationP}
              inputProps={{ readOnly: isCthulhuMyth || type === "readonly" }}
            />
            {/* 趣味値 */}
            <TextField
              label="趣味"
              error={hobbyError}
              type="number"
              variant="standard"
              onChange={inputSkillHobby}
              value={hobbyP}
              inputProps={{ readOnly: isCthulhuMyth || type === "readonly" }}
            />
            {/* 成長値 */}
            <TextField
              label="成長"
              error={growError}
              type="number"
              variant="standard"
              onChange={inputSkillGrow}
              value={growP}
              inputProps={{ readOnly: type === "readonly" }}
            />
            {/* 特徴値 */}
            <TextField
              label="特徴"
              error={featuerError}
              type="number"
              variant="standard"
              onChange={inputSkillFeature}
              value={featureP}
              inputProps={{ readOnly: type === "readonly" }}
            />
          </Grid>
        )}
      </>
  );
};
