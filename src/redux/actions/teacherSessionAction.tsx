export const SET_TEACHER_SESSION = 'SET_LANGUAGE';

interface SetTeacherSessionAction {
  type: typeof SET_TEACHER_SESSION;
  payload: string;
}

export type teacherSessionAction = SetTeacherSessionAction;

export const setTeacherSession = (teacherSesion: string): teacherSessionAction => ({
  type: SET_TEACHER_SESSION,
  payload: teacherSesion,
});