import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import TeacherSessionReducer, { TeacherSessionState } from '../reducers/teacherSessionReducer';
import StudentSessionReducer, { StudentSessionState } from '../reducers/studentSessionReducer';

export type RootState = {
  teacherSession: TeacherSessionState;
  studentSession: StudentSessionState;
};

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducerTeacher = persistReducer(persistConfig, TeacherSessionReducer);
const persistedReducerStudent = persistReducer(persistConfig, StudentSessionReducer);

const store = configureStore({
  reducer: {
    teacherSession: persistedReducerTeacher,
    studentSession: persistedReducerStudent,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
const persistor = persistStore(store);
export { store, persistor };


