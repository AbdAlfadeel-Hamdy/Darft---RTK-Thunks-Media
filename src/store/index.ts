import { configureStore } from "@reduxjs/toolkit";
import { usersReducer, User } from "./slices/usersSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export * from "./thunks/fetchUsers";
export * from "./thunks/createUser";
export * from "./thunks/removeUser";
export type { User };
