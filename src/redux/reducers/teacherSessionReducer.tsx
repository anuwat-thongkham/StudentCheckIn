import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TeacherSessionState {
  teacherSesion: string;
}

const initialState: TeacherSessionState = {
  teacherSesion: '',
};

const teacherSessionSlice = createSlice({
  name: 'teacherSession',
  initialState,
  reducers: {
    setTeacherSession: (state, action: PayloadAction<string>) => {
      state.teacherSesion = action.payload;
    },
  },
});

export const { setTeacherSession } = teacherSessionSlice.actions;

export default teacherSessionSlice.reducer;
