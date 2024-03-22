export const SET_STUDENT_SESSION = 'SET_LANGUAGE';

interface SetStudentSessionAction {
  type: typeof SET_STUDENT_SESSION;
  payload: string;
}

export type studentSessionAction = SetStudentSessionAction;

export const setLanguage = (studentSession: string): studentSessionAction => ({
  type: SET_STUDENT_SESSION,
  payload: studentSession,
});