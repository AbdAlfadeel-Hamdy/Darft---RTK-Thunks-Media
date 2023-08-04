import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { usersReducer, User } from "./slices/usersSlice";
import { albumsApi, Album } from "./apis/albumsApi";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    [albumsApi.reducerPath]: albumsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(albumsApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export * from "./thunks/fetchUsers";
export * from "./thunks/createUser";
export * from "./thunks/removeUser";
export type { User, Album };

export {
  useFetchAlbumsQuery,
  useCreateAlbumMutation,
  useRemoveAlbumMutation,
} from "./apis/albumsApi";
