import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface StudentSessionState {
  studentSesion: string;
}

const initialState: StudentSessionState = {
  studentSesion: '',
};

const studentSessionSlice = createSlice({
  name: 'studentSesion',
  initialState,
  reducers: {
    setStudentSession: (state, action: PayloadAction<string>) => {
      state.studentSesion = action.payload;
    },
  },
});

export const { setStudentSession } = studentSessionSlice.actions;

export default studentSessionSlice.reducer;
