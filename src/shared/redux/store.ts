import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { Reducer } from "redux";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import { AUTH_API_REDUCER_KEY, authApi } from "../../api/auth/api";
import { USER_API_REDUCER_KEY, userApi } from "../../api/github/user/api";
import {
  REPOSITORY_API_REDUCER_KEY,
  repositoryApi,
} from "../../api/github/repository/api";
import { authSlice, authReducer } from "../../features/auth/slice";
import { RESET_STATE_ACTION_TYPE } from "./actions/resetState";
import { unauthenticatedMiddleware } from "./middleware/unauthenticatedMiddleware";

const reducers = {
  [authSlice.name]: authReducer,
  [AUTH_API_REDUCER_KEY]: authApi.reducer,
  [USER_API_REDUCER_KEY]: userApi.reducer,
  [REPOSITORY_API_REDUCER_KEY]: repositoryApi.reducer,
};

const combinedReducer = combineReducers<typeof reducers>(reducers);

export const rootReducer: Reducer<RootState> = (state, action) => {
  if (action.type === RESET_STATE_ACTION_TYPE) {
    state = {} as RootState;
  }

  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([
      unauthenticatedMiddleware,
      authApi.middleware,
      userApi.middleware,
      repositoryApi.middleware,
    ]),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof combinedReducer>;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
