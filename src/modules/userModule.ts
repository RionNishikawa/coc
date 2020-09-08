import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getRoll } from "../database/database";

export type Roll = "player" | "guest" | "admin"; // ロールの種類は適当

export interface UserState {
  userId: string;
  password: string;
  roll: Roll;
}

const initialState = {
  userId: "",
  password: "",
  roll: "guest"
} as UserState;

// createSlice() で actions と reducers を一気に生成
const userModule = createSlice({
  name: "user",
  initialState,
  reducers: {
    setRoll: (state: UserState, action: PayloadAction<Roll>) => {
      state.roll = action.payload;
    },
  }
});

export default userModule;
